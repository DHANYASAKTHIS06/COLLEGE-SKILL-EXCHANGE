import { useApp } from "../context/AppContext";
import { Button } from "./ui/button";
import { Clock, XCircle, CheckCircle } from "lucide-react";

export default function MobileStudentHome() {
  const { studentCredits, courses } = useApp();

  const pendingRequests = courses.filter((c) => c.status === "requested");

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Welcome back, Alex!</h1>
        <p className="text-gray-600 dark:text-gray-400">
          You have {pendingRequests.length} new requests waiting.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Weekly Revenue
            </span>
          </div>
          <p className="text-2xl font-bold">${studentCredits * 5}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-yellow-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Avg. Rating
            </span>
          </div>
          <p className="text-2xl font-bold">4.9</p>
        </div>
      </div>

      {/* Priority Requests */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Priority Requests</h2>
          <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">
            View All
          </button>
        </div>

        <div className="space-y-3">
          {pendingRequests.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={course.tutorImage}
                  alt={course.tutorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{course.tutorName}</h3>
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 text-xs font-medium rounded">
                      Requested
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{course.requestedAt}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-3">
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                  TOPIC REQUESTED
                </p>
                <p className="font-medium">{course.skill}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
                <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Accept
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}