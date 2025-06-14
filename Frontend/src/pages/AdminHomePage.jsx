import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";
import { useEffect } from "react";

const AdminHomePage = () => {
	const dispatch = useDispatch();
    const {products, loading: productsLoading, error: productsError} = useSelector((state) => state.adminProducts);
    const {orders, totalOrders, totalSales, loading: ordersLoading, error: ordersError} = useSelector((state)=> state.adminOrders);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResult = await dispatch(fetchAdminProducts());
                const ordersResult = await dispatch(fetchAllOrders());
    
                if (fetchAdminProducts.fulfilled.match(productsResult)) {
                    console.log("Admin products fetched successfully.");
                } else {
                    console.error("Failed to fetch admin products:", productsResult.error);
                }
    
                if (fetchAllOrders.fulfilled.match(ordersResult)) {
                    console.log("All orders fetched successfully.");
                } else {
                    console.error("Failed to fetch orders:", ordersResult.error);
                }
            } catch (err) {
                console.error("Unexpected error during admin data fetch:", err);
            }
        };
    
        fetchData();
    }, [dispatch]);
    
	return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 pb-6 border-b">Admin Dashboard</h1>
            {productsLoading || ordersLoading ? (
                <p>Loading...</p>
            ) : productsError ? (
                <p className="text-red-500">Error fetching produts: {productsError}</p>
            ) : ordersError ? (
                <p className="text-red-500">Error fetching orders: {ordersError}</p> )
            : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 shadow-lg shadow-gray-300 rounded-lg">
                    <h2 className="text-xl font-semibold">Revenue</h2>
                    <p className="text-2xl">${totalSales.toFixed(2)}</p>
                </div>
                <div className="p-4 shadow-lg shadow-gray-300 rounded-lg">
                    <h2 className="text-xl font-semibold">Total Orders</h2>
                    <p className="text-2xl">{totalOrders}</p>
                    <Link to="/admin/orders" className="text-blue-500 hover:underline">Manage Orders</Link>
                </div>
                <div className="p-4 shadow-lg shadow-gray-300 rounded-lg">
                    <h2 className="text-xl font-semibold">Total Products</h2>
                    <p className="text-2xl">{products.length}</p>
                    <Link to="/admin/products" className="text-blue-500 hover:underline">Manage Products</Link>
                </div>
            </div>
            )}
            <div className="mt-6 ">
                <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-gray-500">
                        <thead className="bg-black text-sm uppercase text-white">
                            <tr>
                                <th className="py-3 px-4">Order ID</th>
                                <th className="py-3 px-4">User</th>
                                <th className="py-3 px-4">Total Price</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order._id} className="border-b hover:bg-gray-100 cursor-pointer">
                                        <td className="py-4">{order._id}</td>
                                        <td className="py-4">{order.user.name}</td>
                                        <td className="py-4">{order.totalPrice.toFixed(2)}</td>
                                        <td className="py-4">{order.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-500">No recent Orders found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
	);
};

export default AdminHomePage;
