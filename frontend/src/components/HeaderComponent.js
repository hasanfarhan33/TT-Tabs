import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleClick = () => {
        logout();
    };

    return (
        <header className="headerComponent bg-slate-800 px-6 py-2 shadow-md">
            <div className="container mx-auto flex justify-between items-center text-white">
                <div className="flex gap-6">
                    {/* Display user displayName if user exists */}
                    {user ? (
                        <h1 className="text-xl font-bold">{user.displayName}</h1>
                    ) : (
                        <h1 className="text-xl font-bold">Guest</h1>
                    )}
                </div>
                <nav>
                    {user ? (
                        <div className="flex">
                            <button
                                className="bg-slate-50 text-black px-4 py-2 rounded-lg hover:bg-slate-200 transition"
                                onClick={handleClick}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <ul className="flex space-x-6">
                            <li>
                                <NavLink to="/login" className="hover:text-gray-100 hover:underline transition">
                                    Login
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/register" className="hover:text-gray-100 hover:underline transition">
                                    Register
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default HeaderComponent;
