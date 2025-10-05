import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import {  AppSidebar } from "@/components/modules/admin/Sidebar";
import { Header } from "@/components/modules/admin/Topbar";


interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        
          
          
          <main className="flex-1 overflow-auto p-6 w-full ">
<Header />
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      
    </SidebarProvider>
  );
}
