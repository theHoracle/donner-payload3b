import Link from "next/link"
import MaxWidthWrapper from "../MaxWidthWrapper"
import Paragraph from "../ui/paragraph"
import { buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"

const Causes = () => {
 return <section className="bg-blue-100">
 <MaxWidthWrapper>
   <div className="py-20">
     <div className="flex items-end justify-between">
       <div className="md:w-1/2">
         <Paragraph variant="topic" size="sm">
           Causes
         </Paragraph>
         <h2 className="capitalize text-2xl font-semibold tracking-tight leading-tight">
             You can help lots of people with just a little donation
         </h2>
       </div>
       <Link
         href="/causes"
         className={cn(
           buttonVariants({ variant: "link" }),
           "hidden md:block"
         )}
       >
         See all projects &rarr;
       </Link>
     </div>
     <div>
       {/* <CauseReel /> */}
     </div>
     <Link
       href="/causes"
       className={cn(
         buttonVariants({ variant: "link" }),
         "block md:hidden text-right"
       )}
     >
       See all projects &rarr;
     </Link>
   </div>
 </MaxWidthWrapper>
</section>   
}

export default Causes;