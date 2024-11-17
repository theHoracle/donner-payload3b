import Paragraph from "../ui/paragraph";
import MaxWidthWrapper from "../MaxWidthWrapper";
import TestimonialCard from "../TestiminialCard";

const Testimonials = () => {
  return (
    <section className="py-20">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <Paragraph variant="topic">Testimonials</Paragraph>
            <h2 className="capitalize text-2xl font-semibold tracking-tight leading-tight">
              What people say about us
            </h2>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 py-10 md:py-16">
              <TestimonialCard />
            </div>
          </div>
          <div>{/* Record */}</div>
          <div>{/* Brands we dey with */}</div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Testimonials;
