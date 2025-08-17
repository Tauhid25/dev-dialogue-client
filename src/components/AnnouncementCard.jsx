import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const AnnouncementCard = ({ item }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div data-aos="fade-up" className="bg-white p-4 rounded-lg shadow  dark:bg-gray-800 dark:text-white dark:border dark:border-white dark:rounded-lg">
      <div className="min-h-39 overflow-hidden">
        <div className="flex items-center gap-x-3">
          <img
            src={item.authorImage}
            alt={item.authorName}
            className="w-10 h-10 rounded-full"
          />
          <h3 className="font-semibold">{item.authorName}</h3>
        </div>
        <h4 className="text-lg font-bold text-gray-800 dark:text-white">{item.title}</h4>
        <p className="text-gray-600  dark:text-white">{item.description}</p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
