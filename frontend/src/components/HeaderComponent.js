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
        <header className="headerComponent bg-white px-6 py-2 shadow-md font-mont border-b-4 border-bat-black hover:shadow-lg transition">
            <div className="container mx-auto flex justify-between items-center text-white">
                <div className="flex gap-6">
                    <h1 className="text-xl font-bold font-funnel text-black">{user.displayName}</h1>
                </div>
                <button className="bg-bat-black font-bold text-white px-4 py-2 rounded-lg hover:bg-white hover:text-bat-black hover:ring-2 hover:ring-bat-black transition" onClick={handleClick}>Logout</button>
            </div>
        </header>
    );
};

export default HeaderComponent;
