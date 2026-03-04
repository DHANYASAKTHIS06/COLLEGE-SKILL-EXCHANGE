import { useApp } from "../../context/AppContext";
import { Button } from "../../components/ui/button";
import { CheckCircle, XCircle, CreditCard } from "lucide-react";

export default function StudentRequests() {
  const { courses, updateCourseStatus, addNotification } = useApp();

  const pendingRequests = courses.filter((c) => c.status === "requested");

  const handleAccept = (courseId: string, courseName: string) => {
    updateCourseStatus(courseId, "accepted");
    addNotification({
      title: "Request Accepted",
      message: `You accepted the request for ${courseName}`,
      timestamp: "Just now",
      read: false,
      icon: "check-circle",
      type: "success",
    });
  };

  const handleReject = (courseId: string) => {
    updateCourseStatus(courseId, "rejected");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Student Requests</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Review and manage incoming tutoring requests from students.
        </p>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-12 border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-500">No pending requests</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pendingRequests.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={course.tutorImage}
                  alt={course.tutorName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-lg">{course.tutorName}</h3>
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 text-xs font-medium rounded-full">
                      Pending
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{course.requestedAt}</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                  SKILL REQUESTED
                </p>
                <p className="font-medium text-blue-500">{course.skill}</p>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                  MESSAGE
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {course.message}
                </p>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-500">25 Credits</span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={() => handleReject(course.id)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleAccept(course.id, course.skill)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Decisions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Decisions</h2>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <img
              src="figma:asset/cafb7b5743696336dd503139cfc3ccfe8627302c.png"
              alt="Sarah Chen"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">Sarah Chen</p>
              <p className="text-sm text-gray-500">Python Data Analysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
