import { SidebarProvider } from "@/components/ui/sidebar"
import { SideBar } from "./SideBar"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux";
import { SideBarState } from "@/types/types";

const Layout = () => {
    const toggleSideBar = useSelector((state: SideBarState) => state.sidebar.isOpen);

    return (
        <SidebarProvider open={toggleSideBar} >
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