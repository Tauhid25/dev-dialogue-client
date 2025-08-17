import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6 animate-fade-in dark:bg-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold text-blue-600 dark:text-white">Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-blue-100 rounded-lg p-4 shadow-sm dark:bg-gray-800 dark:text-white dark:border dark:border-white">
          <h2 className="flex items-center text-xl font-semibold gap-x-2 text-blue-800 dark:text-white"><img src={user?.photoURL} alt="User" className="w-10 h-10 mt-2 rounded-full" /> Logged in as:</h2>
          <p className="text-gray-800 mt-2 dark:text-white">{user?.displayName || "User"}</p>
          <p className="text-gray-500 text-sm dark:text-white">{user?.email}</p>
          <p className="text-gray-500 text-sm dark:text-white">{user?.phone}</p>
          <p className="text-gray-500 text-sm dark:text-white">{user?.address}</p>
        </div>

        <div className="bg-green-100 rounded-lg p-4 shadow-sm dark:bg-gray-800 dark:text-white dark:border dark:border-white">
          <h2 className="text-xl font-semibold text-green-800 dark:text-white">📅 Today's Overview</h2>
          <ul className="mt-2 text-gray-800 list-disc list-inside dark:text-white">
            <li>Check your latest posts</li>
            <li>Manage your profile settings</li>
            <li>View announcements</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow-sm border-l-4 border-yellow-400 dark:bg-gray-800 dark:text-white dark:border dark:border-white">
        <p className="text-yellow-900 font-medium dark:text-white">
          🚀 Tip: Use the left sidebar to navigate your dashboard features.
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
