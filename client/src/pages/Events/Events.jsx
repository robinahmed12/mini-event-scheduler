import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

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

  const {
    data: events = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosInstance.get("/events");
      return res.data;
    },
  });
  console.log(events);

  const handleArchive = async (id) => {
    try {
      await axiosInstance.put(`/events/${id}`);
      await refetch();
    } catch (error) {
      console.error("Failed to archive event:", error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48", // red-600
      cancelButtonColor: "#6b7280", // gray-500
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.delete(`/events/${id}`);
      await refetch();

      // Show success alert
      Swal.fire({
        title: "Deleted!",
        text: "The event has been deleted.",
        icon: "success",
        confirmButtonColor: "#7C3AED",
      });
    } catch (error) {
      console.error("Failed to delete event:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the event.",
        icon: "error",
      });
    }
  };

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="flex items-center justify-center py-24">
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
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div
          className="flex flex-col items-center justify-center py-24"
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
            className="mt-6 px-6 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12" data-aos="fade-down">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F59E0B] bg-clip-text text-transparent mb-4">
              Upcoming Events
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay organized and never miss an important moment. Manage your
              schedule with elegance and efficiency.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="text-3xl font-bold text-[#7C3AED] mb-2">
                {events.length}
              </div>
              <div className="text-gray-600 font-medium">Total Events</div>
            </div>
            <div
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="text-3xl font-bold text-[#EC4899] mb-2">
                {events.filter((e) => !e.archived).length}
              </div>
              <div className="text-gray-600 font-medium">Active Events</div>
            </div>
            <div
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
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

        {/* Events Grid */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5">
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
                  <div className="flex flex-col gap-4">
                    {/* Title */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">
                        {getCategoryIcon(event.category)}
                      </span>
                      <h3
                        className={`text-xl font-bold text-gray-800 ${
                          event.archived ? "line-through" : ""
                        }`}
                      >
                        {event.title}
                      </h3>
                    </div>

                    {/* Date & Time */}
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
                      <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>⏰</span>
                        <span>{event.time}</span>
                      </div>
                    </div>

                    {/* Notes */}
                    {event.notes && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-start gap-2">
                          <span className="text-lg mt-0.5">📝</span>
                          <p className="text-gray-700 leading-relaxed">
                            {event.notes}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${getCategoryStyles(
                          event.category
                        )}`}
                      >
                        {getCategoryIcon(event.category)} {event.category}
                      </span>
                      {event.archived && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          📦 Archived
                        </span>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleArchive(event.id)}
                        disabled={event.archived}
                        className={`flex-1 px-4 py-2 rounded-xl font-semibold border ${
                          event.archived
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                            : "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200 transition"
                        }`}
                      >
                        📦 {event.archived ? "Archived" : "Archive"}
                      </button>

                      <button
                        onClick={() => handleDelete(event.id)}
                        className="flex-1 px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className={`h-1 ${
                    event.category?.toLowerCase() === "work"
                      ? "bg-blue-500"
                      : event.category?.toLowerCase() === "personal"
                      ? "bg-pink-500"
                      : event.category?.toLowerCase() === "other"
                      ? "bg-amber-500"
                      : "bg-gray-300"
                  }`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
