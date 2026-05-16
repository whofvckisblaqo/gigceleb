import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Panel — Gigceleb",
};

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/admin-login");
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <AdminSidebar />
      <main className="flex-1 lg:ml-60 pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}