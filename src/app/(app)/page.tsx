import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Hero
        heroImage="/flat-lay-paper-hand-holding-heart-with-copy-space.jpeg"
        heroText="Be a life saver for someone"
        showButtons={true}
        topic="Home"
      />
      <MaxWidthWrapper className="-translate-y-1/2 hidden md:block text-white">
        <div className="flex items-center gap-0 h-64 lg:mx-28 md:mx-0">
          <div className="w-1/3 grid place-items-center px-6 bg-green-500 justify-center h-full">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-lg">Education</h3>
              <p>
                70% of kids below 15 in Nigeria are out of school. This needs to
                change
              </p>
              <Link
                href="/#"
                className={cn(buttonVariants(), "bg-white text-green-500")}
              >
                Donate
              </Link>
            </div>
          </div>
          <div className="w-1/3 bg-primary justify-center bg-red-500 grid place-items-center px-6 h-full">
            <div className="flex flex-col gap-4 ">
              <h3 className="font-semibold text-lg">Become a volunteer</h3>
              <p>
                Our foundation welcomes any one with a good heart who volunteers
                to help with our work
              </p>
              <Link
                href="#volunteer"
                className={cn(
                  "text-white",
                  buttonVariants({ variant: "link" }),
                  "text-white"
                )}
              >
                Join foundation
              </Link>
            </div>
          </div>
          <div className="w-1/3 relative overflow-hidden bg-red-500 h-full">
            <Image
              src="/care-package.jpg"
              fill
              alt="Care package"
              className="absolute object-cover object-center "
            />
          </div>
        </div>
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
}
