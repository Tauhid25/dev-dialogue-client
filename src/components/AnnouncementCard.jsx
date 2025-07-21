import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const AnnouncementCard = ({ item }) => {
        useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div data-aos="fade-left" className="bg-white p-4 rounded shadow border">
      <div className="flex items-center gap-3 mb-2 min-h-24">
        <img
          src={item.authorImage}
          alt={item.authorName}
          className="w-10 h-10 rounded-full"
        />
        <h3 className="font-semibold">{item.authorName}</h3>
      </div>
      <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
      <p className="text-gray-600">{item.description}</p>
    </div>
  );
};

export default AnnouncementCard;
