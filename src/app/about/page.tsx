"use client";

import React from "react";
import Image from "next/image";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto bg-white px-4 lg:px-12 lg:py-48 py-32 min-h-screen">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          About Now_Think..
        </h1>
        <p className="text-base text-gray-600 font-InterRegular leading-relaxed">
          Now_Think is a blog dedicated to exploring the world of technology. We
          dive deep into coding, tutorials, programming languages, best
          practices, and the latest trends in the tech industry. Whether you are
          a beginner or an expert, Now_Think aims to provide valuable insights
          to fuel your passion for technology.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center lg:text-left">
          Meet the Author
        </h2>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-8">
          <Image
            src="/author.jpg"
            alt="Portrait of John Doe, the author"
            width={150}
            height={150}
            className="rounded-full shadow-md object-cover "
            loading="lazy"
          />
          <div className="flex flex-col lg:items-start items-center">
            <h3 className="text-2xl font-semibold text-gray-800">John Doe</h3>
            <p className="text-sm text-gray-600 font-InterRegular leading-relaxed text-center lg:text-left">
              John Doe is a passionate software developer and tech enthusiast
              with over 10 years of experience in building web applications. He
              loves sharing his knowledge through blog posts and tutorials to
              help others excel in the tech world.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://linkedin.com/in/johndoe"
                aria-label="Visit John Doe's LinkedIn profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-blue-600 hover:text-blue-800"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com/johndoe"
                aria-label="Visit John Doe's Twitter profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-blue-400 hover:text-blue-600"
              >
                <FaTwitter />
              </a>
              <a
                href="https://github.com/johndoe"
                aria-label="Visit John Doe's GitHub profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-800 hover:text-black"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 p-6 rounded-lg mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Our Mission
        </h2>
        <p className="text-sm text-gray-600 font-InterRegular leading-relaxed mb-6 text-center lg:text-left">
          Our mission at Now_Think is to empower individuals and organizations
          with the knowledge they need to succeed in the ever-evolving world of
          technology. We aim to provide insightful, practical content that makes
          complex concepts more accessible to everyone.
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Our Vision
        </h2>
        <p className="text-sm text-gray-600 font-InterRegular leading-relaxed text-center lg:text-left">
          We envision a future where technology is an enabler of growth,
          creativity, and innovation for all. Through our blog, we aspire to
          help people stay ahead of the curve and make meaningful contributions
          to the tech community.
        </p>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
        <p className="text-sm text-gray-600 font-InterRegular leading-relaxed mb-4">
          Have any questions, feedback, or collaboration opportunities? We would
          love to hear from you! Feel free to reach out to us at:
        </p>
        <p className="text-lg font-semibold">
          Email:
          <a
            href="mailto:contact@nowthink.com"
            className="text-blue-600 hover:underline"
          >
            contact@nowthink.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
