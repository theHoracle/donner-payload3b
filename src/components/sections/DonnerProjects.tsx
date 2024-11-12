import Link from "next/link"
import { buttonVariants } from "../ui/button"
import Paragraph from "../ui/paragraph"
import { cn } from "@/lib/utils"

const DonnerProjects = () => {
    return (
        <section>
        <div className="grid grid-cols-4 grid-rows-2 py-20 w-screen">
          <div className="col-span-2 max-h-  bg-green-200 p-4 md:p-12 ">
            <div className="flex flex-col items-start">
              <Paragraph variant="topic">what we did</Paragraph>
              <h2 className="capitalize text-2xl font-semibold tracking-tight leading-tight">
                Completed Projects</h2>
              <Paragraph className="max-h-12 md:max-h-20 overflow-x-scroll">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis neque ab quaerat. Assumenda quod natus earum
                consectetur consequuntur sunt animi officia, dolore cum
                inventore eveniet?
              </Paragraph>
              <Link
                href="#"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "text-sm mt-3"
                )}
              >
                See Completed Projects
              </Link>
            </div>
          </div>
          <div className="col-span-1 bg-red-200 "></div>
          <div className="col-span-1 bg-blue-200 "></div>
          <div className="col-span-1 bg-zinc-200 "></div>
          <div className="col-span-1 bg-rose-400 "></div>
          <div className="col-span-1 bg-purple-200 "></div>
          <div className="col-span-1 bg-lime-800 "></div>
        </div>
      </section>
    )
}

export default DonnerProjects