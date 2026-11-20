import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";
import { useAuth } from "../../../context/authContext";

export default function ScreenLogo() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      // Admin
      if (user?.role?.trim().toLowerCase() === "admin") {
        router.replace("/admin");
        return;
      }

      // customer page
      router.replace("/home");
    }, 1200);

    return () => clearTimeout(timer);
  }, [user, loading]);
  return (
    <View style={styles.container}>
      {/* LOGO ICON */}
      <View style={styles.iconContainer}>
        <Svg width={125} height={125} viewBox="0 0 240 220">
          <Defs>
            <LinearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#E7C77A" />
              <Stop offset="0.5" stopColor="#C8A96E" />
              <Stop offset="1" stopColor="#9E7A3D" />
            </LinearGradient>
          </Defs>

          <Path
            d="M40 190 L110 30 L145 95 L110 125 L82 190 Z"
            fill="url(#gold)"
          />

          <Path d="M145 125 L180 190 L145 190 L118 140 Z" fill="url(#gold)" />

          <Path
            d="M70 150 C110 140 150 120 195 70 L175 70 L210 35 L200 90 L178 75 C145 112 110 145 75 160 Z"
            fill="url(#gold)"
          />
        </Svg>
      </View>

      {/* BRAND NAME */}
      <View style={styles.brandContainer}>
        <Text style={styles.awlText}>AWL</Text>

        <View style={styles.marketContainer}>
          <Text style={styles.miniText}>MINI</Text>

          <Text style={styles.marketText}>MARKET</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // ⭐ Logo + magaca dhinac
    alignItems: "center",
    justifyContent: "center",
  },

  iconContainer: {
    width: 125,
    height: 125,
    alignItems: "center",
    justifyContent: "center",
  },

  brandContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },

  awlText: {
    fontSize: 42,
    fontWeight: "900",
    color: "#2D2417",
    letterSpacing: 2,
    lineHeight: 45,
  },

  marketContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  miniText: {
    fontSize: 17,
    fontWeight: "900",
    color: "#C8A96E",
    letterSpacing: 0.8,
  },

  marketText: {
    fontSize: 17,
    fontWeight: "900",
    color: "#2D2417",
    letterSpacing: 0.8,
    marginLeft: 3,
  },
});
