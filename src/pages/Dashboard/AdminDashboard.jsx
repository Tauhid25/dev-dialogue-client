import { NavLink, Outlet } from 'react-router'
import {
  FaUserShield,
  FaUsers,
  FaBullhorn,
  FaExclamationTriangle,
} from 'react-icons/fa'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const AdminDashboard = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin-dashboard/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 ${
                  isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'
                }`
              }
            >
              <FaUserShield /> Admin Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/manage-users"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 ${
                  isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'
                }`
              }
            >
              <FaUsers /> Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/reported-comments"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 ${
                  isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'
                }`
              }
            >
              <FaExclamationTriangle /> Reported Comments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/announcement"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 ${
                  isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'
                }`
              }
            >
              <FaBullhorn /> Make Announcement
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Mobile nav (optional toggle can be added later) */}
      <aside className="block md:hidden fixed top-0 left-0 w-full bg-white shadow z-10 p-4">
        <h2 className="text-lg font-bold text-blue-700">Admin Panel</h2>
        <div className="flex gap-4 mt-3 text-sm">
          <NavLink to="/admin-dashboard/profile" className="text-blue-600">Profile</NavLink>
          <NavLink to="/admin-dashboard/manage-users" className="text-blue-600">Users</NavLink>
          <NavLink to="/admin-dashboard/reported-comments" className="text-blue-600">Reports</NavLink>
          <NavLink to="/admin-dashboard/announcement" className="text-blue-600">Announce</NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 mt-16 md:mt-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminDashboard
