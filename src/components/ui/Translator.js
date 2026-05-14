"use client";
import { useEffect } from "react";

export default function Translator() {
  useEffect(() => {
    // Add Google Translate script
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages:
            "es,fr,de,it,pt,ar,zh-CN,ja,ko,ru,hi,sw,yo,ha,ig",
          layout:
            window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    return () => {
      // Cleanup
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div className="fixed bottom-24 right-4 z-50">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 px-3 py-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">🌍</span>
          <p className="text-xs font-medium text-gray-600">Translate</p>
        </div>
        <div id="google_translate_element" />
      </div>
    </div>
  );
}