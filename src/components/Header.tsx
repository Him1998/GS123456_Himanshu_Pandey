import { FiUser } from "react-icons/fi";
import GsynergyLogo from "../assets/Gsynergy Logo V2 Long Description.svg"

const Header = () => {
    return (
        <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
            {/* Page Title */}
            <h1 className="text-xl font-semibold text-gray-700">Gsynergyⓒ</h1>

            {/* User Profile Icon */}
            <div className="p-2 bg-gray-200 rounded-full cursor-pointer">
                <img src={GsynergyLogo} width={100} className="text-gray-700"></img>
            </div>
        </header>
    );
};

export default Header;



