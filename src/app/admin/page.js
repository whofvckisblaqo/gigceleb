import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export const metadata = {
  title: "Admin Dashboard — StarReach",
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 w-full min-h-screen pt-16 md:pt-0 md:pl-64">
        <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
          <AdminDashboardClient session={session} />
        </div>
      </main>
    </div>
  );
}