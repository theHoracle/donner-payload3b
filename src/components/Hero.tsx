import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface HeroProps {
  heroImage?: string
  showButtons?: boolean
  topic?: string
  heroText?: string
  description?: string
}
const Hero = ({ 
  heroImage = '/flat-lay-paper-hand-holding-heart-with-copy-space.jpeg',
  showButtons = true,
  topic = 'Empowering Communities',
  heroText = 'Together We Can Make a Difference',
  description = 'Join us in our mission to create positive change and improve lives around the world.'
}: HeroProps
) => {
  return (
    <div className="relative h-screen w-screen md:h-screen grid place-items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      {/* Content Layer */}
      <div className="relative z-10 flex items-center justify-center h-full flex-col">
        <MaxWidthWrapper>
        {/* Main Content */}
          <div className="text-center max-w-4xl">
            <span className="inline-block rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground mb-4">
              {topic}
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {heroText}
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-200 mb-8">
              {description}
            </p>
            {showButtons && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/donate#causes" className={cn(buttonVariants({size: 'lg'}), "w-3/4 sm:w-auto text-lg")}>
                  Donate Now
                  <Heart className="ml-2 h-5 w-5" />
                </Link>
                
                <Link href="/faq" className={cn(buttonVariants({size: 'lg', variant: 'outline'}), "w-3/4 sm:w-auto text-lg")}>
                  Learn more
                  <ArrowRight  />
                </Link>
              </div>
            )}
          </div>
          </MaxWidthWrapper>
        </div>
    </div>
  );
};

export default Hero;
