const OrderManagement = () => {
	const orders = [
		{
			_id: "1",
			user: {
				name: "John Doe",
			},
			totalPrice: 4999,
			status: "processing",
		},
		{
			_id: "2",
			user: {
				name: "Jane Smith",
			},
			totalPrice: 7999,
			status: "shipped",
		},
		{
			_id: "3",
			user: {
				name: "Alice Johnson",
			},
			totalPrice: 2999,
			status: "delivered",
		},
		{
			_id: "4",
			user: {
				name: "Bob Brown",
			},
			totalPrice: 3999,
			status: "cancelled",
		},
	];
	const handleStatusChange = (orderId, newStatus) => {
		console.log(`Order ${orderId} status changed to ${newStatus}`);
	};
	return (
		<div className="max-w-7xl mx-auto p-6 ">
			<h2 className="text-2xl font-bold mb-6">Order Management</h2>
			<div className="overflow-x-auto shadow-md sm:rounded-lg ">
				<table className="min-w-full text-left text-gray-500 ">
					<thead className="bg-gray-100 text-xs uppercase text-gray-700">
						<tr>
							<td className="py-3 px-4 ">OrderId</td>
							<td className="py-3 px-4 ">Customer</td>
							<td className="py-3 px-4 ">Total Price </td>
							<td className="py-3 px-4 ">Satus</td>
							<td className="py-3 px-4 ">Actions</td>
						</tr>
					</thead>
					<tbody>
						{orders.length > 0 ? (
							orders.map((order) => (
								<tr
									key={order._id}
									className="border-b hover:bg-gray-50 cursor-pointer"
								>
									<td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
										{order._id}
									</td>
									<td className="p-4">{order.user.name}</td>
									<td className="p-4">${order.totalPrice}</td>
									<td className="p-4 capitalize">
										<select
											value={order.status}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
											onChange={(e) => {
												handleStatusChange(
													order._id,
													e.target.value
												);
											}}
										>
											<option value="processing">
												processing
											</option>
											<option value="shipped">
												Shipped
											</option>
											<option value="Delivered">
												Delivered
											</option>
											<option value="cancelled">
												Cancelled
											</option>
										</select>
									</td>
									<td className="p-4">
										<button
											onChange={() =>
												handleStatusChange(order._id, "Delivered")
											}
											className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
										>Mark As Delivered</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={5} className="text-center text-gray-500 p-4">
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

export default OrderManagement;
