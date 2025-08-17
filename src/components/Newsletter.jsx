import React from "react";

const Newsletter = () => {
  return (
    <div className="pt-8 md:pt-12">
      <div className="bg-white text-gray-900 border border-gray-200 px-6 py-12 rounded-2xl text-center shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Stay Updated with DevDialogue
        </h2>
        <p className="mb-6 text-gray-600">
          Subscribe to receive the latest updates, developer insights, and
          community news from DevDialogue.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-4 py-3 rounded-xl border border-[#009fff] focus:outline-none focus:ring-2 focus:ring-[#007dff]"
            required
          />
          <button
            type="submit"
            className="bg-[#009fff] hover:bg-[#007dff] text-white px-6 py-3 rounded-xl transition duration-300 cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;

