import React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { navData } from "@/data/nav";

export function AppSidebar({ user }: { user: string | null | undefined }) {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" className="flex flex-col items-start">
              <span className="text-lg font-semibold">Donner Foundation</span>
              <span className="text-sm text-muted-foreground">We rise by lifting others</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {Object.values(navData).map((section) => (
          <div key={section.title} className="mb-4">
            <h3 className="font-semibold text-muted-foreground">{section.title}</h3>
            <ul>
              {section.items.map((item) => (
                <li key={item.title}>
                  <Link href={item.url} className="block p-2 hover:bg-accent hover:text-accent-foreground">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <Link href="/user/profile" className={buttonVariants({ variant: "outline" })}>
            View Profile
          </Link>
        ) : (
          <Link href="/auth/login" className={buttonVariants({ variant: "default" })}>
            Login
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
