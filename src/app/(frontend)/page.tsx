import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MobileMenu from "@/components/Nav/MobileMenu";
import Navbar from "@/components/Nav/Navbar";
import AboutDonner from "@/components/sections/AboutDonner";
import Causes from "@/components/sections/Causes";
import { HowitWorks } from "@/components/sections/DonnerProcess";
import DonnerProjects from "@/components/sections/DonnerProjects";
import EventsCalender from "@/components/sections/EventsCalender";
import FoundationTeam from "@/components/sections/FoundationTeam";
import Testimonials from "@/components/sections/FoundationTestimonials";
import NewsletterSub from "@/components/sections/NewsletterSub";
import { buttonVariants } from "@/components/ui/button";
import { getAllCauses } from "@/lib/queries";
import { getUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const user = await getUser()
  const {docs: causes} = await getAllCauses()

  return (
    <div className=''>
      <Navbar user={user} />
      <MobileMenu user={user} >
      <div className="">

      <div className="md:-mt-16">
      {/* Hero section */}
      <Hero />
      </div>
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
                href="/donate"
                className={cn(buttonVariants(), "bg-white text-green-500")}
              >
                Donate
              </Link>
            </div>
          </div>
          <div className="w-1/3 bg-primary justify-center bg-red-500 grid place-items-center px-6 h-full">
            <div className="flex flex-col item-center justify-center gap-4 ">
              <h3 className="font-semibold text-lg">Become a volunteer</h3>
              <p>
                Our foundation welcomes any one with a good heart who volunteers
                to help with our work
              </p>
              <Link
                href="/volunteer"
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

      {/* donner foundation intro */}
      <AboutDonner />

      {/* Donner foundation top cause to battle */}
      <Causes causes={causes} />
      
      {/* Become a volunteer */}
      <div className="bg-red-500 w-full h-60 flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl text-stone-100 text-center font-black capitalize tracking-tighter leading-tight">
          Want to join our mission?
        </h1>
          <Link href="/volunteer" className={buttonVariants({variant: 'secondary'})}>
            Click here!
          </Link>
      </div>
      
      {/* How donner works,  */}
      <HowitWorks />

      {/* Donner completed projects -- and extras */}
      <DonnerProjects />

      {/* Verified testimonials for donner foundation */}
      <Testimonials />
      
      {/* Team behind donner foundation */}
      <FoundationTeam />

      {/* Upcoming Events */}
      <EventsCalender />

      {/* Subscribe to newlerrer */}
      <NewsletterSub />



      <Footer />
      </div>
    </MobileMenu>
    </div>
  );
}
