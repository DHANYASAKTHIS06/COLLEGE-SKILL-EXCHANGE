import { Search } from "lucide-react";

export default function UserManagement() {
  const users = [
    { id: 1, name: "Alex Rivera", email: "alex@example.com", role: "Student", status: "Active" },
    { id: 2, name: "Sarah Chen", email: "sarah@example.com", role: "Tutor", status: "Active" },
    { id: 3, name: "Jordan Smith", email: "jordan@example.com", role: "Student", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage platform users</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs rounded-full">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-xs rounded-full">
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
