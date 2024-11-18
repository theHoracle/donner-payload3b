import { Cause } from "@/payload-types";
import CauseCard from "./ui/cause-card";

interface CauseReelProps {
    causes: Cause[]
}

const CauseReel = ({causes}: CauseReelProps) => {
    return <div className="py-12">
    <div className="flex items-center overflow-x-scroll md:grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
      {causes.map((cause, i) => (
          <CauseCard cause={cause} key={cause?.id} index={i} />
      ))}
    </div>
  </div>

}
export default CauseReel;