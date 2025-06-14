import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slices/adminOrderSlice";

function OrderManagement() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector((state)=> state.auth);
    const {orders, loading, error} = useSelector((state)=> state.adminOrders);

    useEffect(()=> {
        if(!user || user.role !== "admin") {
            navigate("/admin");
        } else {
            dispatch(fetchAllOrders());
        }
    }, [dispatch, user, navigate]);

	const handleStatusChange = async (orderId, status) => {
		try {
			await dispatch(updateOrderStatus({ id: orderId, status })).unwrap();
			// Refresh orders after successful update
			dispatch(fetchAllOrders());
		} catch (err) {
			console.error("Failed to update status", err);
		}
	};
	

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return ( 
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Order Management</h2>

            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full text-gray-500 text-left">
                    <thead className="bg-gray-100 text-sm uppercase text-gray-800">
                        <tr>
                            <th className="py-3 px-4">Order Id</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Total Price</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className="border-b hover:text-gray-50 cursor-pointer">
                                    <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">#{order._id}</td>
                                    <td className="px-4 py-4 font-sm text-gray-900 whitespace-nowrap">{order.user.name}</td>
                                    <td className="px-4 py-4 font-sm text-gray-900 whitespace-nowrap">{order.totalPrice.toFixed(2)}</td>
                                    <td className="px-4 py-4">
                                        <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2">
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <button onClick={() => handleStatusChange(order._id, "Delivered")} className="bg-green-500 text-white rounded-lg hover:bg-green-600 w-3/4 h-12">Mark as Delivered</button>
                                    </td>
                                </tr>
                            ))
                        ) : 
                        (<tr>
                            <td className="text-center font-bold font-gray-800 h-48" colSpan={5}>No Orders available!</td>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        </div>
     );
}

export default OrderManagement;