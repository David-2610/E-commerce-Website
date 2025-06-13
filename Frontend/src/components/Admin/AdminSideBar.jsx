import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";



const AdminSideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(logout());
        dispatch(clearCart());
        navigate("/");
    };

	return (
        <div className="h-screen flex flex-col bg-gray-800 p-6">
            <div className="mb-6">
                <Link to="/admin" className="text-2xl font-medium">Rabbit</Link>
            </div>
            <h2 className="text-2xl font-medium mb-6 text-center">Admin Dashboard</h2>

            <nav className="flex flex-col space-y-2">
                <NavLink to="/admin/users" className={({isActive}) => isActive ? "bg-gray-500 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-500 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaUser />
                <span>Users</span>
                </NavLink>

                <NavLink to="/admin/products" className={({isActive}) => isActive ? "bg-gray-500 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-500 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaBoxOpen />
                <span>Products</span>
                </NavLink>

                <NavLink to="/admin/orders" className={({isActive}) => isActive ? "bg-gray-500 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-500 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaClipboardList />
                <span>Orders</span>
                </NavLink>

                <NavLink to="/" className={({isActive}) => isActive ? "bg-gray-500 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-500 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaStore />
                <span>Store</span>
                </NavLink>
                
            </nav>

            <div className="mt-6">
                <button onClick={handleLogOut} className="w-full bg-red-500 uppercase text-white hover:bg-red-600 flex px-4 py-2 rounded-lg items-center justify-center space-x-2"> <FaSignOutAlt size={20} /><span>LogOut</span></button>
            </div>
        </div>
	);
};

export default AdminSideBar;
