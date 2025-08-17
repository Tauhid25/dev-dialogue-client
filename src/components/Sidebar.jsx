import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchUserByEmail } from "../services/api";
import SidebarContent from "./SidebarContent";

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
      <div className="w-64 bg-white border-r shadow-md h-screen p-4 hidden md:block dark:bg-gray-800 dark:text-white">
        <SidebarContent
          role={role}
          isLoading={isLoading}
          linkClass={linkClass}
        />
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
        ></button>

        <SidebarContent
          role={role}
          isLoading={isLoading}
          linkClass={linkClass}
        />
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
