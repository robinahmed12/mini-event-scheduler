import React, { useEffect } from "react";
import AOS from "aos";
import {
  Calendar,
  Brain,
  Cloud,
  Zap,
  Clock,
  Bell,
  BarChart3,
  Smartphone,
  Shield,
  FolderSync,
} from "lucide-react";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const KeyFeatures = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
    });
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Smart Categorization",
      description:
        "Advanced keyword-based intelligence automatically categorizes your events into Work, Personal, or Other categories, saving you time and keeping everything organized.",
      gradient: "from-[#7C3AED] to-[#EC4899]",
      delay: 100,
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Intuitive Event Management",
      description:
        "Create, view, update, and delete events with a clean, modern interface. Set titles, dates, times, and detailed notes with seamless user experience.",
      gradient: "from-[#EC4899] to-[#F59E0B]",
      delay: 200,
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Real-time Cloud Sync",
      description:
        "Your events are automatically saved and synchronized across all devices. Never lose your important schedules with robust cloud-based storage.",
      gradient: "from-[#F59E0B] to-[#7C3AED]",
      delay: 300,
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning-Fast Performance",
      description:
        "Built with modern React architecture and optimized APIs for instant loading and seamless interactions. Experience speed that matches your pace.",
      gradient: "from-[#7C3AED] to-[#3B82F6]",
      delay: 400,
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Smart Time Management",
      description:
        "Intelligent scheduling with conflict detection, time zone support, and duration tracking to help you make the most of every minute.",
      gradient: "from-[#3B82F6] to-[#EC4899]",
      delay: 500,
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Proactive Notifications",
      description:
        "Stay ahead with customizable reminders and smart notifications that ensure you never miss important events or deadlines.",
      gradient: "from-[#EC4899] to-[#F59E0B]",
      delay: 600,
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Insightful Analytics",
      description:
        "Gain valuable insights into your scheduling patterns with beautiful charts and reports that help optimize your productivity.",
      gradient: "from-[#F59E0B] to-[#7C3AED]",
      delay: 700,
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Cross-Platform Compatibility",
      description:
        "Fully responsive design that works flawlessly on desktop, tablet, and mobile devices with native-like performance.",
      gradient: "from-[#7C3AED] to-[#3B82F6]",
      delay: 800,
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise-Grade Security",
      description:
        "Your data is protected with industry-standard encryption and secure authentication, ensuring privacy and peace of mind.",
      gradient: "from-[#3B82F6] to-[#EC4899]",
      delay: 900,
    },
    {
      icon: <FolderSync className="w-8 h-8" />,
      title: "Seamless Integration",
      description:
        "Connect with your favorite calendar apps and productivity tools through our robust RESTful API architecture.",
      gradient: "from-[#EC4899] to-[#F59E0B]",
      delay: 1000,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 py-20 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-20">
        <div data-aos="fade-up">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F59E0B] bg-clip-text text-transparent mb-6">
            Powerful Features
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Experience the future of event scheduling with our cutting-edge
            features designed to transform how you manage your time and stay
            organized.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} data-aos="fade-up" data-aos-delay={feature.delay}>
              <div className="group relative h-full">
                <div className="relative h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                  ></div>

                  <div className="relative z-10 mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{feature.icon}</div>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#7C3AED] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#7C3AED]/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#EC4899]/10 to-transparent rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="max-w-4xl mx-auto text-center mt-20">
        <div data-aos="fade-up" data-aos-delay="1200">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/5 via-[#EC4899]/5 to-[#F59E0B]/5"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent mb-6">
                Ready to Transform Your Scheduling?
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of users who have already revolutionized their
                time management with our intelligent event scheduler.
              </p>
              <Link to={"/events"} className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group">
                <span>Get Started Today</span>
                <Zap className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;
