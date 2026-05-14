"use client";
import { useEffect } from "react";

export default function Smartsupp() {
  useEffect(() => {
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = "c5ee138e95f56534aeeaa618558137f896714bee";

    window.smartsupp ||
      (function (d) {
        var s, c, o = (window.smartsupp = function () {
          o._.push(arguments);
        });
        o._ = [];
        s = d.getElementsByTagName("script")[0];
        c = d.createElement("script");
        c.type = "text/javascript";
        c.charset = "utf-8";
        c.async = true;
        c.src = "https://www.smartsuppchat.com/loader.js?";
        s.parentNode.insertBefore(c, s);
      })(document);
  }, []);

  return null;
}