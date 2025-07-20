import React, { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

const Events = () => {
  const axiosInstance = useAxios();

  // Filter and Sort States
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showArchived, setShowArchived] = useState(false);

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

  // Filter and Sort Logic
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events.filter((event) => {
      // Category filter
      const matchesCategory =
        categoryFilter === "all" ||
        event.category?.toLowerCase() === categoryFilter.toLowerCase();

      // Archived filter
      const matchesArchived = showArchived ? true : !event.archived;

      return matchesCategory && matchesArchived;
    });

    // Sorting logic
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "date":
          aValue = new Date(`${a.date} ${a.time}`);
          bValue = new Date(`${b.date} ${b.time}`);
          break;
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "category":
          aValue = a.category?.toLowerCase() || "";
          bValue = b.category?.toLowerCase() || "";
          break;
        default:
          return 0;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [events, categoryFilter, sortBy, sortOrder, showArchived]);

  // Statistics
  const stats = useMemo(() => {
    const activeEvents = events.filter((e) => !e.archived);
    const archivedEvents = events.filter((e) => e.archived);

    return {
      total: events.length,
      active: activeEvents.length,
      archived: archivedEvents.length,
      work: events.filter((e) => e.category?.toLowerCase() === "work").length,
      personal: events.filter((e) => e.category?.toLowerCase() === "personal")
        .length,
      other: events.filter((e) => e.category?.toLowerCase() === "other").length,
    };
  }, [events]);

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
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.delete(`/events/${id}`);
      await refetch();

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

  const FilterButton = ({ active, onClick, children, count }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 transform hover:-translate-y-0.5 ${
        active
          ? "bg-[#7C3AED] text-white shadow-lg shadow-purple-500/25"
          : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
      }`}
    >
      {children}
      {count !== undefined && (
        <span
          className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
            active ? "bg-white/20" : "bg-gray-100"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );

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
              Upcoming Event 
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay organized and never miss an important moment. Manage your
              schedule with elegance and efficiency.
            </p>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div
              className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg text-center"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="text-2xl lg:text-3xl font-bold text-[#7C3AED] mb-1">
                {stats.total}
              </div>
              <div className="text-xs lg:text-sm text-gray-600 font-medium">
                Total Events
              </div>
            </div>
            <div
              className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg text-center"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="text-2xl lg:text-3xl font-bold text-[#EC4899] mb-1">
                {stats.active}
              </div>
              <div className="text-xs lg:text-sm text-gray-600 font-medium">
                Active
              </div>
            </div>
            <div
              className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg text-center"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="text-2xl lg:text-3xl font-bold text-[#F59E0B] mb-1">
                {stats.archived}
              </div>
              <div className="text-xs lg:text-sm text-gray-600 font-medium">
                Archived
              </div>
            </div>
            <div
              className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg text-center"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <div className="text-2xl lg:text-3xl font-bold text-[#3B82F6] mb-1">
                {stats.work}
              </div>
              <div className="text-xs lg:text-sm text-gray-600 font-medium">
                💼 Work
              </div>
            </div>
            <div
              className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg text-center"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <div className="text-2xl lg:text-3xl font-bold text-[#EC4899] mb-1">
                {stats.personal}
              </div>
              <div className="text-xs lg:text-sm text-gray-600 font-medium">
                👤 Personal
              </div>
            </div>
            <div
              className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg text-center"
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              <div className="text-2xl lg:text-3xl font-bold text-[#F59E0B] mb-1">
                {stats.other}
              </div>
              <div className="text-xs lg:text-sm text-gray-600 font-medium">
                📝 Other
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="mb-8" data-aos="fade-up">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Category Filters */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Filter by Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    active={categoryFilter === "all"}
                    onClick={() => setCategoryFilter("all")}
                    count={stats.total}
                  >
                    All Events
                  </FilterButton>
                  <FilterButton
                    active={categoryFilter === "work"}
                    onClick={() => setCategoryFilter("work")}
                    count={stats.work}
                  >
                    💼 Work
                  </FilterButton>
                  <FilterButton
                    active={categoryFilter === "personal"}
                    onClick={() => setCategoryFilter("personal")}
                    count={stats.personal}
                  >
                    👤 Personal
                  </FilterButton>
                  <FilterButton
                    active={categoryFilter === "other"}
                    onClick={() => setCategoryFilter("other")}
                    count={stats.other}
                  >
                    📝 Other
                  </FilterButton>
                </div>
              </div>

              {/* Sort Controls */}
              <div className="lg:w-80">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Sort Events
                </h3>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent text-sm"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="title">Sort by Title</option>
                    <option value="category">Sort by Category</option>
                  </select>
                  <button
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm font-medium"
                  >
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </button>
                </div>
              </div>

              {/* Archive Toggle */}
              <div className="lg:w-40">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Show
                </h3>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showArchived}
                    onChange={(e) => setShowArchived(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      showArchived ? "bg-[#7C3AED]" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        showArchived ? "transform translate-x-6" : ""
                      }`}
                    ></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">Archived</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6" data-aos="fade-up">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold text-[#7C3AED]">
                {filteredAndSortedEvents.length}
              </span>{" "}
              of {events.length} events
            </p>
            {(categoryFilter !== "all" || showArchived) && (
              <button
                onClick={() => {
                  setCategoryFilter("all");
                  setShowArchived(false);
                }}
                className="text-sm text-[#7C3AED] hover:text-[#6D28D9] font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Events Grid */}
        {filteredAndSortedEvents.length === 0 ? (
          <div className="text-center py-20" data-aos="fade-up">
            <div className="w-32 h-32 bg-gradient-to-br from-[#7C3AED]/10 to-[#EC4899]/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-6xl">
                {events.length === 0 ? "📅" : "🔍"}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              {events.length === 0
                ? "No Events Yet"
                : "No Events Match Your Filters"}
            </h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
              {events.length === 0
                ? "Your schedule is clear! Start by creating your first event to get organized."
                : "Try adjusting your filters to see more events."}
            </p>
            {events.length === 0 && (
              <button className="px-8 py-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Create First Event
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredAndSortedEvents.map((event, index) => (
              <div
                key={event.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 ${
                  event.archived ? "opacity-70" : ""
                }`}
                data-aos="fade-up"
                data-aos-delay={index * 50}
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
                          <p className="text-gray-700 leading-relaxed text-sm">
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
                        className={`flex-1 px-4 py-2 rounded-xl font-semibold border text-sm ${
                          event.archived
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                            : "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200 transition"
                        }`}
                      >
                        📦 {event.archived ? "Archived" : "Archive"}
                      </button>

                      <button
                        onClick={() => handleDelete(event.id)}
                        className="flex-1 px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition text-sm"
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
