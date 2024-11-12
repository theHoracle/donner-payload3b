import { howItWorks } from "@/data/howitworks";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Paragraph from "../ui/paragraph";

export const HowitWorks = () => {
    return (
        <section className="border  border-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="flex flex-col items-center">
            <Paragraph variant="topic">What we do</Paragraph>
            <h2 className="capitalize text-2xl font-semibold tracking-tight leading-tight">
              We do for people in need
            </h2>
          </div>
          <div className="grid grid-cols-2 grid-rows-3 gap-x-6 gap-y-12 lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-8 lg:gap-y-0">
            {howItWorks.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-start text-left lg:block lg:text-center py-10"
                >
                  <div>
                    <div className="md:flex-shrink-0 flex lg:justify-center">
                      <div className="h-16 w-16 rounded-full flex items-center justify-center bg-blue-100 text-blue-900">
                        {<item.icon className="h-1/3 w-1/3" />}
                      </div>
                    </div>
                    <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                      <h3 className="text-base font-medium text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm  text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </section>
    )
}
