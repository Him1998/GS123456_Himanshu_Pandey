import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiGrid, FiBox, FiClipboard, FiBarChart2, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FiGrid /> },
    { name: "SKU Management", path: "/sku", icon: <FiBox /> },
    { name: "Planning", path: "/planning", icon: <FiClipboard /> },
    { name: "Analytics", path: "/analytics", icon: <FiBarChart2 /> },
  ];

  return (
    <div className={`h-screen bg-gray-900 text-gray-500 flex flex-col justify-between ${isOpen ? "w-64" : "w-20"} transition-all duration-300`}>
      <div>
        {/* Sidebar Toggle Button */}
        <button className="p-4 focus:outline-none" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>

        {/* Menu Items */}
        <nav className="flex flex-col gap-2 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 p-3 rounded-lg transition ${
                location.pathname === item.path ? "bg-blue-500" : "hover:bg-gray-700"
              }`}
            >
              {item.icon} <span className={`${isOpen ? "block" : "hidden"}`}>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center gap-4 p-3 w-full rounded-lg transition bg-red-500 hover:bg-red-600 text-gray"
        >
          <FiLogOut size={20} />
          <span className={`${isOpen ? "block" : "hidden"}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
