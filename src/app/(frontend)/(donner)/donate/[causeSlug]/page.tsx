import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { notFound } from "next/navigation"
import ImageSwiper from "@/components/ui/image-swiper"
import ProgressBar from "@/components/ProgressBar"
import { getAllCauses, getCause } from "@/lib/queries"
import CauseReel from "@/components/CauseReel"
import RichText from "@/components/Block/RichText"
import { cookies } from "next/headers"
import { getServerSideUser } from "@/lib/payload-utils"
import MakeDonation from "@/components/MakeDonation"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make Donation",
};

interface PageProps {
    params: Promise<{
        causeSlug: string
    }>
}

const CausePage = async ({params}: PageProps) => {
    const causeSlug = (await params).causeSlug
    const [{docs: allCauses}, {docs: primaryCause}] = await Promise.all([
        getAllCauses(),
        getCause(causeSlug)
    ])
    const [cause] = primaryCause

    const authCookie = await cookies()
    const { user } = await getServerSideUser(authCookie)
    
    if(!cause) return notFound()

    const validUrls = cause.images?.map(({image}) => 
        (typeof image === 'string' ? 
        image : image.url))
    .filter(Boolean) as string[];


    return <div>
        <div aria-hidden className="hidden md:block bg-stone-500/70 -z-10 h-16" />
      <MaxWidthWrapper className='bg-white'>
       <section id="cause" className='bg-white'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'> 

            {/* Product Details */}
            <div className='lg:max-w-lg lg:self-end '>
                <div className='mt-4'>
                    <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                        {cause.title}
                    </h1>
                </div>

                <section className='mt-4'>
                    <RichText content={cause.description} />
                </section>
            </div>

             {/* Product images */}
             <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
                <div className='aspect-square rounded-lg'>
                    <ImageSwiper urls={validUrls} />
                </div>
            </div>

            <div className='lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
                <div>
                    <div className='my-6 flex flex-col  gap-2 text-muted-foreground text-sm'>
                        <p className="text-center w-full">Help us get to our goal ❤️</p>
                        <ProgressBar target={cause.target} raisedAmount={cause.raisedAmount} />
                    </div>
                    <div className='bg-gray-100 px-6 py-4 rounded-lg'>
                       <MakeDonation causeId={cause.id} user={user} />
                    </div>
                </div>
            </div>
        </div>
    </section>
    <CauseReel causes={allCauses} />
    </MaxWidthWrapper>
    </div>
}

export default CausePage;