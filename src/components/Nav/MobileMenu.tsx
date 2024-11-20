'use client'
import { PropsWithChildren, useEffect, useState } from "react"
import { Separator } from "../ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { getUser } from "@/lib/session"
import { User } from "@/payload-types"


const MobileMenu = ({ children }: PropsWithChildren) => {
    const isMobile = useIsMobile()
    const [user, setUser] = useState<User | null>(null)
    
    useEffect(() => {
      const getAuthUser = async () => {
        const userObj = await getUser()
        setUser(userObj)
      }
      getAuthUser()
    }, [])

    if (!isMobile) return children
    return (
    <SidebarProvider className="bg-transparent" >
    <AppSidebar user={user?.email} />
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1>Donner</h1>
      </header>
       <div className="relative w-screen max-w-3xl overflow-hidden">
      {children}
        </div>
    </SidebarInset>
  </SidebarProvider>
  )  
}

export default MobileMenu