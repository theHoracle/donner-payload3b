import { getServerSideUser } from "@/lib/payload-utils"
import { cookies } from "next/headers"
import NavbarScrollHandler from "./NavbarScrollHandler"
import MaxWidthWrapper from "../MaxWidthWrapper"
import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"
import NavMenu from "./NavMenu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Navbar = async () => {
    const nextCookies = await cookies()
    const { user } = await getServerSideUser(nextCookies)
    const initials = user?.email.slice(0,2)


    return <NavbarScrollHandler>
        <MaxWidthWrapper>
          <div className="flex items-center h-16 justify-between gap-16">
          <div className="md:ml-4 flex flex-1">
            <Link href="/">
            <span
            className="font-bold text-3xl leading-tight tracking-tighter"
            >Donner</span> 
            </Link>
          </div>
          <div className="flex-[2]">
            <NavMenu />
          </div>
            {/* sign in / up */}
            <div className="hidden md:flex md:justify-end md:items-center flex-1">
            {!user ? (
              <Link
                  href="auth/login"
                  className={cn(buttonVariants({ variant: 'secondary'}), 'px-8 font-medium')}
                >
                Login
                </Link>
            ) : (
              <div>
                   {/* maybe link to profile/dashboard if needed */}
                   <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{initials}</AvatarFallback>
                   </Avatar>
                </div>
            )}
             </div>
             {/* mobile menu */}
        </div>
    </MaxWidthWrapper>
</NavbarScrollHandler>
}
export default Navbar;