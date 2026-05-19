"use client";
import { useEffect } from "react";

export default function Smartsupp() {
  useEffect(() => {
    var _smartsupp = _smartsupp || {};
    _smartsupp.key = "3d20e4f0077bf03799380556b01f241641e1f762";

    (function (d) {
      var s, c, o = window.smartsupp = function () { o._.push(arguments); };
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