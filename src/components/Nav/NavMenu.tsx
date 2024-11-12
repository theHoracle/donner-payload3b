"use client"
import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu"

const NavMenu = () => {
    return <NavigationMenu className="hidden lg:flex">
    <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent active:bg-transparent hover:bg-transparent" >Product</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid w-[550px] grid-cols-2 p-6">
          <div className="col-span-2 mb-6">
            <h3 className="text-lg font-medium">Build tomorrow&apos;s web with</h3>
            <p className="text-sm text-muted-foreground">a modern solution you truly own.</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-medium">PAYLOAD IS FOR</h4>
            <div className="grid gap-2">
              <Link href="#" className="group grid gap-1">
                <div className="text-sm font-medium group-hover:underline">Developers</div>
                <div className="line-clamp-2 text-sm text-muted-foreground">
                  Built for developers who value control and flexibility.
                </div>
              </Link>
              <Link href="#" className="group grid gap-1">
                <div className="text-sm font-medium group-hover:underline">Marketing teams</div>
                <div className="line-clamp-2 text-sm text-muted-foreground">
                  Empower your marketing team with powerful tools.
                </div>
              </Link>
              <Link href="#" className="group grid gap-1">
                <div className="text-sm font-medium group-hover:underline">Enterprise companies</div>
                <div className="line-clamp-2 text-sm text-muted-foreground">
                  Scale with confidence using enterprise-grade features.
                </div>
              </Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-medium">COMPARE PAYLOAD</h4>
            <div className="grid gap-2">
              <Link href="#" className="group grid gap-1">
                <div className="text-sm font-medium group-hover:underline">Payload vs WordPress</div>
                <div className="line-clamp-2 text-sm text-muted-foreground">
                  See how Payload compares to WordPress.
                </div>
              </Link>
              <Link href="#" className="group grid gap-1">
                <div className="text-sm font-medium group-hover:underline">Payload vs Contentful</div>
                <div className="line-clamp-2 text-sm text-muted-foreground">
                  Compare Payload with Contentful&apos;s offerings.
                </div>
              </Link>
              <Link href="#" className="group grid gap-1">
                <div className="text-sm font-medium group-hover:underline">Payload vs Sanity</div>
                <div className="line-clamp-2 text-sm text-muted-foreground">
                  Learn how Payload differs from Sanity.
                </div>
              </Link>
            </div>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
    </NavigationMenuList>
    </NavigationMenu>
}

export default NavMenu;