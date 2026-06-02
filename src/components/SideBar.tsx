import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "./NavUser"
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { IconClipboardList, IconHome, IconLayoutSidebarLeftExpand, IconTicket, IconUsers } from "@tabler/icons-react";
import { SideBarState } from "@/types/types";
import { useSelector } from "react-redux";
import { TooltipProvider } from "./ui/tooltip";

interface NavItem {
    title: string
    url: string
    icon: React.ComponentType<{ className?: string }>
    isActive?: boolean
    roles: string[]
}

const navItems: NavItem[] = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconHome,
        roles: ["Admin", "Agent"]
    },
    {
        title: "Tickets",
        url: "/tickets",
        icon: IconTicket,
        roles: ["Admin", "Agent", "Customer"]
    },
    {
        title: "Users",
        url: "/users",
        icon: IconUsers,
        roles: ["Admin"]
    },
    {
        title: "Audit Logs",
        url: "/audit-logs",
        icon: IconClipboardList,
        roles: ["Admin"]
    }
];

export function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useAuth();
    const visibleItems = navItems.filter(item =>
        item.roles.includes(user?.role ?? "")
    );
    const sidebarOpen = useSelector((state: SideBarState) => state.sidebar.isOpen);

    return (
        <div id="dashboard-sidebar" className="light">
            <Sidebar {...props} collapsible="icon" variant="floating">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className="data-[slot=sidebar-menu-button]:p-1.5!"
                            >
                                <Link to="#" className="flex items-center ">
                                    {sidebarOpen && (
                                        < span className="text-base font-semibold">PulseDesk</span>)}
                                    <img src="./icon.svg" alt="icon-pulse-desk" width={18} />

                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        <SidebarMenu>
                            {visibleItems.map((item) => (
                                <SidebarMenuItem key={item.title} className="flex items-center">
                                    <TooltipProvider>
                                        <SidebarMenuButton tooltip={item.title} asChild>
                                            <Link
                                                to={item.url}

                                            >
                                                <item.icon className="size-5 shrink-0" />
                                                <span className="group-data-[collapsible=icon]:hidden">
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </TooltipProvider>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarMenu>
                </SidebarContent>
                <SidebarRail />
                <SidebarFooter>
                    <NavUser user={{ name: user?.fullName ?? "", email: user?.email ?? "", avatar: "/avatar-test.jpg" }} />
                </SidebarFooter>
            </Sidebar>
        </div >
    )
}

