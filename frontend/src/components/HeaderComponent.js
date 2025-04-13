// import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
// import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    // const navigate = useNavigate();

    const handleClick = () => {
        logout();
    };

    return (
        <header className="headerComponent bg-slate-800 px-6 py-2 shadow-md font-mont">
            <div className="container mx-auto flex justify-between items-center text-white">
                <div className="flex gap-6">
                    <h1 className="text-xl font-bold">{user.displayName}</h1>
                </div>
                <button className="bg-slate-50 font-bold text-black px-4 py-2 rounded-lg hover:bg-slate-200 transition" onClick={handleClick}>Logout</button>
            </div>
        </header>
    );
};

export default HeaderComponent;
