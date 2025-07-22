import React, { useEffect } from "react";
import {
  FiCalendar,
  FiPlus,
  FiArrowRight,
  FiClock,
  FiBell,
  FiUsers,
  FiTrendingUp,
  FiCheckCircle,
} from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const Banner = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 min-h-screen flex items-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-[#7C3AED]/10 to-[#EC4899]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-[#F59E0B]/10 to-[#7C3AED]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#EC4899]/5 to-[#7C3AED]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <div data-aos="fade-right" data-aos-delay="100">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED]/10 to-[#EC4899]/10 text-[#7C3AED] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <FiTrendingUp className="text-sm" />
                Smart AI-Powered Scheduling
              </div>

              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Transform Your
                <span className="block bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">
                  Time Management
                </span>
                Experience
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Seamlessly organize work, personal, and lifestyle events with
                intelligent categorization. Experience the future of
                productivity with our advanced scheduling platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <Link to={"/create"}
               className="group bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#7C3AED]/25 transform hover:-translate-y-1">
                <FiPlus className="text-lg group-hover:rotate-90 transition-transform duration-300" />
                Create Your First Event
                <div className="w-0 group-hover:w-6 transition-all duration-300 overflow-hidden">
                  <FiArrowRight className="text-lg" />
                </div>
              </Link>

              <Link to={"/events"} className="group border-2 border-[#7C3AED]/20 hover:border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300">
                <FiCalendar className="text-lg group-hover:scale-110 transition-transform duration-300" />
                View Demo
                <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Features */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="w-3 h-3 rounded-full bg-[#3B82F6]"></div>
                <span className="text-sm font-medium text-gray-700">
                  Work Events
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="w-3 h-3 rounded-full bg-[#EC4899]"></div>
                <span className="text-sm font-medium text-gray-700">
                  Personal
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                <span className="text-sm font-medium text-gray-700">
                  Lifestyle
                </span>
              </div>
            </div>
          </div>

          {/* Right Dashboard */}
          <div
            className="lg:w-1/2 relative w-full max-w-lg mx-auto lg:max-w-none"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            {/* Floating Cards */}
            <div
              className="absolute -top-8 -left-8 z-20"
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#EC4899] to-[#F472B6] rounded-xl flex items-center justify-center">
                    <FiBell className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Next Event</p>
                    <p className="font-semibold text-sm">Team Standup</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute -top-4 -right-8 z-20"
              data-aos="zoom-in"
              data-aos-delay="700"
            >
              <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] rounded-xl flex items-center justify-center">
                    <FiUsers className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">This Week</p>
                    <p className="font-semibold text-sm">12 Events</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Dashboard */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100/50 backdrop-blur-sm">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] p-6">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <FiCalendar className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Event Dashboard</h3>
                      <p className="text-white/80 text-sm">Today, July 21</p>
                    </div>
                  </div>
                  <FiPlus className="text-xl cursor-pointer hover:scale-110 transition-transform duration-200" />
                </div>
              </div>

              {/* Events List */}
              <div className="p-6 space-y-4">
                {[
                  {
                    title: "Strategy Meeting",
                    time: "10:00 AM - 11:30 AM",
                    color: "#3B82F6",
                    category: "Work",
                    icon: FiUsers,
                  },
                  {
                    title: "Lunch with Sarah",
                    time: "12:30 PM - 1:30 PM",
                    color: "#EC4899",
                    category: "Personal",
                    icon: FiClock,
                  },
                  {
                    title: "Gym Session",
                    time: "6:00 PM - 7:00 PM",
                    color: "#EC4899",
                    category: "Personal",
                    icon: FiTrendingUp,
                  },
                  {
                    title: "Car Maintenance",
                    time: "Tomorrow, 2:00 PM",
                    color: "#F59E0B",
                    category: "Other",
                    icon: FiCheckCircle,
                  },
                ].map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group cursor-pointer border border-gray-100/50"
                    data-aos="fade-up"
                    data-aos-delay={500 + index * 100}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: event.color }}
                    >
                      <event.icon className="text-lg" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-[#7C3AED] transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-500">{event.time}</p>
                      <span
                        className="inline-block text-xs px-2 py-1 rounded-full mt-1"
                        style={{
                          backgroundColor: `${event.color}15`,
                          color: event.color,
                        }}
                      >
                        {event.category}
                      </span>
                    </div>
                    <FiArrowRight className="text-gray-400 group-hover:text-[#7C3AED] group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 pt-0">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-purple-50/50 rounded-xl border border-gray-100/50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-lg flex items-center justify-center">
                      <FiTrendingUp className="text-white text-sm" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      4 events this week
                    </span>
                  </div>
                  <button className="text-[#7C3AED] hover:text-[#6D28D9] text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-200">
                    View Calendar
                    <FiArrowRight className="text-sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Floating Card */}
            <div
              className="absolute -bottom-6 -right-4 z-20"
              data-aos="zoom-in"
              data-aos-delay="800"
            >
              <div className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-2xl shadow-xl p-4 text-white">
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="text-xl" />
                  <div>
                    <p className="text-xs opacity-90">Productivity</p>
                    <p className="font-semibold">+25% This Month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          data-aos="fade-up"
          data-aos-delay="900"
        >
          {[
            { number: "50K+", label: "Active Users" },
            { number: "1M+", label: "Events Created" },
            { number: "99.9%", label: "Uptime" },
            { number: "24/7", label: "Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[#7C3AED] mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
