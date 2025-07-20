import React, { useEffect } from "react";
import { FaUserFriends, FaCode, FaBullhorn } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className="bg-gray-50 py-12 px-6 md:px-10 lg:px-24 min-h-screen">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          About DevDialogue
        </h1>
        <p className="text-gray-600 text-lg">
          DevDialogue is a collaborative platform where developers share
          knowledge, ask questions, and connect through meaningful technical
          discussions.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div
          data-aos="flip-right"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
        >
          <FaUserFriends className="text-4xl text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Community Driven</h2>
          <p className="text-gray-600">
            Built for developers by developers. Share ideas, solve problems, and
            grow together.
          </p>
        </div>
        <div
          data-aos="flip-right"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
        >
          <FaCode className="text-4xl text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Focused on Code</h2>
          <p className="text-gray-600">
            Post code snippets, vote on best practices, and get insightful
            feedback from peers.
          </p>
        </div>
        <div
          data-aos="flip-right"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
        >
          <FaBullhorn className="text-4xl text-yellow-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Announcements & Tags</h2>
          <p className="text-gray-600">
            Stay updated with platform announcements and easily discover content
            using tags.
          </p>
        </div>
      </div>

      <div
        data-aos="fade-up"
        className="mt-16 max-w-4xl mx-auto text-center bg-white p-6 rounded-lg shadow"
      >
        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          At <strong>DevDialogue</strong>, we aim to empower developers by
          providing a safe, inclusive, and technically rich environment for
          discussions. Whether you're a beginner or a seasoned expert — there's
          a place for you here to learn, teach, and grow.
        </p>
      </div>
    </div>
  );
};

export default About;
