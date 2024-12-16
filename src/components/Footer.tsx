import Image from "next/image";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Social media icons from react-icons

export default function Footer() {
  return (
    <footer className="bg-gray-800 flex flex-col items-center text-white py-6 w-full">
      <div className=" px-2 flex lg:flex-row flex-col w-full justify-between items-center">
        <div className="flex items-center justify-center w-1/3">
          <Image
            src="/svg/logo_now_white.svg"
            width={0}
            height={0}
            alt="Company Logo"
            className="w-48 h-24 mr-4"
            loading="lazy"
          />
        </div>
        <div className="mt-4 w-1/3 flex flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6">
          <a href="/support" className="hover:underline">
            Company Support
          </a>
          <a href="/follow-us" className="hover:underline">
            Follow Us
          </a>
        </div>
        <div className="mt-4 flex space-x-6 w-1/3 flex-row items-center justify-center">
          <FaFacebook size={24} />
          <FaTwitter size={24} />
          <FaInstagram size={24} />
          <FaLinkedin size={24} />
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-400">
        &copy; 2024 Now Think. All rights reserved.
      </div>
    </footer>
  );
}
