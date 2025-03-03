import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="absolute left-10 top-1/5 transform">
            {/* <Image
                            src={logo}
                            alt="Logo"
                            width={80}
                            height={40}
                            className="object-contain"
                        /> */}
          </div>
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold text-white">
              Country Data Overview
            </div>
          </div>
          <div className="hidden md:flex space-x-6 ml-auto">
            <a href="/" className="text-lg text-gray-300 hover:text-white">
              Home
            </a>
            <a href="/about" className="text-lg text-gray-300 hover:text-white">
              About
            </a>
            <a
              href="/contact"
              className="text-lg text-gray-300 hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
