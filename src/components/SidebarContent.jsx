import { AlertTriangle, FilePlus, Home, List, Megaphone, UserCircle, Users } from "lucide-react";
import { Link, NavLink } from "react-router";
import Loading from "../pages/Loading/Loading";

const SidebarContent = ({ role, isLoading, linkClass }) => {
  return (
    <>
      <Link to="/" className="flex items-center gap-2 mb-6 px-2">
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
        <span className="text-[#007dff] text-lg font-bold dark:text-white">DevDialogue</span>
      </Link>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <nav className="space-y-2 text-gray-800 text-sm dark:text-white">
          {role === "admin" ? (
            <>
              <NavLink to="/dashboard/admin-profile" className={linkClass}>
                <UserCircle size={18} /> Admin Profile
              </NavLink>
              <NavLink to="/dashboard/manage-users" className={linkClass}>
                <Users size={18} /> Manage Users
              </NavLink>
              <NavLink
               to="/dashboard/reported-comments" className={linkClass}>
                <AlertTriangle size={18} /> Reported Comments
              </NavLink>
              <NavLink to="/dashboard/make-announcement" className={linkClass}>
                <Megaphone size={18} /> Make Announcement
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard/my-profile" className={linkClass}>
                <UserCircle size={18} /> My Profile
              </NavLink>
              <NavLink to="/dashboard/add-post" className={linkClass}>
                <FilePlus size={18} /> Add Post
              </NavLink>
              <NavLink to="/dashboard/my-posts" className={linkClass}>
                <List size={18} /> My Posts
              </NavLink>
            </>
          )}

          <div className="pt-4 border-t mt-4">
            <NavLink to="/" className={linkClass}>
              <Home size={18} /> Back to Home
            </NavLink>
          </div>
        </nav>
      )}
    </>
  );
};

export default SidebarContent;