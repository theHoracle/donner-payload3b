import { NavMain } from "./nav-main"
import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"
import { SidebarOptInForm } from "@/components/sidebar-opt-in-form"
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
import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { navData } from "@/data/nav"


export function AppSidebar({ 
  user, ...props 
}: React.ComponentProps<typeof Sidebar> & {
  user: string | null | undefined
}) {

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Donner Foundation</span>
                  <span className="">We rise by lifting others</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={Object.values(navData)} />
      </SidebarContent>
        <SidebarMenuItem>
          {!user ? <SidebarMenuButton className="min-w-full">
            <Link
            className={buttonVariants()}
            href='/auth/login'
            > Login
            </Link>
          </SidebarMenuButton> : 
          <NavMain items={
            [
              {
                title: 'Profile',
                url: "#",
                items: [
                  {
                    title: `• ${user}`,
                    url: "#",
                  },
                  {
                    title: "Donations",
                    url: "/user/donations",
                  },
                  {
                    title: "Logout",
                    url: "/auth/logout",
                  },
                ],
              },
            ]
          } />
          }
        </SidebarMenuItem>
      <SidebarFooter>
        <div className="p-1">
          <SidebarOptInForm />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

