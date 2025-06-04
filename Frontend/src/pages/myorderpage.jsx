import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
const Myorderpage = () => {
	const [orders, setOrders] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			const mockorders = [
				{
					_id: "13453",
					createdAt: new Date(),
					ShippingAddress: { city: "cairo", country: "egypt" },
					orderItems: [
						{
							name: "item1",
							image: "http://picsum.photos/500/500?random=1",
						},
					],
					totalprice: 100,
					ispaid: true,
				},
				{
					_id: "24335",
					createdAt: new Date(),
					ShippingAddress: { city: "cairo", country: "egypt" },
					orderItems: [
						{
							name: "item2",
							image: "http://picsum.photos/500/500?random=2",
						},
					],
					totalprice: 200,
					ispaid: false,
				},
			];
			setOrders(mockorders);
		}, 1000);
	}, []);
	
	const handleRowClick = (orderId) => {
		navigate(`/order/${orderId}`);
	};
	return (
		<div className="max-w-7xl mx-auto p-4 sm:p-6">
			<h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
			<div className="relative shadow-md sm:rounded-lg overflow-hidden">
				<table className="min-w-full text-left text-gray-500">
					<thead className="bg-gray-100 text-xs uppercase text-gray-700">
						<tr>
							<th className="py-2 px-4 sm:py-3">Image</th>
							<th className="py-2 px-4 sm:py-3">Order ID</th>
							<th className="py-2 px-4 sm:py-3">Created</th>
							<th className="py-2 px-4 sm:py-3">
								Shipping Adderss
							</th>
							<th className="py-2 px-4 sm:py-3">Items</th>
							<th className="py-2 px-4 sm:py-3">Price</th>
							<th className="py-2 px-4 sm:py-3">Status</th>
						</tr>
					</thead>
					<tbody>
						{orders.length > 0 ? (
							orders.map((order) => (
								<tr
									key={order._id}
									onClick={() => handleRowClick(order._id)}
									className="border-b hover:border-gray-50 cursor-pointer "
								>
									<td className="py-2 px-4 sm:py-4 sm:px-4">
										<img
											src={order.orderItems[0].image}
											alt={order.orderItems[0].name}
											className="w-10 h-10 object-cover sm:w-12 sm:h-12 rounded-lg"
										/>
									</td>

									<td
										className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900
                                    whitespace-nowrap"
									>
										#{order._id}
									</td>
									<td className="py-2 px-2 sm:py-4 sm:px-4">
										{order.createdAt.toLocaleDateString()}{" "}
										{order.createdAt.toLocaleTimeString()}
									</td>
									<td className="py-2 px-2 sm:py-4 sm:px-4">
										{order.ShippingAddress
											? `${order.ShippingAddress.city}, ${order.ShippingAddress.country}`
											: "N/A"}
									</td>
									<td className="py-2 px-2 sm:py-4 sm:px-4">
										{order.orderItems.map((item) => (
											<div key={item.name}>
												{item.name}
											</div>
										))}
									</td>
									<td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900">
										{order.totalprice}
									</td>
									<td className="py-2 px-2 sm:py-4 sm:px-4">
										<span
											className={`${
												order.ispaid
													? " bg-green-100 text-green-700"
													: "bg-red-100 text-red-700"
											} px-2 py-1 rounded-full text-xs sm:text-sm  font-medium `}
										>
											{order.ispaid ? "Paid" : "Pending"}
										</span>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={7}
									className="py-4 px-4  text-center text-gray-500"
								>
									No orders found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Myorderpage;
