

import CauseReel from "@/components/CauseReel";
import Hero from "@/components/Hero";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getAllCauses } from "@/lib/queries";

type Param = string | string[] | undefined;
interface CausesPageProps {
  searchParams: Promise<{ [key: string]: Param }>;
}
const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};
const Causes = async (props: CausesPageProps) => {
  const searchParams = await props.searchParams;
  // const sort = parse(searchParams.sort);

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
