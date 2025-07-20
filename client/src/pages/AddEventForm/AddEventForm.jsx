import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Calendar,
  Clock,
  FileText,
  AlertCircle,
  Plus,
  CheckCircle2,
} from "lucide-react";
import useAxios from "../../hooks/useAxios.jsx";
import Swal from "sweetalert2";

const AddEventForm = ({ onSubmit }) => {
  const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [newCategory, setNewCategory] = useState("");

  const onSubmitForm = async (data) => {
    try {
      const response = await axiosInstance.post("/events", data);

      const createdEvent = response.data;
      console.log(createdEvent);
      
      setNewCategory(createdEvent.category);

      if (onSubmit) {
        onSubmit(createdEvent);
      }

      // ✅ SweetAlert on success
      Swal.fire({
        icon: "success",
        title: "Event Created!",
        text: "Your event has been successfully added.",
        confirmButtonColor: "#2563eb", // Tailwind blue-600
      });

      reset();
      setNewCategory("");
    } catch (error) {
      console.error(
        "Error creating event:",
        error.response?.data || error.message
      );

      // show error alert
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to create event. Please try again.",
        confirmButtonColor: "#ef4444", // Tailwind red-500
      });
    }
  };

  return (
    <div className="event-form-container max-w-2xl mx-auto p-4 sm:p-6">
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="card rounded-xl p-6 sm:p-8 space-y-6"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create New Event
          </h2>
          <p className="text-gray-600">Fill in the details below</p>
        </div>

        {/* Title */}
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1">
            Title *
          </label>
          <div className="relative">
            <input
              {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
              className={`w-full px-4 py-3 pl-11 border rounded-lg ${
                errors.title
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white"
              }`}
              placeholder="Event title"
            />
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          {errors.title && (
            <p className="flex items-center text-sm text-red-600 mt-1">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Date & Time */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Date *
            </label>
            <div className="relative">
              <input
                type="date"
                {...register("date", { required: "Date is required" })}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full px-4 py-3 pl-11 border rounded-lg ${
                  errors.date
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {errors.date && (
              <p className="flex items-center text-sm text-red-600 mt-1">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.date.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Time *
            </label>
            <div className="relative">
              <input
                type="time"
                {...register("time", {
                  required: "Time is required",
                  pattern: {
                    value: /^\d{1,2}:\d{2}$/,
                    message: "Invalid time format",
                  },
                })}
                className={`w-full px-4 py-3 pl-11 border rounded-lg ${
                  errors.time
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
              />
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {errors.time && (
              <p className="flex items-center text-sm text-red-600 mt-1">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.time.message}
              </p>
            )}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1">
            Notes (optional)
          </label>
          <textarea
            {...register("notes")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
            placeholder="Add notes..."
            rows={4}
          ></textarea>
        </div>

        {/* Category Preview (from backend) */}
        {newCategory && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-sm text-gray-600">
              Category auto-assigned by AI:{" "}
              <span className="font-semibold capitalize">{newCategory}</span>
            </span>
          </div>
        )}

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full sm:w-auto px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Create Event
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          * Required fields. Category is determined by backend AI keyword
          analysis.
        </p>
      </form>
    </div>
  );
};

export default AddEventForm;
