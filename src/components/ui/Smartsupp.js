"use client";
import { useEffect } from "react";

export default function Smartsupp() {
  useEffect(() => {
    // Set key before loading script
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = "3d20e4f0077bf03799380556b01f241641e1f762";

    // Initialize smartsupp function
    window.smartsupp = window.smartsupp || function () {
      window.smartsupp._.push(arguments);
    };
    window.smartsupp._ = window.smartsupp._ || [];

    // Create and inject script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    script.src = "https://www.smartsuppchat.com/loader.js?";

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    return () => {
      // Cleanup on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}