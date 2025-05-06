import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./api/tokenizedaxios";

const Schedules = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("table");
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  // Fetch schedules data
  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/client/schedules");

        if (response.data.status === "success") {
          setSchedules(response.data.data || []);
        } else {
          console.error("Failed to fetch schedules:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();
  }, [navigate]);

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });

    // Automatically hide toast after 3 seconds
    setTimeout(() => {
      setToast({ ...toast, visible: false });
    }, 3000);
  };

  // Status badge styles based on status
  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleOpenDetails = (schedule) => {
    setSelectedSchedule(schedule);
    setShowScheduleModal(true);
  };

  const handleCancelSchedule = async () => {
    if (!selectedSchedule || !selectedSchedule.meetingid) {
      showToast("No valid meeting to cancel", "error");
      return;
    }

    try {
      const response = await axiosInstance.post("/client/cancelschedule", {
        meeting_id: selectedSchedule.meetingid,
        message: "Cancelled by client",
      });

      if (response.data.status === "success") {
        showToast("Meeting successfully cancelled");

        // Update schedules list
        setSchedules(
          schedules.map((schedule) =>
            schedule.id === selectedSchedule.id
              ? { ...schedule, status: "Cancelled" }
              : schedule
          )
        );

        setShowCancelModal(false);
        setShowScheduleModal(false);
      } else {
        showToast(response.data.message || "Failed to cancel meeting", "error");
      }
    } catch (error) {
      console.error("Error cancelling meeting:", error);
      showToast("Error cancelling meeting. Please try again.", "error");
    }
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay();

    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();

    const prevMonthDays = startingDayOfWeek;

    const totalCells = Math.ceil((totalDays + prevMonthDays) / 7) * 7;
    const nextMonthDays = totalCells - totalDays - prevMonthDays;

    const days = [];

    const prevMonth = new Date(year, month, 0);
    const prevMonthTotalDays = prevMonth.getDate();
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthTotalDays - i),
        isCurrentMonth: false,
        hasEvents: false,
        events: [],
      });
    }

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      const dateString = date.toISOString().split("T")[0];

      // Find schedules for this day
      const dayEvents = schedules.filter((schedule) => {
        const scheduleDate = new Date(schedule.start_schedule_date);
        return (
          scheduleDate.getFullYear() === date.getFullYear() &&
          scheduleDate.getMonth() === date.getMonth() &&
          scheduleDate.getDate() === date.getDate()
        );
      });

      days.push({
        date,
        isCurrentMonth: true,
        hasEvents: dayEvents.length > 0,
        events: dayEvents,
      });
    }

    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        hasEvents: false,
        events: [],
      });
    }

    return days;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";

    if (timeString.includes("AM") || timeString.includes("PM")) {
      return timeString;
    }

    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const openMeetingLink = (link) => {
    if (link) {
      window.open(link, "_blank");
    } else {
      showToast("No meeting link available", "error");
    }
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Interview Schedules
        </h1>
        <p className="text-gray-600">
          Manage and track all your interview appointments
        </p>
      </div>

      {/* View Toggle Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveView("table")}
            className={`px-4 py-2 font-medium text-sm ${
              activeView === "table"
                ? "bg-blue-900 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              List View
            </span>
          </button>
          <button
            onClick={() => setActiveView("calendar")}
            className={`px-4 py-2 font-medium text-sm ${
              activeView === "calendar"
                ? "bg-blue-900 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Calendar View
            </span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
        </div>
      ) : (
        <>
          {/* Table View */}
          {activeView === "table" && (
            <div className="bg-white shadow-lg border border-gray-300 rounded-lg p-6">
              {schedules.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-blue-500">
                          Applicant
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-blue-500">
                          Subject
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-blue-500">
                          Date
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-blue-500">
                          Time
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-blue-500">
                          Location
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-blue-500">
                          Status
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-blue-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedules.map((schedule) => (
                        <tr
                          key={schedule.id}
                          className="border-b hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleOpenDetails(schedule)}
                        >
                          <td className="py-3 px-4 text-sm">
                            <div className="font-medium">
                              {schedule.applicant_name || "John Doe"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {schedule.applicant_email ||
                                "applicant@example.com"}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {schedule.subject}
                          </td>
                          <td className="py-3 px-4 text-sm text-center">
                            {formatDate(schedule.start_schedule_date)}
                          </td>
                          <td className="py-3 px-4 text-sm text-center">
                            {formatTime(schedule.start_schedule_time)} -{" "}
                            {formatTime(schedule.end_schedule_time)}
                          </td>
                          <td className="py-3 px-4 text-sm text-center">
                            {schedule.schedule_type === "online"
                              ? "Online Meeting"
                              : schedule.location}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClasses(
                                schedule.status
                              )}`}
                            >
                              {schedule.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDetails(schedule);
                              }}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-300 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-700 mb-1">
                    No schedules found
                  </h3>
                  <p className="text-gray-500 text-center max-w-md">
                    You don't have any interview schedules yet. They will appear
                    here once you schedule interviews with applicants.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Calendar View */}
          {activeView === "calendar" && (
            <div className="bg-white shadow-lg border border-gray-300 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {currentDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={previousMonth}
                    className="p-2 rounded-md hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 rounded-md hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Weekday Headers */}
                {weekDays.map((day, index) => (
                  <div
                    key={index}
                    className="p-2 text-center text-sm font-medium text-gray-600"
                  >
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-32 border rounded-md p-1 ${
                      day.isCurrentMonth
                        ? "bg-white"
                        : "bg-gray-50 text-gray-400"
                    } ${
                      day.hasEvents ? "cursor-pointer hover:bg-blue-50" : ""
                    }`}
                    onClick={() => day.hasEvents && setSelectedDate(day)}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className={`text-sm p-1 rounded-full w-7 h-7 flex items-center justify-center ${
                          new Date().toDateString() === day.date.toDateString()
                            ? "bg-blue-900 text-white"
                            : ""
                        }`}
                      >
                        {day.date.getDate()}
                      </span>
                    </div>

                    {/* Events for this day */}
                    <div className="mt-1 space-y-1">
                      {day.events.slice(0, 3).map((event, idx) => (
                        <div
                          key={idx}
                          className={`px-2 py-1 text-xs rounded-md truncate ${getStatusBadgeClasses(
                            event.status
                          )}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDetails(event);
                          }}
                        >
                          {formatTime(event.start_schedule_time)} -{" "}
                          {event.subject}
                        </div>
                      ))}
                      {day.events.length > 3 && (
                        <div className="px-2 py-1 text-xs text-blue-600">
                          +{day.events.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Schedule Details Modal */}
      {showScheduleModal && selectedSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Interview Details</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${getStatusBadgeClasses(
                    selectedSchedule.status
                  )}`}
                >
                  {selectedSchedule.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Subject
                    </h4>
                    <p className="font-medium">{selectedSchedule.subject}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Date & Time
                    </h4>
                    <p>{formatDate(selectedSchedule.start_schedule_date)}</p>
                    <p>
                      {formatTime(selectedSchedule.start_schedule_time)} -{" "}
                      {formatTime(selectedSchedule.end_schedule_time)}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Location
                    </h4>
                    <p>
                      {selectedSchedule.schedule_type === "online"
                        ? "Online Meeting"
                        : selectedSchedule.location}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Applicant
                    </h4>
                    <p className="font-medium">
                      {selectedSchedule.applicant_name || "John Doe"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedSchedule.applicant_email ||
                        "applicant@example.com"}
                    </p>
                  </div>

                  {selectedSchedule.remarks && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Notes
                      </h4>
                      <p className="text-sm">{selectedSchedule.remarks}</p>
                    </div>
                  )}

                  {selectedSchedule.meeting_link &&
                    selectedSchedule.status === "Accepted" && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Meeting Link
                        </h4>
                        <button
                          onClick={() =>
                            openMeetingLink(selectedSchedule.meeting_link)
                          }
                          className="mt-1 px-4 py-2 bg-blue-900 text-white rounded-md text-sm hover:bg-blue-800 flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          Join Meeting
                        </button>
                      </div>
                    )}
                </div>
              </div>

              {/* Actions */}
              <div className="border-t pt-4 flex justify-end space-x-3">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>

                {selectedSchedule.status === "Pending" && (
                  <button
                    onClick={() => {
                      setShowCancelModal(true);
                    }}
                    className="px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-md hover:bg-red-100"
                  >
                    Cancel Interview
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Cancel Interview</h3>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">
                Are you sure you want to cancel this interview? This action
                cannot be undone.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                No, Keep It
              </button>
              <button
                onClick={handleCancelSchedule}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Yes, Cancel Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Message */}
      {toast.visible && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-md shadow-lg z-50 flex items-center space-x-2 ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {toast.type === "success" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {toast.type === "error" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default Schedules;
