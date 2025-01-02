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
        <Sidebar className="shadow-lg shadow-black/30">
            <SidebarHeader>
                <div className="flex justify-evenly">
                    <img src="/vite.svg" width="42px" className="bg-white rounded-full p-0.5" />

                    <h1 className="text-4xl font-bold uppercase px-2">Rytr</h1>
                    <ModeToggle />
                </div>
            </SidebarHeader>
            <SidebarContent className="m-0">
                <SidebarGroup>
                    <NavLink to="dashboard" className="flex items-center w-full p-4 border-b-2 hover:bg-neutral-200 dark:hover:bg-neutral-950 hover:shadow-inner hover:scale-95 duration-200" end><HomeIcon className="mx-4" />Home</NavLink>
                    <NavLink to="dashboard/cards" className="flex items-center w-full p-4 border-b-2 hover:bg-neutral-200 dark:hover:bg-neutral-950 hover:shadow-inner hover:scale-95 duration-200" end><CardStackIcon className="mx-4" />Card</NavLink>
                    <NavLink to="dashboard/kanban" className="flex items-center w-full p-4 border-b-2 hover:bg-neutral-200 dark:hover:bg-neutral-950 hover:shadow-inner hover:scale-95 duration-200" end><LayoutIcon className="mx-4" />Kanban Board</NavLink>
                    <NavLink to="dashboard/notes" className="flex items-center w-full p-4 border-b-2 hover:bg-neutral-200 dark:hover:bg-neutral-950 hover:shadow-inner hover:scale-95 duration-200" end><FileTextIcon className="mx-4" />Notes</NavLink>
                    <NavLink to="dashboard/assistant" className="flex items-center w-full p-4 border-b-2 hover:bg-neutral-200 dark:hover:bg-neutral-950 hover:shadow-inner hover:scale-95 duration-200" end><AvatarIcon className="mx-4" />AI Assistant</NavLink>
                    <NavLink to="dashboard/feedback" className="flex items-center w-full p-4 border-b-2 hover:bg-neutral-200 dark:hover:bg-neutral-950 hover:shadow-inner hover:scale-95 duration-200" end><ChatBubbleIcon className="mx-4" />Feedback</NavLink>

                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button variant="destructive" className="flex items-center w-full p-4 border-b-2 hover:bg-red-800 duration-200" onClick={logout}><ExitIcon color="white" />Logout</Button>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
