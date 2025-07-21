import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaQuoteLeft,
  FaUserCircle,
  FaBriefcase,
  FaHeart,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
} from "react-icons/fa";

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Project Manager",
      company: "TechFlow Inc.",
      avatar: null,
      rating: 5,
      text: "This Event Scheduler has completely transformed how I manage my team meetings and project deadlines. The intuitive interface and seamless navigation make scheduling effortless.",
      category: "work",
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Freelance Designer",
      company: "Creative Studio",
      avatar: null,
      rating: 5,
      text: "As someone juggling multiple client projects and personal commitments, this scheduler is a game-changer. The categorization feature helps me maintain perfect work-life balance.",
      category: "personal",
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Digital Dynamics",
      avatar: null,
      rating: 5,
      text: "The responsive design works flawlessly across all my devices. Whether I'm on my phone during commute or desktop at office, scheduling remains consistent and reliable.",
      category: "other",
      date: "3 weeks ago",
    },
    {
      id: 4,
      name: "David Park",
      role: "Startup Founder",
      company: "InnovateLab",
      avatar: null,
      rating: 5,
      text: "Clean, professional interface with powerful functionality. This scheduler has helped me organize investor meetings, team sprints, and personal events with remarkable efficiency.",
      category: "work",
      date: "1 week ago",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Event Coordinator",
      company: "Premier Events",
      avatar: null,
      rating: 5,
      text: "The color-coded categories and smooth animations make managing complex event schedules feel effortless. It's become an essential tool for my professional workflow.",
      category: "personal",
      date: "2 months ago",
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Software Engineer",
      company: "CodeCraft Solutions",
      avatar: null,
      rating: 5,
      text: "Impressive attention to detail in both design and functionality. The router navigation is seamless, and the mobile experience is outstanding. Highly recommend!",
      category: "other",
      date: "5 days ago",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % getMaxSlides());
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, currentSlide]);

  const getMaxSlides = () => {
    if (window.innerWidth >= 1024) return Math.ceil(testimonials.length / 3);
    if (window.innerWidth >= 768) return Math.ceil(testimonials.length / 2);
    return testimonials.length;
  };

  const getVisibleTestimonials = () => {
    if (window.innerWidth >= 1024) {
      const startIndex = currentSlide * 3;
      return testimonials.slice(startIndex, startIndex + 3);
    }
    if (window.innerWidth >= 768) {
      const startIndex = currentSlide * 2;
      return testimonials.slice(startIndex, startIndex + 2);
    }
    return [testimonials[currentSlide]];
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "work":
        return <FaBriefcase className="text-[#3B82F6] text-sm" />;
      case "personal":
        return <FaHeart className="text-[#EC4899] text-sm" />;
      default:
        return <FaClock className="text-[#F59E0B] text-sm" />;
    }
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case "work":
        return "bg-blue-50 text-[#3B82F6] border-[#3B82F6]";
      case "personal":
        return "bg-pink-50 text-[#EC4899] border-[#EC4899]";
      default:
        return "bg-amber-50 text-[#F59E0B] border-[#F59E0B]";
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % getMaxSlides());
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + getMaxSlides()) % getMaxSlides());
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const TestimonialCard = ({ testimonial, delay = 0 }) => (
    <div
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 border border-gray-100 transform hover:-translate-y-2 hover:scale-[1.02] h-full flex flex-col overflow-hidden`}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#7C3AED]/5 to-[#EC4899]/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>

      {/* Header with quote and category */}
      <div className="relative flex justify-between items-start mb-4">
        <div className="bg-gradient-to-br from-[#7C3AED]/10 to-[#EC4899]/10 rounded-full p-3">
          <FaQuoteLeft className="text-[#7C3AED] text-lg" />
        </div>
        <div
          className={`flex items-center space-x-1 px-3 py-1 rounded-full border text-xs font-medium ${getCategoryBadge(
            testimonial.category
          )}`}
        >
          {getCategoryIcon(testimonial.category)}
          <span className="capitalize ml-1">{testimonial.category}</span>
        </div>
      </div>

      {/* Testimonial text */}
      <div className="relative flex-grow">
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 font-normal relative z-10">
          "{testimonial.text}"
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <FaStar
              key={i}
              className="text-[#F59E0B] text-sm animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
          {testimonial.date}
        </span>
      </div>

      {/* User info */}
      <div className="flex items-center relative z-10">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-[#7C3AED] to-[#EC4899] rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <FaUserCircle className="text-white text-xl" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate group-hover:text-[#7C3AED] transition-colors duration-300">
            {testimonial.name}
          </h4>
          <p className="text-[#7C3AED] font-medium text-xs sm:text-sm truncate">
            {testimonial.role}
          </p>
          <p className="text-gray-500 text-xs truncate">
            {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#7C3AED]/5 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#EC4899]/5 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-gray-200">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-[#F59E0B] text-sm" />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              4.9/5 from 2,000+ users
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            What Our{" "}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">
              Users
            </span>{" "}
            Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how professionals across industries are transforming their
            productivity with our intuitive Event Scheduler application.
          </p>
        </div>

        {/* Testimonials with custom carousel */}
        <div
          className="relative mb-12 sm:mb-16"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* Navigation controls */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <button
              onClick={prevSlide}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl border border-gray-100 hover:border-[#7C3AED]/20 transition-all duration-300 hover:scale-110 group"
            >
              <FaChevronLeft className="text-[#7C3AED] text-sm group-hover:text-[#6D28D9]" />
            </button>

            <button
              onClick={togglePlayPause}
              className="p-3 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              {isPlaying ? (
                <FaPause className="text-white text-sm" />
              ) : (
                <FaPlay className="text-white text-sm ml-0.5" />
              )}
            </button>

            <button
              onClick={nextSlide}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl border border-gray-100 hover:border-[#7C3AED]/20 transition-all duration-300 hover:scale-110 group"
            >
              <FaChevronRight className="text-[#7C3AED] text-sm group-hover:text-[#6D28D9]" />
            </button>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 min-h-[420px]">
            {getVisibleTestimonials().map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: getMaxSlides() }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-[#7C3AED] scale-125"
                    : "bg-gray-300 hover:bg-[#EC4899]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-12 sm:mb-16"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {[
            {
              number: "2K+",
              label: "Happy Users",
              color: "#7C3AED",
              bg: "from-purple-500/10 to-purple-600/10",
            },
            {
              number: "50K+",
              label: "Events Scheduled",
              color: "#EC4899",
              bg: "from-pink-500/10 to-pink-600/10",
            },
            {
              number: "99.9%",
              label: "Uptime",
              color: "#F59E0B",
              bg: "from-amber-500/10 to-amber-600/10",
            },
            {
              number: "24/7",
              label: "Support",
              color: "#3B82F6",
              bg: "from-blue-500/10 to-blue-600/10",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center p-4 sm:p-6 bg-gradient-to-br ${stat.bg} backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 group`}
            >
              <div
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                style={{ color: stat.color }}
              >
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium text-sm sm:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="300">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 to-[#EC4899]/5"></div>
            <div className="relative">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Ready to Transform Your Scheduling?
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
                Join thousands of professionals who have revolutionized their
                productivity with our powerful Event Scheduler.
              </p>
              <button className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:from-[#6D28D9] hover:to-[#DB2777] text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl relative overflow-hidden group">
                <span className="relative z-10">Start Scheduling Today</span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
