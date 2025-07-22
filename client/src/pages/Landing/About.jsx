import React from "react";
import {
  FiCalendar,
  FiClock,
  FiUsers,
  FiTarget,
  FiStar,
  FiZap,
  FiShield,
  FiSmartphone,
  FiMonitor,
  FiTablet,
  FiCheckCircle,
} from "react-icons/fi";
import {
  HiOutlineSparkles,
  HiOutlineLightBulb,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { icon: FiTarget, value: "100%", label: "Accuracy" },
    { icon: FiStar, value: "24/7", label: "Availability" },
    { icon: HiOutlineSparkles, value: "∞", label: "Events" },
    { icon: FiShield, value: "Secure", label: "Data" },
  ];

  const devices = [
    { icon: FiMonitor, label: "Desktop" },
    { icon: FiTablet, label: "Tablet" },
    { icon: FiSmartphone, label: "Mobile" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/5 to-[#EC4899]/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div
              data-aos="fade-up"
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 mb-8"
            >
              <HiOutlineSparkles className="w-5 h-5 text-[#7C3AED] mr-2" />
              <span className="text-[#7C3AED] font-medium text-sm">
                Modern Event Management
              </span>
            </div>

            <h1
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F59E0B] bg-clip-text text-transparent mb-8 leading-tight"
            >
              About EventFlow
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
            >
              A revolutionary event scheduling application that transforms how
              you organize, manage, and track your daily activities with
              intuitive design and powerful features.
            </p>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to={"/create"}
               className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started
              </Link>
              <Link to={"/events"} className="border-2 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300">
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div data-aos="fade-right">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#7C3AED]/20 to-[#EC4899]/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-2xl">
                <HiOutlineLightBulb className="w-12 h-12 text-[#F59E0B] mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Vision
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To revolutionize personal productivity by creating the most
                  intuitive and powerful event scheduling platform that adapts
                  to your unique workflow and helps you achieve more with less
                  effort.
                </p>
              </div>
            </div>
          </div>

          <div data-aos="fade-left">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#EC4899]/20 to-[#F59E0B]/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-2xl">
                <HiOutlineGlobeAlt className="w-12 h-12 text-[#EC4899] mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To empower individuals and teams with cutting-edge scheduling
                  tools that seamlessly integrate into their daily lives,
                  providing clarity, control, and confidence in managing their
                  time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#7C3AED] to-[#EC4899] rounded-3xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Design Section */}
      <div className="bg-gradient-to-br from-[#7C3AED]/5 to-[#EC4899]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-16">
            <h2
              data-aos="fade-up"
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Designed for Every Device
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
            >
              Seamlessly works across all your devices with responsive design
              and optimized performance
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            {devices.map((device, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 200}
                className="group text-center"
              >
                <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                  <device.icon className="w-12 h-12 text-[#7C3AED]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {device.label}
                </h3>
                <div className="flex justify-center mt-2">
                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#EC4899]"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center text-white">
            <h2
              data-aos="fade-up"
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Ready to Transform Your Schedule?
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-12"
            >
              Join thousands of users who have revolutionized their productivity
              with EventFlow
            </p>
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="bg-white text-[#7C3AED] hover:bg-gray-100 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-[#7C3AED] px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
