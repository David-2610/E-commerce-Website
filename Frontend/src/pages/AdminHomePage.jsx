import { Link } from "react-router";

const AdminHomePage = () => {
	const orders = [
		{
			_id: "211001",
			user: { name: "John Doe" },
			totalPrice: 100,
			status: "Processing",
		},
		{
			_id: "211002",
			user: { name: "Jane Doe" },
			totalPrice: 200,
			status: "Processing",
		},
		{
			_id: "211003",
			user: { name: "Alice Smith" },
			totalPrice: 150,
			status: "Delivered",
		},
		{
			_id: "211004",
			user: { name: "Bob Johnson" },
			totalPrice: 300,
			status: "Cancelled",
		},

		{
			_id: "211005",
			user: { name: "Eve Brown" },
			totalPrice: 250,
			status: "Delivered",
		},
		{
			_id: "211006",
			user: { name: "Charlie Green" },
			totalPrice: 180,
			status: "Processing",
		},
		{
			_id: "211007",
			user: { name: "David White" },
			totalPrice: 220,
			status: "Cancelled",
		},
	];
	return (
		<div className="max-w-7xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="p-4 rounded shadow-md">
					<h2 className="text-xl font-semibold">Revenue</h2>
					<p className="text-2xl ">$5000</p>
				</div>
				<div className="p-4 rounded shadow-md">
					<h2 className="text-xl font-semibold">Total Orders</h2>
					<p className="text-2xl ">500</p>
					<Link
						to="/admin/orders"
						className="text-blue-500 hover:underline"
					>
						Manage Orders
					</Link>
				</div>
				<div className="p-4 rounded shadow-md">
					<h2 className="text-xl font-semibold">Total Products</h2>
					<p className="text-2xl ">300</p>
					<Link
						to="/admin/Products"
						className="text-blue-500 hover:underline"
					>
						Manage Products
					</Link>
				</div>
			</div>
			<div className="mt-6">
				<h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
				<div className="overflow-x-auto">
					<table className="w-full text-left text-gray-500">
						<thead className="bg-gray-100 text-xs uppercase text-gray-700">
							<tr>
								<th className="px-4 py-3">Order ID</th>
								<th className="px-4 py-3">User</th>
								<th className="px-4 py-3">Total Price</th>
								<th className="px-4 py-3">Status</th>
							</tr>
						</thead>
						<tbody>
							{orders.length > 0 ? (
								orders.map((order) => (
									<tr
										key={order._id}
										className="border-b hover:bg-gray-50 cursor-pointer"
									>
										<td className="p-4">{order._id}</td>
										<td className="p-4">
											{order.user.name}
										</td>
										<td className="p-4">
											${order.totalPrice}
										</td>
										<td className="p-4">{order.status}</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={4}
										className="p-4 text-center text-gray-500"
									>
										No orders found.
									</td>
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
