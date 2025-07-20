import { NavLink, Outlet } from 'react-router-dom'
import { FaUser, FaPlus, FaList } from 'react-icons/fa'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const UserDashboard = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard/my-profile"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 ${
                  isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'
                }`
              }
            >
              <FaUser /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-post"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 ${
                  isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'
                }`
              }
            >
              <FaPlus /> Add Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-posts"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 ${
                  isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'
                }`
              }
            >
              <FaList /> My Posts
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Mobile Sidebar (Optional: add a toggle in future) */}
      <aside className="block md:hidden fixed top-0 left-0 w-full bg-white shadow z-10 p-4">
        <h2 className="text-lg font-bold text-blue-600">Dashboard</h2>
        <div className="flex gap-4 mt-3 text-sm">
          <NavLink to="/dashboard/my-profile" className="text-blue-600">Profile</NavLink>
          <NavLink to="/dashboard/add-post" className="text-blue-600">Add</NavLink>
          <NavLink to="/dashboard/my-posts" className="text-blue-600">Posts</NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 mt-16 md:mt-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default UserDashboard
