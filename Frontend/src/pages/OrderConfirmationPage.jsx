import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { clearCart } from "../redux/slices/cartSlice";

const OrderConfirmationPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { checkout } = useSelector((state) => state.checkout);

	//clear the cart when the order is confirmed
	useEffect(() => {
		if (checkout && checkout._id) {
			dispatch(clearCart());
			localStorage.removeItem("cart");
		} else {
			navigate("/my-orders");
		}
	}, [checkout, dispatch, navigate]);

	const calculateEstimatedDelivery = (createdAt) => {
		const orderDate = new Date(createdAt);
		orderDate.setDate(orderDate.getDate() + 10);
		return orderDate.toLocaleDateString();
	};
	return (
		<div className="max-w-4xl mx-auto p-6 bg-white">
			<h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
				Thank You For Your Order!
			</h1>

			{checkout && (
				<div className="border rounded-lg p-6">
					<div className="mb-20 justify-between flex">
						<div>
							<h2 className="text-2xl font-semibold ">
								Order ID : {checkout._id}
							</h2>
							<p className="text-gray-500">
								Order date :
								{new Date(
									checkout.createdAt
								).toLocaleDateString()}
							</p>
						</div>
						<div>
							<p className="text-emerald-700 text-sm ">
								Estimated Delivery :
								{calculateEstimatedDelivery(checkout.createdAt)}
							</p>
						</div>
					</div>
					<div className="mb-20 ">
						{checkout.checkoutItems.map((item) => (
							<div
								key={item.productId}
								className="flex items-center  mb-4"
							>
								<img
									src={item.image}
									alt={item.name}
									className="w-16 h-16 object-cover rounded-md mr-4"
								/>
								<div>
									<h4 className="text-mb font-semibold">
										{item.name}
									</h4>
									<p className="text-sm text-gray-500">
										{item.size} | {item.color}
									</p>
								</div>
								<div className="ml-auto text-right">
									<p className="text-nd ">
										{" "}
										${item.price.toLocaleString()}
									</p>
									<p className="text-sm text-gray-500">
										Quantity: {item.quantity}
									</p>
								</div>
							</div>
						))}
					</div>
					<div className="grid grid-cols-2 gap-8  ">
						<div>
							<h4 className="text-lg font-semibold mb-2">
								{" "}
								Payment{" "}
							</h4>
							<p className="text-gray-600">PayPal</p>
						</div>
						<div>
							<h4 className="text-lg font-semibold mb-2">
								Delivery
							</h4>
							<p className="text-gray-600">
								{checkout.shippingAddress.address}
							</p>
							<p className="text-gray-600">
								{checkout.shippingAddress.city},{" "}
								{checkout.shippingAddress.postalCode},{" "}
								{checkout.shippingAddress.country}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default OrderConfirmationPage;
