import { Users, BookOpen, TrendingUp, AlertCircle } from "lucide-react";

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Platform overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
          </div>
          <p className="text-3xl font-bold">5,240</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Courses</p>
          </div>
          <p className="text-3xl font-bold">342</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Growth Rate</p>
          </div>
          <p className="text-3xl font-bold">+22%</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending Reviews</p>
          </div>
          <p className="text-3xl font-bold">12</p>
        </div>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold mb-2">New Tutor Application</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Dr. Julian Smith submitted a new certificate for review.
          </p>
          <p className="text-xs text-gray-500">JUST NOW</p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
          <h3 className="font-semibold mb-2">Credit Dispute</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Dispute raised for TXN-8421 between Alex and Sarah.
          </p>
          <p className="text-xs text-gray-500">15M AGO</p>
        </div>
      </div>
    </div>
  );
}
