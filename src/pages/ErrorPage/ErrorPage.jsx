import React from "react";
import NotFoundLottie from "../../assets/lotties/NoDataFound.json";
import { Link } from "react-router";
import Lottie from "lottie-react";


const ErrorPage = () => {
  return (
    <div className="bg-gray-100 px-6 sm:px-8 lg:px-12 py-12 text-center min-h-screen dark:bg-gray-800 dark:text-white">
      <div className="bg-white mx-auto p-4 sm:p-8 lg:p-4 rounded-2xl max-w-lg sm:max-w-xl lg:max-w-2xl">
             <Lottie
          loop={true}
          animationData={NotFoundLottie}
          className="w-full sm:w-1/2 mx-auto"
        ></Lottie>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-red-500 text-center pt-6">
        404 - Page Not Found
      </h1>
      <p className="font-semibold text-center pt-4 text-xl sm:text-2xl text-gray-600 dark:text-white">
        We’re sorry, but the page you requested could not be found.
      </p>
      <div className="pt-4">
        <Link to="/">
          <button className="btn bg-[#009fff] text-lg sm:text-xl text-white px-6 py-4 sm:px-8 sm:py-6 rounded-lg hover:bg-[#007dff]">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
