import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import DashboardClient from "@/components/ui/DashboardClient";

export const metadata = {
  title: "My Dashboard — Gigceleb",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-yellow-400">Loading...</p>
      </div>
    }>
      <Navbar />
      <DashboardClient session={session} />
      <Footer />
    </Suspense>
  );
}