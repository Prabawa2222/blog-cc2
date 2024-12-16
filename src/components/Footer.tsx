import Image from "next/image";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Social media icons from react-icons

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 justify-between">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center w-1/3">
          <Image
            src="/svg/logo_now_white.svg"
            width={0}
            height={0}
            alt="Company Logo"
            className="w-48 h-24 mr-4"
            loading="lazy"
          />
        </div>
        <div className="mt-4 md:mt-0 w-1/3 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          <a href="/support" className="hover:underline">
            Company Support
          </a>
          <a href="/follow-us" className="hover:underline">
            Follow Us
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="mt-4 md:mt-0 flex space-x-6 w-1/3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 text-center text-sm text-gray-400">
        &copy; 2024 Your Company. All rights reserved.
      </div>
    </footer>
  );
}
