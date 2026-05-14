import { Suspense } from "react";
import CelebritiesClient from "@/components/celebrity/CelebritiesClient";

export const metadata = {
  title: "Browse Celebrities — StarReach",
  description: "Browse our full roster of A-list celebrities available for booking.",
};

export default function CelebritiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    }>
      <CelebritiesClient />
    </Suspense>
  );
}