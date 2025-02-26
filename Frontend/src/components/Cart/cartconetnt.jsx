import { RiDeleteBin3Line } from "react-icons/ri";

const cartconetnt = () => {
	const cartproduct = [
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
		{
			productId: 5,
			productName: "Cap",
			productPrice: 499,
			productImage: "https://picsum.photos/200?random=5",
			productQuantity: 3,
			size: "One Size",
			color: "Yellow",
		},
		{
			productId: 6,
			productName: "Hoodie",
			productPrice: 2499,
			productImage: "https://picsum.photos/200?random=6",
			productQuantity: 2,
			size: "L",
			color: "Gray",
		},
		{
			productId: 7,
			productName: "Socks",
			productPrice: 299,
			productImage: "https://picsum.photos/200?random=7",
			productQuantity: 5,
			size: "Free Size",
			color: "White",
		},
		{
			productId: 8,
			productName: "Shorts",
			productPrice: 799,
			productImage: "https://picsum.photos/200?random=8",
			productQuantity: 4,
			size: "M",
			color: "Navy Blue",
		},
		{
			productId: 9,
			productName: "Watch",
			productPrice: 4999,
			productImage: "https://picsum.photos/200?random=9",
			productQuantity: 1,
			size: "Adjustable",
			color: "Black",
		},
		{
			productId: 10,
			productName: "Sweater",
			productPrice: 3499,
			productImage: "https://picsum.photos/200?random=10",
			productQuantity: 2,
			size: "L",
			color: "Brown",
		},
	];

	return (
		<div>
			{cartproduct.map((product, index) => {
				return <div
					key={index}
					className="flex items-start justify-between py-4 border-b"
				>
					<div className="flex items-center">
						<img
							src={product.productImage}
							alt={product.productName}
							className="w-20 h-24 object-cover mr-4 rounded  "
						/>
						<div className="">
							<h3>{product.productName}</h3>
							<p className="text-sm text-gray-500">
								Size: {product.size} | Color: {product.color}
							</p>
							<div className="flex items-center mt-2">
								<button className="border rounded border-gray-300  px-2 py-1/2 text-xl font-medium ">
									-
								</button>
                <span className="mx-4">{product.productQuantity}</span>
								<button className="border rounded border-gray-300  px-2 py-1/2 text-xl font-medium ">
									+
								</button>
							</div>
						</div>
					</div>
          <div className="flex flex-col items-center">
            <p>$ {product.productPrice.toLocaleString()}</p>
            <button>
              <RiDeleteBin3Line className="h-6 w-6 text-red-500"/>
            </button>
          </div>
				</div>;
			})}
		</div>
	);
};

export default cartconetnt;
