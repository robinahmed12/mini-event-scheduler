import React, { useState } from "react";
import {
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineCog,
  HiOutlineAdjustments,
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import { FiSettings, FiTarget } from "react-icons/fi";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const navItems = [
    { name: "Dashboard", path: "/", icon: <HiOutlineHome /> },
    { name: "Events", path: "/events", icon: <HiOutlineAdjustments /> },
    { name: "Calendar", path: "/calendar", icon: <HiOutlineCalendar /> },
    { name: "Create Event", path: "/create", icon: <HiOutlinePlusCircle /> },
  ];

  const handleNavClick = (itemName) => {
    setActiveItem(itemName);
    setIsMobileMenuOpen(false);
  };

  const isActive = (itemName) => activeItem === itemName;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick("Dashboard")}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <HiOutlineHome className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-700">
                EventScheduler
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.name)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.name)
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </div>

          {/* Right side - User actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200">
              <FiTarget className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200">
              <FiSettings className="w-5 h-5" />
            </button>
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
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.name)}
                  className={`flex items-center gap-2 w-full px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.name)
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-4 px-4">
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200">
                <FiTarget className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200">
                <FiSettings className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
