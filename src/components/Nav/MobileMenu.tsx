'use client'
import { PropsWithChildren } from "react"
import { Separator } from "../ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { User } from "@/payload-types"


const MobileMenu = ({ children, user }: PropsWithChildren & {user: User | null}) => {
    const isMobile = useIsMobile()

    if (!isMobile) return children
    return (
    <SidebarProvider className="bg-transparent" >
    <AppSidebar user={user?.email} />
    <SidebarInset>
      <header className="flex z-10 h-16 shrink-0 text-stone-100 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1>Donner</h1>
      </header>
       <div className="abosolute w-screen max-w-3xl overflow-hidden">
      {children}
        </div>
    </SidebarInset>
  </SidebarProvider>
  )  
}

export default MobileMenu