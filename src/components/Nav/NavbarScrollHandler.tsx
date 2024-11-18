'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { ReactNode, useEffect, useState } from 'react';

interface NavbarScrollHandlerProps {
  children: ReactNode;
}
const NavbarScrollHandler = ({ children }: NavbarScrollHandlerProps) => {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => {
      if (window !== undefined) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setScreenHeight(window.innerHeight);
    if (scrollY > 64) {
      // Change navbar background color when scrolled down
      setIsScrolledDown(true);
    } else {
      // Reset navbar background color when scrolled to the top
      setIsScrolledDown(false);
    }
  }, [scrollY, screenHeight]);
  if(isMobile) return null
  return (
    <div
      className={`sticky z-50 md:block top-0 inset-x-0 h-16 text-gray-700 ${
        isScrolledDown && 'text-white'
      }`}
    >
      <div className="relative">
        <div
          className={cn(
            {
              'absolute inset-0 -z-10 backdrop-blur bg-gray-400/60 shadow-lg':
                isScrolledDown,
            },
            'transition-all',
          )}
        />
        {children}
      </div>
    </div>
  );
};
export default NavbarScrollHandler;
