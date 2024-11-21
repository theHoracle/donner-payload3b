import Footer from "@/components/Footer";
import MobileMenu from "@/components/Nav/MobileMenu";
import Navbar from "@/components/Nav/Navbar";
import { getUser } from "@/lib/session";

export default async function PageLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const user = await getUser()
    return (
        <div className="relative flex flex-col min-w-full">
            <Navbar user={user} />
            <MobileMenu user={user}>
            <div className="sm:-mt-16 flex flex-col">
            {children}
            </div>
            <Footer />
            </MobileMenu>
        </div>
    )
}