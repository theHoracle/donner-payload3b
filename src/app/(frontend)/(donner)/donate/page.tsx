import CauseReel from "@/components/CauseReel";
import Hero from "@/components/Hero";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getAllCauses } from "@/lib/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
};

// type Param = string | string[] | undefined;
// interface CausesPageProps {
//   searchParams: Promise<{ [key: string]: Param }>;
// }
// const parse = (param: Param) => {
//   return typeof param === "string" ? param : undefined;
// };
const Causes = async () => {
  const {docs: cause} = await getAllCauses()

  return (
    <main className="flex flex-col">
      <Hero heroText="Donate To Our Causes" topic="Donations" />
      <MaxWidthWrapper>
        <section className="py-20">
          <CauseReel causes={cause} />
        </section>
      </MaxWidthWrapper>
    </main>
  );
};
export default Causes;
