import Link from "next/link";
import { cn } from "@/lib/utils";
import { Cause } from "@/payload-types";
import { buttonVariants } from "./button";
import ProgressBar from "../ProgressBar";
import Image from "next/image";


interface CauseCardProps {
  cause: Cause | null;
  index: number;
}
const CauseCard = ({ cause }: CauseCardProps) => {
  const validImageUrls = cause?.images
    ?.map(({ image }) => (typeof image === "string" ? image : image.thumbnailURL))
    .filter(Boolean) as string[];

  if (!cause) return <CausePlaceholder />;
  return (
      <div className="bg-gray-100 rounded-xl min-w-72">
        <div className="flex flex-col w-full">
          {/* <ImageSwiper urls={validImageUrls} /> */}
          <div className="relative aspect-square overflow-hidden rounded-t-xl">
            <Image 
            alt={cause.slug}
            src={validImageUrls[0]}
            className="object-cover object-center"
            fill
            />
          </div>
          <div className="px-3 py-2.5 flex flex-col gap-3">
            <h3 className="font-medium text-sm">{cause.title}</h3>
            <ProgressBar raisedAmount={cause.raisedAmount} target={cause.target} />
            <Link href={`/donate/${cause.slug}#cause`} className={cn(buttonVariants())}>
              Donate
            </Link>
          </div>
        </div>
      </div>
    );
  };

const CausePlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      {/* <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="w-full h-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <div>
        <Skeleton className="mt-2 w-full h-4 rounded-lg" />
        <div className="flex flex-row items-center justify-between">
          <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
          <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
        </div>
      </div>
      <Skeleton className="mt-2 w-full h-4 rounded-lg" /> */}
    </div>
  );
};

export default CauseCard;
