import React, { useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaCalendarAlt,
  FaHeart,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  useEffect(() => {
    // Simple AOS-like animation implementation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".fade-up");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }
        
        .fade-up.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>

      <footer className="relative bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#EC4899] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="fade-up col-span-1 md:col-span-2 lg:col-span-1 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <FaCalendarAlt className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    Event Flow
                  </h3>
                  <div className="h-1 w-16 bg-gradient-to-r from-[#F59E0B] to-[#EC4899] rounded-full mt-1"></div>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed">
                Transform your productivity with our intuitive event management
                platform. Seamlessly organize work and personal schedules.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { Icon: FaFacebookF, href: "#", color: "hover:bg-blue-600" },
                  { Icon: FaXTwitter, href: "#", color: "hover:bg-sky-500" },
                  { Icon: FaLinkedinIn, href: "#", color: "hover:bg-blue-700" },
                  { Icon: FaInstagram, href: "#", color: "hover:bg-pink-600" },
                ].map(({ Icon, href, color }, index) => (
                  <a
                    key={index}
                    href={href}
                    className={`bg-white/10 backdrop-blur-sm p-3 rounded-lg ${color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Navigation */}
            <div
              className="fade-up space-y-6"
              style={{ animationDelay: "0.1s" }}
            >
              <h4 className="text-lg font-semibold flex items-center">
                <span className="w-2 h-2 bg-[#F59E0B] rounded-full mr-3"></span>
                Quick Navigation
              </h4>
              <ul className="space-y-3">
                {[
                 
                
                  { to: "/", label: "Home" },
                  { to: "/create", label: "Create Event" },
                  { to: "/events", label: "Events" },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <a
                      href={to}
                      className="text-white/80 hover:text-[#F59E0B] transition-all duration-300 flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full mr-3 group-hover:bg-[#F59E0B] transition-colors"></span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div
              className="fade-up space-y-6"
              style={{ animationDelay: "0.2s" }}
            >
              <h4 className="text-lg font-semibold flex items-center">
                <span className="w-2 h-2 bg-[#EC4899] rounded-full mr-3"></span>
                Get in Touch
              </h4>
              <div className="space-y-4">
                {[
                  {
                    Icon: FaEnvelope,
                    text: "hello@eventflow.com",
                    type: "email",
                  },
                  { Icon: FaPhone, text: "+1 (555) 123-4567", type: "phone" },
                  {
                    Icon: FaMapMarkerAlt,
                    text: "San Francisco, CA",
                    type: "location",
                  },
                ].map(({ Icon, text, type  }, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="bg-white/10 backdrop-blur-sm p-2.5 rounded-lg mr-4 group-hover:bg-white/20 transition-colors">
                      <Icon className="w-4 h-4 text-[#F59E0B]" />
                    </div>
                    <span className="text-white/90 text-sm group-hover:text-white transition-colors">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div
              className="fade-up space-y-6"
              style={{ animationDelay: "0.3s" }}
            >
              <h4 className="text-lg font-semibold flex items-center">
                <span className="w-2 h-2 bg-[#F59E0B] rounded-full mr-3"></span>
                Stay Updated
              </h4>
              <p className="text-white/80 text-sm">
                Get the latest features and productivity tips delivered to your
                inbox.
              </p>
              <div className="space-y-3">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-l-lg border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-[#F59E0B] transition-colors text-sm"
                  />
                  <button className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] rounded-r-lg transition-colors font-medium">
                    Join
                  </button>
                </div>
                <p className="text-white/60 text-xs">
                  No spam, unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div
            className="fade-up border-t border-white/20 mt-12 pt-8"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="flex items-center text-white/80 text-sm">
                <span>
                  © {new Date().getFullYear()} Event Flow. Made with
                </span>
                <FaHeart className="w-4 h-4 text-[#EC4899] mx-1 animate-pulse" />
                <span>for productivity enthusiasts.</span>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-end gap-6 text-sm">
                {[
                  { to: "/privacy", label: "Privacy Policy" },
                  { to: "/terms", label: "Terms of Service" },
                  { to: "/support", label: "Support" },
                ].map(({ to, label }) => (
                  <a
                    key={to}
                    href={to}
                    className="text-white/70 hover:text-[#F59E0B] transition-colors relative group"
                  >
                    {label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F59E0B] group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-2xl"></div>
      </footer>
    </>
  );
};

export default Footer;
