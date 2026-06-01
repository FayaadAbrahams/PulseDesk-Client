import { SidebarProvider } from "@/components/ui/sidebar"
import { SideBar } from "./sidebar"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <SideBar />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    )
}

export default Layout