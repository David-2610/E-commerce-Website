import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import {FaLongArrowAltLeft} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetailspage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
    const {orderDetails, loading, error} = useSelector((state)=> state.orders);

    useEffect(() => {
        const fetchOrder = async () => {
            if (id) {
                try {
                    await dispatch(fetchOrderDetails(id));
                } catch (error) {
                    console.error("Failed to fetch order details:", error);
                }
            }
        };
    
        fetchOrder();
    }, [dispatch, id]);
    

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error: {error}</p>
    }


	return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
            {!orderDetails? (
                <p>No Order details found</p>
            ) : (
                <div className="p-4 sm:p-6 rounded-lg border">
                    {/* OrderInfo */}
                    <div className="flex flex-col sm:flex-row justify-between mb-8">
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold">Order Id: #{orderDetails._id}</h3>
                            <p className="text-gray-700">{new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
                            <span className={`${orderDetails.isPaid? "bg-green-200 text-green-800" : "bg-red-100 text-red-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>{orderDetails.isPaid ? "Approved" : "Pending"}</span>
                            <span className={`${orderDetails.isDelivered? "bg-green-100 text-green-800" : "bg-yellow-200 text-yellow-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>{orderDetails.isDelivered ? "Delivered" : "Pending"}</span>
                        </div>
                    </div>
                    {/* Customer payment & shipping info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
                            <p>Payment Method: {orderDetails.paymentMethod}</p>
                            <p>Status: {orderDetails.isPaid? "Paid": "Unpaid"}</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
                            <p>Shipping Method: {orderDetails.shippingMethod}</p>
                            <p>Address: {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}</p>
                        </div>
                    </div>

                    {/* Product List */}
                    <div className="overflow-x-auto">
                        <h4 className="text-lg font-semibold mb-4">Products</h4>
                        <table className="min-w-full text-gray-800 mb-4">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4">Name</th>
                                    <th className="py-2 px-4">Unit Price</th>
                                    <th className="py-2 px-4">Quantity</th>
                                    <th className="py-2 px-4">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.orderItems.map((item) => (
                                    <tr key={item.productId} className="border-b">
                                        <td className=" text-center py-2 px-4 flex items-center">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 mr-4 rounded-lg object-cover" />
                                            <Link to={`/product/${item.productId}`} className="text-blue-500 hover:underline">{item.name}</Link>
                                        </td>
                                        <td className="py-2 px-4 text-center">${item.price}</td>
                                        <td className="py-2 px-4 text-center">{item.quantity}</td>
                                        <td className="py-2 px-4 text-center">${item.price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Link to="/my-orders" className="flex flex-cols text-blue-600 hover:underline"><FaLongArrowAltLeft className="mr-3 mt-1"/>Back to my Orders</Link> 
                </div>
            )}
        </div>
	);
};

export default OrderDetailspage;
