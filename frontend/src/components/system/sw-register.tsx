"use client";

import React, { useEffect } from "react";

const SwRegister: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (process.env.NODE_ENV !== 'production') return;
    if (!("serviceWorker" in navigator)) return;

    const isLocalhost = Boolean(
      window.location.hostname === "localhost" ||
      window.location.hostname === "[::1]" ||
      /^127(?:\.\d{1,3}){3}$/.test(window.location.hostname)
    );

    const swUrl = "/sw.js";
    let intervalId: number | undefined;

    (async () => {
      try {
        const reg = await navigator.serviceWorker.register(swUrl, { scope: "/" });
        console.info("Service Worker registered:", reg.scope);
        // Periodic updates
        intervalId = window.setInterval(() => reg.update().catch(() => {}), 30 * 60 * 1000);
        // Handle updates
        reg.addEventListener("updatefound", () => {
          const installing = reg.installing;
          if (!installing) return;
          installing.addEventListener("statechange", () => {
            if (installing.state === "installed") {
              if (navigator.serviceWorker.controller) {
                console.info("New content is available; will be used on next load.");
              } else {
                console.info("Content is cached for offline use.");
              }
            }
          });
        });
      } catch (e) {
        if (!isLocalhost) console.warn("SW registration failed", e);
      }
    })();

    return () => { if (intervalId) window.clearInterval(intervalId); };
  }, []);

  return null;
};

export default SwRegister;
