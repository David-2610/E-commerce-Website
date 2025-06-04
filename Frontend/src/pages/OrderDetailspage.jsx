import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const OrderDetailspage = () => {
	const { id } = useParams();

	const [orderDetails, setOrderDetails] = useState(null);

	useEffect(() => {
		const mockorderDeatils = {
			_id: id,
			CreatedAt: new Date(),
			isPaid: true,
			isDelivered: false,
			paymentMethod: "Credit Card",
			shippingmethod: "Standard",
			shippingaddress: {
				Address: "123 Main St",
				City: "Springfield",
				PostalCode: "12345",
				Country: "USA",
			},
			OrderItems: [
				{
					productId: 1,
					productName: "T-shirt",
					productPrice: 999,
					productImage: "https://picsum.photos/200?random=1",
					productQuantity: 2,
					size: "M",
					color: "Red",
				},
				{
					productId: 2,
					productName: "Jeans",
					productPrice: 1999,
					productImage: "https://picsum.photos/200?random=2",
					productQuantity: 1,
					size: "L",
					color: "Blue",
				},
				{
					productId: 3,
					productName: "Sneakers",
					productPrice: 2999,
					productImage: "https://picsum.photos/200?random=3",
					productQuantity: 1,
					size: "9",
					color: "Black",
				},
				{
					productId: 4,
					productName: "Jacket",
					productPrice: 3999,
					productImage: "https://picsum.photos/200?random=4",
					productQuantity: 1,
					size: "XL",
					color: "Green",
				},
			],
		};
		setOrderDetails(mockorderDeatils);
	}, [id]);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6">
			<h2 className="text-2xl font-bold mb-6 md:text-3xl">
				Order Details
			</h2>
			{!orderDetails ? (
				<p>No Order Details Found </p>
			) : (
				<div className=" p-4 sm:p-6 rounded-lg border ">
					{/* order info  */}
					<div className="flex sm:flex-row flex-col justify-between mb-8">
						<div>
							<h3 className="text-lg md:text-lg  font-semibold ">
								Order Id : {orderDetails._id}
							</h3>
							<p className="text-gray-600">
								{new Date(
									orderDetails.CreatedAt
								).toLocaleDateString()}
							</p>
						</div>
						<div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
							<span
								className={`${
									orderDetails.isPaid
										? "text-green-700 bg-green-100"
										: "bg-red-100 text-red-600"
								} font-medium px-3 py-1 rounded-full text-sm mb-2`}
							>
								{orderDetails.isPaid ? "Aproved" : "Pending"}
							</span>
							<span
								className={`${
									orderDetails.isDelivered
										? "text-green-700 bg-green-100"
										: "bg-yellow-100 text-yellow-600"
								} font-medium px-3 py-1 rounded-full text-sm mb-2`}
							>
								{orderDetails.isPaid ? "Delivered" : "Pending"}
							</span>
						</div>
					</div>
					{/* customer payment and shipping oinfo*/}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 md:grid-cols-3">
						<div>
							<h4 className="text-lg font-semibold mb-2">
								Payment Info
							</h4>
                            <p>Payment Method : {orderDetails.paymentMethod}</p>
                            <p>Status : {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
						</div>

                        <div>
                            <h4 className="text-lg font-semibold mb-2">Shipping Info </h4>
                            <p>Shipping Method : {orderDetails.shippingmethod}</p>
                            <p>Address: {`${orderDetails.shippingaddress.Address}, ${orderDetails.shippingaddress.City}, ${orderDetails.shippingaddress.PostalCode}, ${orderDetails.shippingaddress.Country}`}</p>
                        </div>
					</div>
					{/* order items */}
					<div className="overflow-x-auto">
						<h4 className="text-lg font-semibold mb-4">Products</h4>
						<table className="min-w-full text-gray-600 mb-4">
							<thead className="bg-gray-100">
								<tr>
									<th className="py-2 px-4 ">Name</th>
									<th className="py-2 px-4 ">Price</th>
									<th className="py-2 px-4 ">Quantity</th>
                                    <th className="py-2 px-4 ">Total</th>
                                    </tr>
							</thead>
							<tbody>
                                {orderDetails.OrderItems.map((item) => (
                                    <tr key={item.productId} className="border-b text-center">
                                        <td className="py-2 px-4 flex items-center">
                                            <img
                                                src={item.productImage}
                                                alt={item.productName}
                                                className="w-12 h-12 object-cover rounded-lg mr-4"
                                            />
                                            <Link to={`/product/${item.productId}`} className="hover:underline text-blue-500">
                                            {item.productName}
                                            </Link>
                                        </td>
                                        <td className="py-2 px-4 ">
                                            ${item.productPrice}
                                        </td>
                                        <td className="py-2 px-4">
                                            {item.productQuantity}
                                        </td>
                                        <td className="py-2 px-4">
                                            ${(item.productPrice * item.productQuantity)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Link to ="/my-orders" className=" text-blue-500 hover:underline">Back to My Orders</Link>
				</div>
			)}
		</div>
	);
};

export default OrderDetailspage;
