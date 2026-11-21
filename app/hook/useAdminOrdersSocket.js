"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export function useAdminOrdersSocket(onNewOrder, enabled = true) {
  const [notification, setNotification] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [connected, setConnected] = useState(false);
  const callbackRef = useRef(onNewOrder);

  useEffect(() => {
    callbackRef.current = onNewOrder;
  }, [onNewOrder]);

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
      const orderId = order?._id || Date.now();
      const customerName = order?.user?.name || "Macmiil";
      const totalAmount =
        order?.grandTotal ?? order?.totalPrice ?? order?.total ?? "";

      setUnreadCount((prev) => prev + 1);
      setNotification({
        id: orderId,
        order,
        title: "Dalab Cusub Ayaa Yimid!",
        message: `${customerName}${totalAmount !== "" ? ` — $${totalAmount}` : ""}`,
      });

      // Cod ogeysiis gaaban
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.18);
        }
      } catch (_) {
        // Haddii browser-ku xannibo audio ka hor interaction, ha joojin ogeysiiska
      }

      if (callbackRef.current) {
        callbackRef.current(order);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [enabled]);

  const clearNotification = () => setNotification(null);
  const resetUnread = () => setUnreadCount(0);

  return {
    notification,
    unreadCount,
    connected,
    clearNotification,
    resetUnread,
  };
}