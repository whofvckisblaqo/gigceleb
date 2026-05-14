"use client";
import { useState, useRef } from "react";
import Image from "next/image";

export default function ImageUpload({ label, value, onChange, hint }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [activeTab, setActiveTab] = useState("upload"); // "upload" or "url"
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be less than 5MB");
      return;
    }

    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error || "Upload failed");
        return;
      }

      onChange(data.url);
    } catch (error) {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1">
        {label}
      </label>

      {/* Tabs */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 rounded-full text-xs font-medium transition ${
            activeTab === "upload"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          📁 Upload Photo
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("url")}
          className={`px-4 py-2 rounded-full text-xs font-medium transition ${
            activeTab === "url"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          🔗 Paste URL
        </button>
      </div>

      {/* Upload Tab */}
      {activeTab === "upload" && (
        <div>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
              uploading
                ? "border-gray-200 bg-gray-50"
                : "border-gray-300 hover:border-black hover:bg-gray-50"
            }`}
          >
            {uploading ? (
              <div>
                <p className="text-2xl mb-2">⏳</p>
                <p className="text-sm text-gray-500">Uploading...</p>
              </div>
            ) : value ? (
              <div>
                <p className="text-2xl mb-2">✅</p>
                <p className="text-sm text-gray-500">
                  Photo uploaded! Click to change.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-2xl mb-2">📸</p>
                <p className="text-sm font-medium text-gray-700">
                  Click to upload photo
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  JPG, PNG, WEBP — Max 5MB
                </p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}

      {/* URL Tab */}
      {activeTab === "url" && (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/photo.jpg"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
        />
      )}

      {/* Error */}
      {uploadError && (
        <p className="text-red-500 text-xs mt-1">{uploadError}</p>
      )}

      {/* Hint */}
      {hint && !uploadError && (
        <p className="text-gray-400 text-xs mt-1">{hint}</p>
      )}

      {/* Preview */}
      {value && (
        <div className="mt-3 flex items-center gap-3">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 truncate">{value}</p>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs text-red-500 hover:text-red-700 mt-1"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}