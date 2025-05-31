import { useState } from "react";
import { useNavigate } from "react-router";
import Paypalbutton from "./paypalbutton";

const cart = {
	products: [
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
	totalprice: 21343
};

const Checkout = () => {
	const navigate = useNavigate();
	const [CheckoutID, setCheckoutID] = useState(0);
	const [ShippingAddress, setShippingAddress] = useState({
		firstname: "",
		lastname: "",
		phone: "",
		address: "",
		city: "",
		postalcode: "",
		country: "",
	});

	const handlecreatecheckout = (e) => {
		e.preventDefault(); // Fix typo
		setCheckoutID("1234567890"); // Correct state update
	};
	const handlepaymentSuccess = (details) => {
		console.log("Payment Successful", details);
		navigate("/order-confirmation");
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
			{/* Left Section */}

			<div className="bg-white rounded-lg p-6 ">
				<h2 className="text-2xl uppercase mb-6 ">Checkout</h2>
				<form onSubmit={handlecreatecheckout}>
					<h3 className="text-lg mb-4 ">Contact Details</h3>
					<div className="mb-4 ">
						<label className="block text-gray-700">Email</label>

						<input
							type="email"
							value="user@example.com"
							className="w-full  p-2 border  rounded"
							disabled
						/>
					</div>
					<h3 className="text-lg mb-4 ">Delivery</h3>
					<div className="mb-4 grid-cols-2 grid gap-4 ">
						<div>
							<label className="block text-gray-700">
								First Name
							</label>

							<input
								type="text"
								value={ShippingAddress.firstname}
								onChange={(e) =>
									setShippingAddress({
										...ShippingAddress,
										firstname: e.target.value,
									})
								}
								className="w-full  p-2 border  rounded"
								required
							/>
						</div>
						<div>
							<label className="block text-gray-700">
								Last Name
							</label>

							<input
								type="text"
								value={ShippingAddress.lastname}
								onChange={(e) =>
									setShippingAddress({
										...ShippingAddress,
										lastname: e.target.value,
									})
								}
								className="w-full  p-2 border  rounded"
								required
							/>
						</div>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Address</label>
						<input
							type="text"
							value={ShippingAddress.address}
							onChange={(e) =>
								setShippingAddress({
									...ShippingAddress,
									address: e.target.value,
								})
							}
							className="w-full  p-2 border  rounded"
							required
						/>
					</div>
					<div className="mb-4 grid-cols-2 grid gap-4 ">
						<div>
							<label className="block text-gray-700">City</label>

							<input
								type="text"
								value={ShippingAddress.city}
								onChange={(e) =>
									setShippingAddress({
										...ShippingAddress,
										city: e.target.value,
									})
								}
								className="w-full  p-2 border  rounded"
								required
							/>
						</div>
						<div>
							<label className="block text-gray-700">
								Postal Code
							</label>

							<input
								type="text"
								value={ShippingAddress.postalcode}
								onChange={(e) =>
									setShippingAddress({
										...ShippingAddress,
										postalcode: e.target.value,
									})
								}
								className="w-full  p-2 border  rounded"
								required
							/>
						</div>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Country</label>
						<input
							type="text"
							value={ShippingAddress.country}
							onChange={(e) =>
								setShippingAddress({
									...ShippingAddress,
									country: e.target.value,
								})
							}
							className="w-full  p-2 border  rounded"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Phone No.</label>
						<input
							type="text"
							value={ShippingAddress.phone}
							onChange={(e) =>
								setShippingAddress({
									...ShippingAddress,
									phone: e.target.value,
								})
							}
							className="w-full  p-2 border  rounded"
							required
						/>
					</div>
					<div className="mt-6">
						{!CheckoutID ? (
							<button
								type="submit"
								className="w-full bg-black text-white py-3 rounded"
							>
								Continue To Payment
							</button>
						) : (
							<div>
								<h3 className="text-lg mb-4">
									Pay with Paypal
								</h3>
								<Paypalbutton
									amount={100}
									onSuccess={handlepaymentSuccess}
									onError={(err) =>
										alert("Payment Failed . Try Again.")
									}
								/>
							</div>
						)}
					</div>
				</form>
			</div>
			<div className="bg-gray-50 p-6 rounded-lg">
				<h3 className="text-lg mb-4 ">Order Summary</h3>
				<div className="border-t py-4 mb-4">
					{cart.products.map((product, index) => (
						<div
							key={index}
							className="flex items-center justify-between border-b py-2"
						>
							<div className="flex items-start">
								<img
									src={product.productImage}
									alt={product.productName}
									className="w-20 h-24 object-cover rounded mr-4"
								/>
								<div>
									<h3 className="text-md">
										{product.productName}
									</h3>
									<p className="text-gray-500">
										Size: {product.size}
									</p>
									<p className="text-gray-500">
										Color: {product.color}
									</p>
								</div>
							</div>
									<p className="text-xl">
										${product.productPrice?.toLocaleString()}
									</p>
						</div>
					))}
				</div>
				<div className="flex items-center justify-between text-lg mb-4">
					<p>Subtotal</p>
					<p>${cart.totalprice?.toLocaleString()}</p>
				</div>
				<div className="flex items-center justify-between text-lg ">
					<p>Shipping</p>
					<p>Free</p>
				</div>
				<div className="flex items-center justify-between text-lg mt-4 pt-4 border-t">
				<p>Total</p>
				<p>${cart.totalprice?.toLocaleString()}</p>	
				</div>
			</div>
		</div>
	);
};

export default Checkout;
