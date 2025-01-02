import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div className="w-full">
          <Outlet />
        </div>
      </SidebarProvider>
    </main>
  );
}
