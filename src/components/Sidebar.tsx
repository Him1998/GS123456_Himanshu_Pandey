import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiGrid, FiBox, FiClipboard, FiBarChart2 } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FiGrid /> },
    { name: "SKU Management", path: "/sku", icon: <FiBox /> },
    { name: "Planning", path: "/planning", icon: <FiClipboard /> },
    { name: "Charts", path: "/charts", icon: <FiBarChart2 /> },
  ];

  return (
    <div className={`h-screen bg-gray-900 text-white flex ${isOpen ? "w-64" : "w-20"} transition-all duration-300`}>
      <div className="flex flex-col w-full">
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
    </div>
  );
};

export default Sidebar;
