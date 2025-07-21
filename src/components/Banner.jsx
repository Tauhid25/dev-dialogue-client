import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { Typewriter } from 'react-simple-typewriter';

const Banner = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const { handleSearch } = useContext(AuthContext);
  const [input, setInput] = useState("");

  const onSearchClick = () => {
    handleSearch(input);
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="bg-[url('https://i.ibb.co/VX2sLwR/banner.jpg')] bg-center bg-cover min-h-100 flex flex-col justify-center items-center  text-center rounded-lg">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-10 px-2">
          <Typewriter
            words={["Welcome to DevDialogue Community", "Discuss. Learn. Grow."]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <input
            data-aos="fade-right"
            className="bg-white w-full lg:w-5/12 sm:w-50 px-4 py-2 rounded-2xl border border-gray-300 shadow-sm text-black"
            type="text"
            placeholder="Search by tag "
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            data-aos="fade-left"
            onClick={onSearchClick}
            className="btn btn-outline bg-[#009fff] text-white px-4 py-1 rounded-2xl text-base hover:bg-[#007dff] cursor-pointer"
          >
            Search Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
