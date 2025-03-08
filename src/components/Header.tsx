import { FiUser } from "react-icons/fi";

const Header = () => {
    return (
        <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
            {/* Page Title */}
            <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>

            {/* User Profile Icon */}
            <div className="p-2 bg-gray-200 rounded-full cursor-pointer">
                <FiUser size={24} className="text-gray-700" />
            </div>
        </header>
    );
};

export default Header;



