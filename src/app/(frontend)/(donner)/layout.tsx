import Footer from "@/components/Footer";
import Navbar from "@/components/Nav/Navbar";

export default function PageLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div className="relative flex flex-col min-w-full">
            <Navbar />
            <div className="-mt-16">
            {children}
            </div>
            <Footer />
        </div>
    )
}