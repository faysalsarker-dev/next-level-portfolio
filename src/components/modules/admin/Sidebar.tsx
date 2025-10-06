"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, FolderKanban, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const routes = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Blogs", path: "/dashboard/blogs", icon: BookOpen },
  { name: "Projects", path: "/dashboard/projects", icon: FolderKanban },
];

export function AppSidebar() {
  const location = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="bg-[#151523] border-r border-gray-800 text-white"
    >
      <SidebarContent className="flex flex-col h-full">
        {/* Header */}
        <SidebarHeader className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/faysalsarker.png"
                alt="EduDashboard Logo"
                fill
                className="object-cover rounded-xl shadow-lg ring-2 ring-primary/20"
              />
            </div>
            {open && (
              <div className="text-left">
                <h1 className="font-bold text-lg">Faysal Sarker</h1>
                <p className="text-xs text-gray-400">Admin Portal</p>
              </div>
            )}
          </div>
        </SidebarHeader>

        {/* Navigation */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full py-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1 px-3">
                  {routes.map((item) => {
                    const isActive = location === item.path;
                    return (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          size="lg"
                          asChild
                          className={cn(
                            "group w-full transition-all duration-200",
                            "hover:bg-primary/10 hover:text-primary",
                            isActive && "bg-primary/20 text-primary font-semibold"
                          )}
                        >
                          <Link href={item.path} className="flex items-center gap-3">
                            <item.icon className="w-5 h-5" />
                            {open && <span>{item.name}</span>}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </ScrollArea>
        </div>

        {/* Footer */}
        <SidebarFooter className="border-t border-gray-800 p-4 mt-auto">
          {open ? (
            <div className="text-center text-xs text-gray-400">
              Built with 💙 by{" "}
              <a
                href="https://faysal-sarker.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80"
              >
                Faysal Sarker
              </a>
              <p className="mt-1">v2.0.0</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <Link
                href="https://faysal-sarker.netlify.app"
                target="_blank"
                className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
              >
                <User className="w-4 h-4 text-white" />
              </Link>
            </div>
          )}
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
