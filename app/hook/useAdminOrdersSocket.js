"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export function useAdminOrdersSocket(onNewOrder, enabled = true) {
  const [notification, setNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [connected, setConnected] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const callbackRef = useRef(onNewOrder);
  const soundEnabledRef = useRef(soundEnabled);

  useEffect(() => {
    callbackRef.current = onNewOrder;
  }, [onNewOrder]);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  const speakOfficialAlert = useCallback((spokenText) => {
    if (!soundEnabledRef.current || typeof window === "undefined") return;

    try {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(spokenText);
        utterance.lang = "en-US";
        utterance.rate = 0.98;
        utterance.pitch = 1;
        utterance.volume = 1;
        window.speechSynthesis.speak(utterance);
        return;
      }
    } catch (_) {
      // Fallback below
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(740, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (_) {}
  }, []);

  const testSound = useCallback(() => {
    speakOfficialAlert("Sahal Suuq alert system is active. Ready for new orders.");
  }, [speakOfficialAlert]);

  useEffect(() => {
    if (!enabled) return;

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      "https://sahalsuuq-production-14a60a8a.up.railway.app";

    const socket = io(backendUrl, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("joinAdminRoom");
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("newOrder", (order) => {
      const orderId = order?._id || String(Date.now());
      const customerName = order?.user?.name || "Customer";
      const totalAmount =
        order?.grandTotal ?? order?.totalPrice ?? order?.total ?? "";

      const item = {
        id: `${orderId}-${Date.now()}`,
        orderId,
        order,
        title: "New Order Received",
        message: `${customerName}${totalAmount !== "" ? ` — $${totalAmount}` : ""}`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        read: false,
      };

      setUnreadCount((prev) => prev + 1);
      setNotification(item);
      setNotifications((prev) => [item, ...prev].slice(0, 20));

      const spokenMessage =
        totalAmount !== ""
          ? `Attention! New order received from ${customerName}, total ${totalAmount} dollars.`
          : `Attention! New order received from ${customerName}.`;

      speakOfficialAlert(spokenMessage);

      if (callbackRef.current) {
        callbackRef.current(order);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [enabled, speakOfficialAlert]);

  const clearNotification = () => setNotification(null);

  const resetUnread = () => {
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    setNotification(null);
  };

  return {
    notification,
    notifications,
    unreadCount,
    connected,
    soundEnabled,
    setSoundEnabled,
    testSound,
    clearNotification,
    resetUnread,
    clearAllNotifications,
  };
}