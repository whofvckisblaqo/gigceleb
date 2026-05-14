import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminUsersClient from "@/components/admin/AdminUsersClient";

export const metadata = { title: "Manage Users — StarReach Admin" };

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 w-full min-h-screen pt-16 md:pt-0 md:pl-64">
        <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
          <AdminUsersClient />
        </div>
      </main>
    </div>
  );
}