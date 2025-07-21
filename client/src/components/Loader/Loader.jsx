import React from "react";
import { FaCalendarAlt, FaClock, FaUsers, FaStar } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      {/* Main Container */}
      <div className="text-center px-4 sm:px-6 lg:px-8">
        {/* Animated Icons Circle */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8">
          {/* Central Calendar Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#7C3AED] rounded-xl flex items-center justify-center shadow-lg animate-pulse">
              <FaCalendarAlt className="text-white text-2xl sm:text-3xl" />
            </div>
          </div>

          {/* Orbiting Icons */}
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "3s" }}
          >
            {/* Clock Icon */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#EC4899] rounded-full flex items-center justify-center shadow-md">
                <FaClock className="text-white text-sm sm:text-base" />
              </div>
            </div>

            {/* Users Icon */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F59E0B] rounded-full flex items-center justify-center shadow-md">
                <FaUsers className="text-white text-sm sm:text-base" />
              </div>
            </div>

            {/* Star Icon */}
            <div className="absolute top-1/2 right-0 transform translate-x-2 -translate-y-1/2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#3B82F6] rounded-full flex items-center justify-center shadow-md">
                <FaStar className="text-white text-xs sm:text-sm" />
              </div>
            </div>

            {/* Additional decorative dot */}
            <div className="absolute top-1/2 left-0 transform -translate-x-2 -translate-y-1/2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-full shadow-md animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7C3AED] mb-2 animate-fade-in">
            Event Scheduler
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg animate-fade-in-delay">
            Organizing your perfect schedule...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 sm:w-80 mx-auto mb-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F59E0B] rounded-full animate-loading-bar"></div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div
            className="w-3 h-3 bg-[#7C3AED] rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-3 h-3 bg-[#EC4899] rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-3 h-3 bg-[#F59E0B] rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-[#7C3AED] opacity-20 rounded-full animate-float"></div>
        <div className="absolute top-20 right-16 w-6 h-6 bg-[#EC4899] opacity-20 rounded-full animate-float-delay"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-[#F59E0B] opacity-20 rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-12 w-5 h-5 bg-[#3B82F6] opacity-20 rounded-full animate-float-delay"></div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(120deg);
          }
          66% {
            transform: translateY(5px) rotate(240deg);
          }
        }

        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(8px) rotate(-120deg);
          }
          66% {
            transform: translateY(-6px) rotate(-240deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.5s forwards;
          opacity: 0;
        }

        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .absolute.top-10.left-10,
          .absolute.top-20.right-16,
          .absolute.bottom-20.left-20,
          .absolute.bottom-32.right-12 {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
