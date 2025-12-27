/* ---------------------------------------------------------------------------
NotFound.jsx
This page will be rendered every time the user searches an unavailable resource
------------------------------------------------------------------------------ */

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Container for Centering and Content Styling */}
      <div className="max-w-md w-full space-y-8 text-center">
        {/* 404 Error Code - Large and Attention-Grabbing */}
        <p className="text-9xl font-extrabold text-indigo-600 tracking-wider opacity-75">
          404
        </p>

        {/* Main Heading and Description */}
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Oops! It looks like you've followed a broken link or entered a URL
          that doesn't exist on our site.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          {/* Go Home Button */}
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Go to Homepage
          </Link>

          {/* Contact Support/Another Action (Optional) */}
          <Link
            to="/" // Assuming you have a contact page
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Contact Support
          </Link>
        </div>

        {/* Optional Branding or Footer Text */}
        <div className="mt-8 text-sm text-gray-400">
          <p>We apologize for the inconvenience.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
