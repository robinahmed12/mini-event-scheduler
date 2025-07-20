import React, { useState } from "react";
import {
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineAdjustments,
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: <HiOutlineHome /> },
    { name: "Events", path: "/events", icon: <HiOutlineAdjustments /> },
    { name: "Calendar", path: "/calendar", icon: <HiOutlineCalendar /> },
    { name: "Create Event", path: "/create", icon: <HiOutlinePlusCircle /> },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <NavLink
            to="/"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <HiOutlineHome className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">EventScheduler</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map(({ name, path, icon }) => (
              <NavLink
                key={name}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                  }`
                }
              >
                {icon}
                {name}
              </NavLink>
            ))}

            {/* Login Button */}
            <NavLink
              to="/login"
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
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
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-1">
              {navItems.map(({ name, path, icon }) => (
                <NavLink
                  key={name}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 w-full px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {icon}
                  {name}
                </NavLink>
              ))}
            </div>

            {/* Login button mobile */}
            <div className="mt-4 pt-4 border-t border-gray-200 px-4">
              <NavLink
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
