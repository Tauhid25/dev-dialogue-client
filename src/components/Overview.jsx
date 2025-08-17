import React from "react";
import postImg from "../assets/post.png";
import announceImg from "../assets/announce.png";
import successPatientImg from "../assets/success-patients.png";
import successStaffImg from "../assets/success-staffs.png";
import CountUp from "react-countup";

const Overview = () => {
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-4xl font-bold py-2 md:py-4">
          Our <span className="text-blue-600">Success</span> at a Glance
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
        Explore DevDialogue’s milestones, achievements, and community impact through numbers that highlight our growing success.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Item 1 */}
        <div className="bg-white p-6 rounded-2xl flex flex-col items-center text-center shadow-sm">
          <img className="w-20 h-20 mb-4" src={postImg} alt="posts" />
          <p className="text-4xl font-bold text-blue-700">
            <CountUp end={150} duration={4} />M+ 
          </p>
          <p className="text-lg font-medium text-gray-600 mt-2">Total Posts</p>
        </div>

        {/* Item 2 */}
        <div className="bg-white p-6 rounded-2xl flex flex-col items-center text-center shadow-sm">
          <img className="w-20 h-20 mb-4" src={announceImg} alt="Announcements" />
          <p className="text-4xl font-bold text-blue-700">
            <CountUp end={120} duration={4} />K+
          </p>
          <p className="text-lg font-medium text-gray-600 mt-2">Total Announcements</p>
        </div>

        {/* Item 3 */}
        <div className="bg-white p-6 rounded-2xl flex flex-col items-center text-center shadow-sm">
          <img className="w-20 h-20 mb-4" src={successPatientImg} alt="Users" />
          <p className="text-4xl font-bold text-blue-700">
            <CountUp end={5} duration={4} />M+
          </p>
          <p className="text-lg font-medium text-gray-600 mt-2">Total Users</p>
        </div>

        {/* Item 4 */}
        <div className="bg-white p-6 rounded-2xl flex flex-col items-center text-center shadow-sm">
          <img className="w-20 h-20 mb-4" src={successStaffImg} alt="members" />
          <p className="text-4xl font-bold text-blue-700">
            <CountUp end={30} duration={4} />K+
          </p>
          <p className="text-lg font-medium text-gray-600 mt-2">Total Members</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;