import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Calendar,
  Clock,
  FileText,
  AlertCircle,
  Plus,
  CheckCircle2,
  Sparkles,
  User,
  Briefcase,
  Hash,
} from "lucide-react";
import useAxios from "../../hooks/useAxios.jsx";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const AddEventForm = ({ onSubmit }) => {
  const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [newCategory, setNewCategory] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Watch form values for real-time updates
  const watchedTitle = watch("title", "");
  const watchedNotes = watch("notes", "");

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }, []);

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "work":
        return <Briefcase className="w-4 h-4" />;
      case "personal":
        return <User className="w-4 h-4" />;
      default:
        return <Hash className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "work":
        return "bg-[#3B82F6] text-white";
      case "personal":
        return "bg-[#EC4899] text-white";
      default:
        return "bg-[#F59E0B] text-white";
    }
  };

  const onSubmitForm = async (data) => {
    try {
      setIsSuccess(false);
      const response = await axiosInstance.post("/events", data);
      const createdEvent = response.data;

      setNewCategory(createdEvent.category);
      setIsSuccess(true);

      if (onSubmit) {
        onSubmit(createdEvent);
      }

      // Enhanced SweetAlert with your color scheme
      Swal.fire({
        icon: "success",
        title: "🎉 Event Created Successfully!",
        text: `Your ${
          createdEvent.category?.toLowerCase() || "new"
        } event has been added to your schedule.`,
        confirmButtonColor: "#7C3AED",
        background: "#ffffff",
        color: "#374151",
        customClass: {
          popup: "rounded-xl shadow-2xl",
          title: "text-xl font-bold",
          confirmButton: "rounded-lg px-6 py-2 font-semibold",
        },
      });

      // Reset form after short delay to show success state
      setTimeout(() => {
        reset();
        setNewCategory("");
        setIsSuccess(false);
      }, 1000);
    } catch (error) {
      console.error(
        "Error creating event:",
        error.response?.data || error.message
      );

      Swal.fire({
        icon: "error",
        title: "❌ Creation Failed",
        text: "Unable to create event. Please check your connection and try again.",
        confirmButtonColor: "#EF4444",
        background: "#ffffff",
        color: "#374151",
        customClass: {
          popup: "rounded-xl shadow-2xl",
          title: "text-xl font-bold",
          confirmButton: "rounded-lg px-6 py-2 font-semibold",
        },
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div
          className="text-center mb-8"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-2xl mb-4 shadow-lg">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent mb-2">
            Create New Event
          </h1>
          <p className="text-gray-600 text-lg">
            Schedule your next important moment
          </p>
        </div>

        {/* Main Form Card */}
        <div
          className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-6 md:p-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            {/* Event Title */}
            <div data-aos="fade-up" data-aos-delay="300">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <FileText className="w-4 h-4 mr-2 text-[#7C3AED]" />
                Event Title
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative group">
                <input
                  {...register("title", {
                    required: "Event title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters",
                    },
                    maxLength: {
                      value: 100,
                      message: "Title cannot exceed 100 characters",
                    },
                  })}
                  className={`w-full px-4 py-4 bg-white border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 ${
                    errors.title
                      ? "border-red-300 focus:border-red-400 bg-red-50/50"
                      : "border-gray-200 focus:border-[#7C3AED] group-hover:border-gray-300"
                  } text-gray-800 placeholder-gray-400`}
                  placeholder="Enter your event title..."
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  {watchedTitle.length}/100
                </div>
              </div>
              {errors.title && (
                <div className="flex items-center mt-2 text-sm text-red-600 animate-pulse">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.title.message}
                </div>
              )}
            </div>

            {/* Date and Time Row */}
            <div
              className="grid md:grid-cols-2 gap-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {/* Date */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Calendar className="w-4 h-4 mr-2 text-[#EC4899]" />
                  Event Date
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative group">
                  <input
                    type="date"
                    {...register("date", {
                      required: "Date is required",
                      validate: (value) => {
                        const selectedDate = new Date(value);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return (
                          selectedDate >= today || "Date cannot be in the past"
                        );
                      },
                    })}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full px-4 py-4 bg-white border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 ${
                      errors.date
                        ? "border-red-300 focus:border-red-400 bg-red-50/50"
                        : "border-gray-200 focus:border-[#EC4899] group-hover:border-gray-300"
                    } text-gray-800`}
                  />
                </div>
                {errors.date && (
                  <div className="flex items-center mt-2 text-sm text-red-600 animate-pulse">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.date.message}
                  </div>
                )}
              </div>

              {/* Time */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Clock className="w-4 h-4 mr-2 text-[#F59E0B]" />
                  Event Time
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative group">
                  <input
                    type="time"
                    {...register("time", {
                      required: "Time is required",
                    })}
                    className={`w-full px-4 py-4 bg-white border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 ${
                      errors.time
                        ? "border-red-300 focus:border-red-400 bg-red-50/50"
                        : "border-gray-200 focus:border-[#F59E0B] group-hover:border-gray-300"
                    } text-gray-800`}
                  />
                </div>
                {errors.time && (
                  <div className="flex items-center mt-2 text-sm text-red-600 animate-pulse">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.time.message}
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            <div data-aos="fade-up" data-aos-delay="500">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <FileText className="w-4 h-4 mr-2 text-gray-500" />
                Additional Notes
                <span className="text-gray-400 ml-2 text-xs">(Optional)</span>
              </label>
              <div className="relative group">
                <textarea
                  {...register("notes", {
                    maxLength: {
                      value: 500,
                      message: "Notes cannot exceed 500 characters",
                    },
                  })}
                  className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 focus:border-[#7C3AED] group-hover:border-gray-300 text-gray-800 placeholder-gray-400 resize-none"
                  placeholder="Add any additional details or reminders..."
                  rows={4}
                />
                <div className="absolute right-4 bottom-4 text-xs text-gray-400">
                  {watchedNotes.length}/500
                </div>
              </div>
              {errors.notes && (
                <div className="flex items-center mt-2 text-sm text-red-600 animate-pulse">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.notes.message}
                </div>
              )}
            </div>

            {/* AI Category Prediction */}
            {newCategory && (
              <div
                className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                data-aos="zoom-in"
                data-aos-delay="600"
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-lg flex items-center justify-center mr-3">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700">
                    AI Category Detection
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    Automatically categorized as:
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                      newCategory
                    )}`}
                  >
                    {getCategoryIcon(newCategory)}
                    <span className="ml-2 capitalize">{newCategory}</span>
                  </span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div data-aos="fade-up" data-aos-delay="700">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-purple-200 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : isSuccess
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:from-[#6D28D9] hover:to-[#DB2777] shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Creating Event...
                  </div>
                ) : isSuccess ? (
                  <div className="flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 mr-3" />
                    Event Created Successfully!
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Plus className="w-5 h-5 mr-3" />
                    Create Event
                  </div>
                )}
              </button>
            </div>

            {/* Footer Info */}
            <div
              className="text-center pt-4 border-t border-gray-100"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <p className="text-xs text-gray-500 flex items-center justify-center">
                <Sparkles className="w-3 h-3 mr-1" />
                Event categories are automatically determined using AI-powered
                keyword analysis
              </p>
            </div>
          </form>
        </div>

        {/* Additional Info Card */}
        <div
          className="mt-6 bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center"
          data-aos="fade-up"
          data-aos-delay="900"
        >
          <p className="text-sm text-gray-600">
            Your events will be automatically organized and easily accessible in
            your dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddEventForm;
