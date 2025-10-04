import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/modules/admin/Sidebar";
import { AdminTopbar } from "@/components/modules/admin/Topbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
<div className="min-w-64">
          <AdminSidebar />
  
</div>        <div className="flex-1 flex flex-col">
          <AdminTopbar />
          <main className="flex-1 overflow-auto">
        {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
