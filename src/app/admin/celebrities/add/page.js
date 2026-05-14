import AdminSidebar from "@/components/admin/AdminSidebar";
import AddCelebrityForm from "@/components/celebrity/AddCelebrityForm";

export const metadata = { title: "Add Celebrity — StarReach Admin" };

export default function AddCelebrityPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 w-full min-h-screen pt-16 md:pt-0 md:pl-64">
        <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
          <AddCelebrityForm />
        </div>
      </main>
    </div>
  );
}