import Image from "next/image";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Paragraph from "../ui/paragraph";
import Link from "next/link";
import { HandHeart } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const team = [
    {
      image: "/theHoracle.jpg",
      fullName: "John Doe",
      socials: ["https://www.x.com/", "https://www.instagram.com/"],
    },
    {
      image: "/theHoracle.jpg",
      fullName: "John Doe",
      socials: ["https://www.x.com/", "https://www.instagram.com/"],
    },
    {
      image: "/theHoracle.jpg",
      fullName: "John Doe",
      socials: ["https://www.x.com/", "https://www.instagram.com/"],
    },
    {
      image: "/theHoracle.jpg",
      fullName: "John Doe",
      socials: ["https://www.x.com/", "https://www.instagram.com/"],
    },
  ];

const FoundationTeam = () => {
    return <section className="bg-zinc-100 py-20">
    {/* Team */}
    <MaxWidthWrapper>
      <div>
        <div className="flex flex-col items-center ">
          <Paragraph variant="topic">Team</Paragraph>
          <h2 className="capitalize text-2xl font-semibold tracking-tight leading-tight">
            Meet our volunteers
          </h2>
        </div>
        <div>
          <div
            className="grid grid-cols-2 grid-rows-2 lg:grid-rows-1 lg:grid-cols-4 gap-x-4 my-10
          "
          >
            {team.map((member, index) => {
              if (index > 2) return;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-xl overflow-hidden"
                >
                  <div className="relative h-72 w-full">
                    <Image
                      src={member.image}
                      alt={member.fullName}
                      fill
                      className="absolute object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col items-center my-2 px-4">
                    <h4 className="font-medium text-lg">
                      {member.fullName}
                    </h4>
                    {/* <div className="flex items-center -mt-2 justify-around">
                      {member.socials.map((social) => (
                        <SocialIcon
                          key={social}
                          url={social}
                          bgColor="transparent"
                          className="h-3 w-3 "
                          fgColor="gray"
                        />
                      ))}
                    </div> */}
                  </div>
                </div>
              );
            })}
            <div className="bg-zinc-200 rounded-xl overflow-hidden grid place-items-center px-4 min-w-24">
              <div className="flex flex-col items-center gap-2 ">
                <div className="border rounded-full p-4 bg-primary">
                  <HandHeart className="h-7 w-7 text-white z-10" />
                </div>
                <h4 className="font-semibold text-lg text-center">
                  Become a Volunteer
                </h4>
                <Paragraph className="text-center">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Tenetur esse aspernatur aliquam maiores natus odio
                  repudiandae illum, cumque rerum culpa.
                </Paragraph>
                <Link
                  href="#volunteer"
                  className={cn(buttonVariants({ variant: "link" }))}
                >
                  Become a member
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  </section>
}

export default FoundationTeam;