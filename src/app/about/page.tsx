"use client";

import React from "react";
import Image from "next/image";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          About Now Think
        </h1>
        <p className="text-lg text-gray-600">
          Now Think is a blog dedicated to exploring the world of technology. We
          dive deep into coding, tutorials, programming languages, best
          practices, and the latest trends in the tech industry. Whether you are
          a beginner or an expert, Now Think aims to provide valuable insights
          to fuel your passion for technology.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Meet the Author
        </h2>
        <div className="flex justify-center items-center gap-8">
          <Image
            src="/author-photo.jpg"
            alt="Author"
            width={150}
            height={150}
            className="rounded-full shadow-md"
          />
          <div className="text-left">
            <h3 className="text-2xl font-semibold text-gray-800">John Doe</h3>
            <p className="text-lg text-gray-600">
              John Doe is a passionate software developer and tech enthusiast
              with over 10 years of experience in building web applications. He
              loves sharing his knowledge through blog posts and tutorials to
              help others excel in the tech world.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-2xl text-blue-600 hover:text-blue-800" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-2xl text-blue-400 hover:text-blue-600" />
              </a>
              <a
                href="https://www.github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-2xl text-gray-800 hover:text-black" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 p-6 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-600 mb-4">
          Our mission at Now Think is to empower individuals and organizations
          with the knowledge they need to succeed in the ever-evolving world of
          technology. We aim to provide insightful, practical content that makes
          complex concepts more accessible to everyone.
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
        <p className="text-lg text-gray-600">
          We envision a future where technology is an enabler of growth,
          creativity, and innovation for all. Through our blog, we aspire to
          help people stay ahead of the curve and make meaningful contributions
          to the tech community.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-600 mb-4">
          Have any questions, feedback, or collaboration opportunities? We would
          love to hear from you! Feel free to reach out to us at:
        </p>
        <p className="text-xl font-semibold text-gray-800">
          Email:{" "}
          <a href="mailto:contact@nowthink.com" className="text-blue-600">
            contact@nowthink.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
