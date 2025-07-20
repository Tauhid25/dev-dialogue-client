// import { Outlet, useLocation } from "react-router";
// import Sidebar from "../components/Sidebar";
// import DashboardHome from "../pages/Dashboard/DashboardHome";

// const DashboardLayout = () => {
//   const location = useLocation();

//   const isDashboardRoot = location.pathname === "/dashboard";

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 p-5 md:p-8">
//         {isDashboardRoot ? <DashboardHome /> : <Outlet />}
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import { Outlet, useLocation } from "react-router";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import { Menu } from "lucide-react";

const DashboardLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isDashboardRoot = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen flex bg-gray-100 relative">
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-800"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 p-5 md:p-8">
        {isDashboardRoot ? <DashboardHome /> : <Outlet />}
      </div>
    </div>
  );
};

export default DashboardLayout;

