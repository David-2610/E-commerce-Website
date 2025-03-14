import { useEffect, useState } from "react";
import { toast } from "sonner";
import Productgrid from "./productgrid";
const selectedproduct = {
	name: "stylish jacket",
	price: 1000,
	description: "this is a stylish jacket",
	orignalprice: 2000,
	brand: "Nike",
	material: "Cotton",
	size: ["small", "medium", "large"],
	color: ["red", "blue", "green"],
	images: [
		{
			url: "https://picsum.photos/500/500?/random?image=1",
			alt: "product image 1",
		},
		{
			url: "https://picsum.photos/500/500?/random?image=2",
			alt: "product image 2",
		},
		{
			url: "https://picsum.photos/500/500?/random?image=3",
			alt: "product image 3",
		},
		{
			url: "https://picsum.photos/500/500?/random?image=4",
			alt: "product image 4",
		},
		{
			url: "https://picsum.photos/500/500?/random?image=5",
			alt: "product image 5",
		},
		{
			url: "https://picsum.photos/500/500?/random?image=6",
			alt: "product image 6",
		},
	],
};
const similarproducts = [
	{
		_id: 1,
		name: "product1",
		price: 1000,
		images: [
			{
				url: "https://picsum.photos/500/500?/random?image=1",
				alt: "product image 1",
			},
		],
	},
	{
		_id: 2,
		name: "product2",
		price: 1000,
		images: [
			{
				url: "https://picsum.photos/500/500?/random?image=2",
				alt: "product image 2",
			},
		],
	},
	{
		_id: 3,
		name: "product3",
		price: 1000,
		images: [
			{
				url: "https://picsum.photos/500/500?/random?image=3",
				alt: "product image 3",
			},
		],
	},
	{
		_id: 4,
		name: "product4",
		price: 1000,
		images: [
			{
				url: "https://picsum.photos/500/500?/random?image=4",
				alt: "product image 4",
			},
		],
	},
	// {
	// 	_id: 5,
	// 	name: "product5",
	// 	price: 1000,
	// 	images:[{
	// 		url: "https://picsum.photos/500/500?/random?image=5",
	// 		alt: "product image 5",
	// 	}]
	// },
	// {
	// 	_id: 6,
	// 	name: "product6",
	// 	price: 1000,
	// 	images:[{
	// 		url: "https://picsum.photos/500/500?/random?image=6",
	// 		alt: "product image 6",
	// 	}]
	// }

];

