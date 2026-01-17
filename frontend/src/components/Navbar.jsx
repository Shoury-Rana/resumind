import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/">
                <p className="text-2xl font-bold text-gradient">RESUMIND</p>
            </Link>
            {user && (
                 <div className="flex items-center gap-4">
                    <Link to="/upload" className="primary-button w-fit!">
                        Upload Resume
                    </Link>
                    <button onClick={logout} className="text-gray-600 hover:text-gray-900">
                        Logout
                    </button>
                 </div>
            )}
        </nav>
    )
}
export default Navbar