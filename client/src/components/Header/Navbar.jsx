import React, { useState, useEffect } from "react";
import {
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineAdjustments,
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlinePlusCircle,
  HiOutlineSparkles,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <HiOutlineHome className="w-5 h-5" />,
      color: "text-[#7C3AED]",
    },
    {
      name: "Create Event",
      path: "/create",
      icon: <HiOutlinePlusCircle className="w-5 h-5" />,
      color: "text-[#F59E0B]",
    },
    {
      name: "Events",
      path: "/events",
      icon: <HiOutlineAdjustments className="w-5 h-5" />,
      color: "text-[#3B82F6]",
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
          : "bg-white shadow-sm border-b border-gray-200"
      }`}
      data-aos="fade-down"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo/Brand */}
          <NavLink
            to="/"
            className="flex items-center space-x-3 group"
            onClick={() => setIsMobileMenuOpen(false)}
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#EC4899] rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <HiOutlineSparkles className="w-6 h-6" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#F59E0B] rounded-full opacity-80 group-hover:scale-110 transition-transform duration-300"></div>
            </div>
            <div className=" sm:block">
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">
                EventFlow
              </span>
              <p className="text-xs text-gray-500 -mt-1">Smart Scheduler</p>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map(({ name, path, icon, color }, index) => (
              <NavLink
                key={name}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? `bg-gradient-to-r from-[#7C3AED]/10 to-[#EC4899]/10 ${color} shadow-sm`
                      : "text-gray-600 hover:text-[#7C3AED] hover:bg-gray-50/80"
                  }`
                }
                data-aos="fade-down"
                data-aos-delay={200 + index * 100}
              >
                <span className={`${color} transition-colors duration-300`}>
                  {icon}
                </span>
                {name}
              </NavLink>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <NavLink
              to="/login"
              className="px-6 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 hover:from-[#6D28D9] hover:to-[#DB2777]"
              onClick={() => setIsMobileMenuOpen(false)}
              data-aos="fade-left"
              data-aos-delay="300"
            >
              Get Started
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-gray-600 hover:text-[#7C3AED] hover:bg-[#7C3AED]/10 rounded-xl transition-all duration-300 hover:scale-105"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              {isMobileMenuOpen ? (
                <HiOutlineX className="w-6 h-6" />
              ) : (
                <HiOutlineMenuAlt3 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden border-t border-gray-200/50 py-4 bg-white/95 backdrop-blur-sm"
            data-aos="fade-down"
            data-aos-duration="300"
          >
            <div className="space-y-2">
              {navItems.map(({ name, path, icon, color }, index) => (
                <NavLink
                  key={name}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r from-[#7C3AED]/10 to-[#EC4899]/10 ${color} shadow-sm`
                        : "text-gray-600 hover:text-[#7C3AED] hover:bg-gray-50/80"
                    }`
                  }
                  data-aos="fade-right"
                  data-aos-delay={index * 100}
                >
                  <span className={`${color} transition-colors duration-300`}>
                    {icon}
                  </span>
                  {name}
                </NavLink>
              ))}
            </div>

            {/* Login button mobile */}
            <div className="mt-6 pt-4 border-t border-gray-200/50 px-4">
              <NavLink
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:from-[#6D28D9] hover:to-[#DB2777]"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                Get Started
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
