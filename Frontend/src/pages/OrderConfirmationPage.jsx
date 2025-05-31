const Checkout = {
	_id: "12345",
	createdAT: new Date(),
	checkoutItems: [
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
	shippringAddress: {
		Address: "123 Main St",
		City: "Springfield",
		PostalCode: "12345",
		Country: "USA",
	},
};

const OrderConfirmationPage = () => {
	return (
		<div className="max-w-4xl mx-auto p-6 bg-white">
			<h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
				Thank You For Your Order!
			</h1>

			{Checkout && (
				<div className="border rounded-lg p-6">
					<div className="mb-20 justify-between flex">
						<div>
							<h2 className="text-2xl font-semibold ">
							</h2>
							<p className="text-gray-500">
								Order Date :{" "}
								{new Date(
									Checkout.createdAT
								).toLocaleDateString()}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default OrderConfirmationPage;
