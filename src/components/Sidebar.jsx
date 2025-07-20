import { NavLink, Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchUserByEmail } from "../services/api";
import {
  UserCircle,
  FilePlus,
  List,
  ShieldCheck,
  Users,
  AlertTriangle,
  Megaphone,
  Home,
} from "lucide-react";
import SidebarContent from "./SidebarContent";

// const Sidebar = () => {
//   const { user } = useContext(AuthContext);

//   // Fetch role from MongoDB
//   const { data: dbUser, isLoading } = useQuery({
//     queryKey: ["user", user?.email],
//     queryFn: () => fetchUserByEmail(user?.email),
//     enabled: !!user?.email,
//   });

//   const role = dbUser?.role || "user";

//   const linkClass =
//     "flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600 transition";

//   return (
//     <div className="w-64 bg-white border-r shadow-md h-screen p-4 hidden md:block">
//       <Link to="/" className="flex items-center gap-2 mb-6 px-2">
//         <img src="/logo.png" alt="Logo" className="w-8 h-8" />
//         <span className="text-[#007dff] text-lg font-bold">DevDialogue</span>
//       </Link>

//       {isLoading ? (
//         <p className="text-gray-500">Loading sidebar...</p>
//       ) : (
//         <nav className="space-y-2 text-gray-800 text-sm">
//           {role === "admin" ? (
//             <>
//               <NavLink to="/dashboard/admin-profile" className={linkClass}>
//                 <UserCircle size={18} /> Admin Profile
//               </NavLink>
//               <NavLink to="/dashboard/manage-users" className={linkClass}>
//                 <Users size={18} /> Manage Users
//               </NavLink>
//               <NavLink to="/dashboard/reported-comments" className={linkClass}>
//                 <AlertTriangle size={18} /> Reported Comments
//               </NavLink>
//               <NavLink to="/dashboard/make-announcement" className={linkClass}>
//                 <Megaphone size={18} /> Make Announcement
//               </NavLink>
//             </>
//           ) : (
//             <>
//               <NavLink to="/dashboard/my-profile" className={linkClass}>
//                 <UserCircle size={18} /> My Profile
//               </NavLink>
//               <NavLink to="/dashboard/add-post" className={linkClass}>
//                 <FilePlus size={18} /> Add Post
//               </NavLink>
//               <NavLink to="/dashboard/my-posts" className={linkClass}>
//                 <List size={18} /> My Posts
//               </NavLink>
//             </>
//           )}

//           {/* Optional: Home Link */}
//           <div className="pt-4 border-t mt-4">
//             <NavLink to="/" className={linkClass}>
//               <Home size={18} /> Back to Home
//             </NavLink>
//           </div>
//         </nav>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useContext(AuthContext);

  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () => fetchUserByEmail(user?.email),
    enabled: !!user?.email,
  });

  const role = dbUser?.role || "user";
  const linkClass =
    "flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600 transition";

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-64 bg-white border-r shadow-md h-screen p-4 hidden md:block">
        <SidebarContent role={role} isLoading={isLoading} linkClass={linkClass} />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 bg-white shadow-md h-full p-4 z-40 transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="mb-4 text-gray-500 hover:text-black"
          onClick={() => setIsOpen(false)}
        >
          ✕ Close
        </button>

        <SidebarContent role={role} isLoading={isLoading} linkClass={linkClass} />
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;


