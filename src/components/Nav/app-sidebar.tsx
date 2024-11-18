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

// This is nav data.
const data = {
  navMain: [
    {
      title: "Our Foundation",
      url: "/",
      items: [
        {
          title: "Volunteer",
          url: "/volunteer",
        },
        {
          title: "Organization Structure",
          url: "/team",
        },
      ],
    },
    {
      title: "Projects",
      url: "/projects",
      items: [
        {
          title: "Upcoming projects",
          url: "/projects/new",
        },
        {
          title: "Completed projects",
          url: "",
          isActive: true,
        },
        {
          title: "Events",
          url: "/events",
        },
        
      ],
    },
    {
      title: "Contact us",
      url: "/contact-us",
      items: [
        {
          title: "X formerly Twitter",
          url: "https://www.x.com/theHoracle",
        },
        {
          title: "Instagram",
          url: "https://www.instagram.com/donner",
        },
        {
          title: "Mail",
          url: "mailto:info@donnerfoundation.org",
        },
        {
          title: "LinkedIn",
          url: "https://www.linkedin.com/donner",
        },
      ],
    },
    {
      title: "Blog",
      url: "#",
      items: [
        {
          title: "Latest Post",
          url: "/blog/latest",
        },
        {
          title: "Trending Posts",
          url: "/blog/trending",
        },
        {
          title: "Post a story",
          url: "/blog/new-post",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
          <SidebarOptInForm />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
