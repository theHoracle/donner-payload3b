import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import {SocialIcon} from 'react-social-icons'

const Footer = () => {
  const footerLinks = [
    ["About us", "/about-us"],
    ["Volunteer", "/volunteer"],
    ["Causes", "/donate"],
    ["Projects", "/projects"],
    ["Team", "/team"],
  ];

  const socialLinks = [
   'https://www.x.com/donner',
   'https://www.facebook.com/donner',
   'https://www.instagram.com/donner',
  
  ]

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sponsorsLogos = [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
  ]

  return (
    <footer className="bg-gray-800 text-gray-300 text-sm">
       {/* Sponsors Section */}
       <div className="container mx-auto py-8 px-4">
        <h3 className="text-2xl font-semibold text-center mb-6">Our Sponsors</h3>
        {/* <div className="flex justify-center items-center space-x-8">
          {sponsorsLogos.map((i) => (
            <Image
              key={i}
              src={`/placeholder.svg?height=60&width=120`}
              alt={`Sponsor ${i}`}
              width={120}
              height={60}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          ))}
        </div> */}
      </div>
      <MaxWidthWrapper>
         {/* Main Footer Content */}
      <div className="bg-gray-800 text-white">
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="space-y-4">
              <Image src="/placeholder.svg?height=60&width=200" alt="Donner Foundation Logo" width={200} height={60} />
              <h2 className="text-2xl font-bold">Donner Foundation</h2>
              <p className="text-gray-300">Empowering communities through generosity and compassion.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link[0]}>
                    <Link href={link[1]} className="hover:text-gray-300 transition-colors">
                      {link[0]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

           {/* Contact Information */}
           <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Phone size={18} className="mr-2" />
                  <span>(123) 456-7890</span>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className="mr-2" />
                  <a href="mailto:info@donnerfoundation.org" className="hover:text-gray-300 transition-colors">
                    info@donnerfoundation.org
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <SocialIcon key={index} 
                    url={link}
                    bgColor="transparent"  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright and Creator Info */}
      <div className="bg-gray-900 text-gray-400 py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>&copy; 2024 Donner Foundation. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Website by{' '}
            <a
              href="https://thehoracledev.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              theHoracle.dev
            </a>
          </p>
        </div>
      </div>
      </MaxWidthWrapper>
    </footer>
  );
};
export default Footer;
