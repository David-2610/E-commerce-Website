import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../redux/slices/orderSlice";
import { FaBoxOpen } from "react-icons/fa"; // Added for empty state

const Myorderpage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await dispatch(fetchUserOrders());
                if (fetchUserOrders.fulfilled.match(result)) {
                    console.log("Orders fetched successfully.");
                } else {
                    console.error("Failed to fetch orders:", result.error);
                }
            } catch (err) {
                console.error("Unexpected error fetching orders:", err);
            }
        };
    
        fetchOrders();
    }, [dispatch]);
    
	
	const handleRowClick = (orderId) => {
		navigate(`/order/${orderId}`);
	};
	
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto p-4 sm:p-6">
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg">Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto p-4 sm:p-6">
                <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                    <p className="font-medium">Error loading orders:</p>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

	return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
            
            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FaBoxOpen className="text-5xl text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No orders found</h3>
                    <p className="text-gray-600 mb-6">
                        You haven't placed any orders yet
                    </p>
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
                    <table className="min-w-full text-left text-gray-500">
                        <thead className="bg-gray-100 text-sm uppercase text-gray-800">
                            <tr>
                                <th className="py-3 px-4">Image</th>
                                <th className="py-3 px-4">Order ID</th>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Shipping</th>
                                <th className="py-3 px-4">Items</th>
                                <th className="py-3 px-4">Price</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                // Safely get first item
                                const firstItem = order.orderItems?.[0];
                                
                                return (
                                    <tr 
                                        key={order._id} 
                                        onClick={() => handleRowClick(order._id)}
                                        className="border-b hover:bg-gray-50 cursor-pointer"
                                    >
                                        {/* Image with null check */}
                                        <td className="py-4 px-4">
                                            {firstItem?.image ? (
                                                <img 
                                                    src={firstItem.image} 
                                                    alt={firstItem.name || 'Order item'} 
                                                    className="w-12 h-12 object-cover rounded-lg" 
                                                />
                                            ) : (
                                                <div className="bg-gray-200 border-2 border-dashed rounded-lg w-12 h-12 flex items-center justify-center">
                                                    <span className="text-xs text-gray-500">No image</span>
                                                </div>
                                            )}
                                        </td>
                                        
                                        {/* Order ID */}
                                        <td className="py-4 px-4 font-medium text-gray-900">
                                            #{order._id.substring(0, 8)}...
                                        </td>
                                        
                                        {/* Date */}
                                        <td className="py-4 px-4">
                                            {order.createdAt ? (
                                                <>
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                    <br />
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </>
                                            ) : 'N/A'}
                                        </td>
                                        
                                        {/* Shipping Address */}
                                        <td className="py-4 px-4">
                                            {order.shippingAddress ? (
                                                <div className="text-sm">
                                                    {order.shippingAddress.city}, {order.shippingAddress.country}
                                                </div>
                                            ) : "Not provided"}
                                        </td>
                                        
                                        {/* Item Count */}
                                        <td className="py-4 px-4">
                                            {order.orderItems?.length || 0}
                                        </td>
                                        
                                        {/* Price */}
                                        <td className="py-4 px-4 font-medium">
                                            ${order.totalPrice?.toFixed(2) || '0.00'}
                                        </td>
                                        
                                        {/* Status */}
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                order.isPaid 
                                                    ? "bg-green-100 text-green-800" 
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}>
                                                {order.isPaid ? "Paid" : "Pending"}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
	);
};

export default Myorderpage;
