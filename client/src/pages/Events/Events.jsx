import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

const Events = () => {
  const axiosInstance = useAxios();

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  // Fetch events
  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosInstance.get("/events");
      return res.data;
    },
  });

  const getCategoryStyles = (category) => {
    switch (category?.toLowerCase()) {
      case "work":
        return "bg-[#3B82F6] text-white shadow-lg shadow-blue-500/25";
      case "personal":
        return "bg-[#EC4899] text-white shadow-lg shadow-pink-500/25";
      case "other":
        return "bg-[#F59E0B] text-white shadow-lg shadow-amber-500/25";
      default:
        return "bg-gray-100 text-gray-700 shadow-lg shadow-gray-500/10";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "work":
        return "💼";
      case "personal":
        return "👤";
      case "other":
        return "📝";
      default:
        return "📅";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen  bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin"></div>
              <div
                className="absolute inset-0 w-16 h-16 border-4 border-[#EC4899] border-t-transparent rounded-full animate-spin animate-reverse"
                style={{ animationDelay: "-0.5s" }}
              ></div>
            </div>
            <p className="ml-4 text-lg font-medium text-gray-600">
              Loading your events...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen  bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div
            className="flex flex-col items-center justify-center py-20"
            data-aos="fade-up"
          >
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Failed to load events
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              We encountered an issue while fetching your events. Please try
              refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Retry Loading
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-12" data-aos="fade-down">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F59E0B] bg-clip-text text-transparent mb-4">
              Upcoming Events
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Stay organized and never miss an important moment. Manage your
              schedule with elegance and efficiency.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="text-3xl font-bold text-[#7C3AED] mb-2">
                {events.length}
              </div>
              <div className="text-gray-600 font-medium">Total Events</div>
            </div>
            <div
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="text-3xl font-bold text-[#EC4899] mb-2">
                {events.filter((e) => !e.archived).length}
              </div>
              <div className="text-gray-600 font-medium">Active Events</div>
            </div>
            <div
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="text-3xl font-bold text-[#F59E0B] mb-2">
                {events.filter((e) => e.archived).length}
              </div>
              <div className="text-gray-600 font-medium">Archived</div>
            </div>
          </div>
        </div>

        {/* Events List */}
        {events.length === 0 ? (
          <div className="text-center py-20" data-aos="fade-up">
            <div className="w-32 h-32 bg-gradient-to-br from-[#7C3AED]/10 to-[#EC4899]/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-6xl">📅</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              No Events Yet
            </h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
              Your schedule is clear! Start by creating your first event to get
              organized.
            </p>
            <button className="px-8 py-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Create First Event
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 ${
                  event.archived ? "opacity-60 grayscale" : ""
                }`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="p-6 lg:p-8">
                  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                    {/* Event Content */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">
                              {getCategoryIcon(event.category)}
                            </span>
                            <h3
                              className={`text-xl lg:text-2xl font-bold text-gray-800 ${
                                event.archived ? "line-through" : ""
                              }`}
                            >
                              {event.title}
                            </h3>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">📅</span>
                              <span className="font-medium">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">⏰</span>
                              <span className="font-medium">{event.time}</span>
                            </div>
                          </div>

                          {event.notes && (
                            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                              <div className="flex items-start gap-2">
                                <span className="text-lg mt-0.5">📝</span>
                                <p className="text-gray-700 leading-relaxed">
                                  {event.notes}
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-3">
                            <span
                              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold tracking-wide ${getCategoryStyles(
                                event.category
                              )}`}
                            >
                              <span className="mr-2">
                                {getCategoryIcon(event.category)}
                              </span>
                              {event.category}
                            </span>

                            {event.archived && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                📦 Archived
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row xl:flex-col gap-3 xl:w-48">
                      <button
                        disabled
                        className="flex-1 xl:flex-none px-6 py-3 rounded-xl font-semibold bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 transition-all duration-200"
                        title="Archive functionality coming soon"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span className="text-lg">📦</span>
                          {event.archived ? "Unarchive" : "Archive"}
                        </span>
                      </button>

                      <button
                        className="flex-1 xl:flex-none px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete Event"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span className="text-lg">🗑️</span>
                          Delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Event Status Bar */}
                <div
                  className={`h-1 bg-gradient-to-r ${
                    event.category?.toLowerCase() === "work"
                      ? "from-[#3B82F6] to-blue-600"
                      : event.category?.toLowerCase() === "personal"
                      ? "from-[#EC4899] to-pink-600"
                      : event.category?.toLowerCase() === "other"
                      ? "from-[#F59E0B] to-amber-600"
                      : "from-gray-300 to-gray-400"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
