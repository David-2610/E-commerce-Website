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
	shippingAddress: {
		Address: "123 Main St",
		City: "Springfield",
		PostalCode: "12345",
		Country: "USA",
	},
};

const calculateEstimateDelivery = (createdAt) => {
	const Orderdate = new Date(createdAt);
	Orderdate.setDate(Orderdate.getDate() + 10); // Adding 7 days for estimated delivery
	return Orderdate.toLocaleDateString();
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
								Order ID : {Checkout._id}
							</h2>
							<p className="text-gray-500">
								Order date :
								{new Date(
									Checkout.createdAT
								).toLocaleDateString()}
							</p>
						</div>
						<div>
							<p className="text-emerald-700 text-sm ">
								Estimated Delivery :
								{calculateEstimateDelivery(Checkout.createdAT)}
							</p>
						</div>
					</div>
					<div className="mb-20 ">
						{Checkout.checkoutItems.map((item) => (
							<div
								key={item.productId}
								className="flex items-center  mb-4"
							>
								<img
									src={item.productImage}
									alt={item.productName}
									className="w-16 h-16 object-cover rounded-md mr-4"
								/>
								<div>
									<h4 className="text-mb font-semibold">
										{item.productName}
									</h4>
									<p className="text-sm text-gray-500">
										{item.size} | {item.color}
									</p>
								</div>
								<div className="ml-auto text-right">
									<p className="text-nd ">
										{" "}
										${item.productPrice.toLocaleString()}
									</p>
									<p className="text-sm text-gray-500">
										Quantity: {item.productQuantity}
									</p>
								</div>
							</div>
						))}
					</div>
          <div className="grid grid-cols-2 gap-8  ">
            <div>
              <h4 className="text-lg font-semibold mb-2"> Payment </h4>
              <p className="text-gray-600">PayPal</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Delivery
              </h4>
              <p className="text-gray-600">
                {Checkout.shippingAddress.Address}
              </p>
              <p className="text-gray-600">
                {Checkout.shippingAddress.City},{" "}
                {Checkout.shippingAddress.PostalCode},{" "}
                {Checkout.shippingAddress.Country}
              </p>
            </div>
          </div>
				</div>
			)}
		</div>
	);
};

export default OrderConfirmationPage;
