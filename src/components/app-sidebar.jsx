import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarRail
} from "@/components/ui/sidebar"
import { NavLink, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { FileTextIcon, CardStackIcon, ExitIcon, HomeIcon, LayoutIcon, AvatarIcon, ChatBubbleIcon } from "@radix-ui/react-icons"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "./auth-hook"
export function AppSidebar() {
    const { setToken } = useAuth()
    const navigate = useNavigate()
    function logout() {
        setToken(null)
        localStorage.clear()
        navigate('/')
    }
    return (
        <Sidebar className="shadow-lg shadow-black/30 bg-white dark:bg-neutral-900 rounded-r-xl overflow-hidden">
            {/* Sidebar Header */}
            <SidebarHeader className="p-4 border-b dark:border-neutral-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/vite.svg" width="42" className="bg-white rounded-full p-0.5 shadow" />
                        <h1 className="text-2xl font-bold uppercase text-gray-800 dark:text-white tracking-wide">
                            Rytr
                        </h1>
                    </div>
                    <ModeToggle />
                </div>
            </SidebarHeader>

            {/* Sidebar Content */}
            <SidebarContent className="p-2">
                <SidebarGroup className="space-y-2">
                    {[
                        { to: "dashboard", label: "Home", Icon: HomeIcon },
                        { to: "dashboard/cards", label: "Cards", Icon: CardStackIcon },
                        { to: "dashboard/kanban", label: "Kanban Board", Icon: LayoutIcon },
                        { to: "dashboard/notes", label: "Notes", Icon: FileTextIcon },
                        { to: "dashboard/assistant", label: "AI Assistant", Icon: AvatarIcon },
                        { to: "dashboard/feedback", label: "Feedback", Icon: ChatBubbleIcon },
                    ].map(({ to, label, Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-4 p-3 rounded-lg transition duration-200 ${isActive
                                    ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 shadow"
                                    : "hover:bg-gray-100 dark:hover:bg-neutral-800 hover:shadow-inner"
                                }`
                            }
                            end
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{label}</span>
                        </NavLink>
                    ))}
                </SidebarGroup>
            </SidebarContent>

            {/* Sidebar Footer */}
            <SidebarFooter className="p-2 border-t dark:border-neutral-700">
                <Button
                    variant="destructive"
                    className="flex items-center gap-3 w-full p-3 rounded-lg bg-red-600 hover:bg-red-700 transition duration-200"
                    onClick={logout}
                >
                    <ExitIcon className="w-5 h-5" color="white" />
                    <span className="text-sm font-medium text-white">Logout</span>
                </Button>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>

    )
}