const Productdetails = () => {
	const [mainimage, setMainimage] = useState("T");
	const [selectedsize, setSelectedsize] = useState("T");
	const [selectedcolor, setSelectedcolor] = useState("T");
	const [quantity, setQuantity] = useState(1);
	const [isbuttondisabled, setIsbuttondisabled] = useState(false);

	useEffect(() => {
		if (selectedproduct?.images?.length > 0) {
			setMainimage(selectedproduct.images[0].url);
		}
	}, [selectedproduct]);

	const handleAddToCart = () => {
		if (!selectedsize || !selectedcolor) {
			toast.error("Please select size and color", {
				duration: 1000,
			});
			return;
		}
		setIsbuttondisabled(true);
		setTimeout(() => {
			toast.success("Product added to cart", {
				duration: 1000,
			});
			setIsbuttondisabled(false);
		}, 500);
	};

	return (
		<div className="p-6">
			<div className="max-x-6xl mx-auto bg-white rounded-lg">
				<div className="flex flex-col md:flex-row">
					{/* thumbnails */}
					<div className="hidden md:flex flex-col space-y-4 mr-6">
						{selectedproduct.images.map((images, index) => (
							<img
								src={images.url}
								alt={images.alt || `Thumbnail ${index}`}
								key={index}
								onClick={() => setMainimage(images.url)}
								className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
									mainimage === images.url
										? "border-black"
										: "border-gray-300"
								}`}
							/>
						))}
					</div>
					{/* main image */}
					<div className="md:w-1/2">
						<div className="mb-4">
							<img
								src={mainimage}
								alt="Main Product"
								className="w-full h-auto object-cover rounded-lg "
							/>
						</div>
					</div>
					{/* {Mobile Thumbnail} */}
					<div className="md:hidden flex overflow-x-scroll space-x-4 mb-4 ">
						{selectedproduct.images.map((images, index) => (
							<img
								src={images.url}
								alt={images.alt || `Thumbnail ${index}`}
								key={index}
								onClick={() => setMainimage(images.url)}
								className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
									mainimage === images.url
										? "border-black"
										: "border-gray-300"
								}`}
							/>
						))}
					</div>
					{/* Product Information */}
					<div className="md:w-1/2 md:ml-10">
						<h1 className="text-2xl md:text-3xl font-semibold mb-2">
							{selectedproduct.name}
						</h1>
						<p className="text-lg text-gray-600 mb-1 line-through">
							{selectedproduct.orignalprice &&
								`₹${selectedproduct.orignalprice}`}
						</p>
						<p className="text-xl text-gray-500 mb-2">
							$ {selectedproduct.price}
						</p>
						<p className="text-gray-600 mb-4">
							{selectedproduct.description}
						</p>
						{/* colour selection */}
						<div className=" mb-4">
							<p className="text-gray-700 mr-2">Colour:</p>
							<div className="flex gap-2 mt-2">
								{selectedproduct.color.map((color) => (
									<button
										key={color}
										className={`w-8 h-8 rounded-full border ${
											selectedcolor === color
												? "border-4 border-black"
												: "border-gray-300"
										} `}
										onClick={() => setSelectedcolor(color)}
										style={{
											backgroundColor:
												color.toLocaleLowerCase(),
											filter: "brightness(0.5)",
										}}
									></button>
								))}
							</div>
							{/* size selection */}
						</div>
						<div className="mb-4">
							<p className="text-gray-700">Size:</p>
							<div className="flex gap-2 mt-2">
								{selectedproduct.size.map((size) => (
									<button
										key={size}
										className={`px-4 py-2 rounded-lg border ${
											selectedsize === size
												? "border-2 border-black"
												: "border-gray-300"
										}`}
										onClick={() => setSelectedsize(size)}
									>
										{size}
									</button>
								))}
							</div>
							{/* quantity selection */}
						</div>
						<div className="mb-6">
							<p className="text-gray-700">Quantity:</p>
							<div className="flex items-center space-x-4 mt-2">
								<button
									className="px-4 py-2 rounded bg-gray-200 text-lg "
									onClick={() => {
										if (quantity > 1)
											setQuantity(quantity - 1);
									}}
								>
									-
								</button>
								<span className="text-lg">{quantity}</span>
								<button
									className="px-4 py-2 rounded bg-gray-200 text-lg"
									onClick={() => {
										setQuantity(quantity + 1);
									}}
								>
									+
								</button>
							</div>
						</div>
						<button
							onClick={handleAddToCart}
							disabled={isbuttondisabled}
							className={`bg-black text-white py-2 px-6 rounded-lg w-full mb-4 ${
								isbuttondisabled
									? "cursor-not-allowed opacity-50"
									: "hover:bg-gray-900"
							}`}
						>
							{isbuttondisabled ? "Adding..." : "ADD TO CART"}
						</button>
						{/* other descriptions */}
						<div className="mt-10 text-gray-700">
							<h3 className=" text-xl font-bold mb-4">
								Characteristic:
							</h3>
							<table className="w-full text-left text-sm text-gray-600 ">
								<tbody>
									<tr className="border-b">
										<th className="py-2">Brand</th>
										<td className="py-2">
											{selectedproduct.brand}
										</td>
									</tr>
									<tr className="border-b">
										<th className="py-2">Material</th>
										<td className="py-2">
											{selectedproduct.material}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				{/* You may also like */}
				<div className=" mt-20">
					<h2 className="text-2xl text-center font-medium mb-4">
						You May Also Like
					</h2>
					<Productgrid Products={similarproducts} />
				</div>
				
			</div>
		</div>
	);
};

export default Productdetails;
