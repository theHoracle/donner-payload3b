import NavbarScrollHandler from "./NavbarScrollHandler"
import MaxWidthWrapper from "../MaxWidthWrapper"
import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavMenubar } from "./NavMenu"
import { User } from "@/payload-types"


const Navbar = async ({ user }: {user: User | null}) => {
    const initials = user?.email.slice(0,2)

    return <NavbarScrollHandler>
        <MaxWidthWrapper>
          <div className="md:flex hidden items-center h-16 justify-between gap-16 text-stone-100">
          <div className="md:ml-4 flex flex-1">
            <Link href="/">
            <span
            className="font-bold text-3xl leading-tigh tracking-tighter"
            >Donner</span> 
            </Link>
          </div>
          <div className="flex-[2] flex items-center justify-center flex-col">
            <NavMenubar />
          </div>
            {/* sign in / up */}
            <div className="hidden md:flex md:justify-end md:items-center flex-1">
            {!user ? (
              <Link
                  href="auth/login"
                  className={cn(buttonVariants({ variant: 'ghost'}), 'px-8 font-medium')}
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
        </div>
    </MaxWidthWrapper>
</NavbarScrollHandler>
}
export default Navbar;