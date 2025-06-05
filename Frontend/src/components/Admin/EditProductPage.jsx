import React, { useState } from "react";

const EditProductPage = () => {
	const [productData, setProductData] = useState({
		name: "",
		description: "",
		price: "",
		CountInstock: "",
		category: "",
		sku: "",
		sizes: [],
		color: [],
		collection: "",
		material: "",
		brand: "",
		gender: "",
		images: [
			{
				url: "https://picsum.photos/200?random=1",
			},
			{
				url: "https://picsum.photos/200?random=2",
			},
			{
				url: "https://picsum.photos/200?random=3",
			},
		],
	});
	const handleProductData = (e) => {
		const { name, value } = e.target;
		setProductData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	const handleimageProductData = async (e) => {
		const files = e.target.files;
		console.log(files);

		// const images = Array.from(files).map((file) => ({
		//     url: URL.createObjectURL(file),
		// }));
		// setProductData((prevData) => ({
		//     ...prevData,
		//     images: [...prevData.images, ...images],
		// }));
	};
    const handleonSubmit = async (e) => {
		e.preventDefault();
		console.log(productData);
	};

	return (
		<div className="max-w-5xl mx-auto p-6 shadow rounded ">
			<h2 className="text-3xl font-bold mb-6">Edit Product</h2>
			<form onSubmit={handleonSubmit}>
				<div className="mb-6">
					<label className="block font-semibold mb-2 ">
						Product Name
					</label>
					<input
						type="text"
						name="name"
						value={productData.name}
						onChange={handleProductData}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				{/*------------------------------------------------------------------------  */}
				<div className="mb-6">
					<label className="block font-semibold mb-2 ">
						Description
					</label>
					<textarea
						name="description"
						value={productData.description}
						onChange={handleProductData}
						className="w-full p-2 border border-gray-300 rounded-md"
						rows={4}
						required
					></textarea>
				</div>
				{/*------------------------------------------------------------------------  */}
				<div className="mb-6">
					<label className="block font-semibold mb-2 ">Price</label>
					<input
						type="number"
						name="price"
						value={productData.price}
						onChange={handleProductData}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				{/*------------------------------------------------------------------------  */}
				<div className="mb-6">
					<label className="block font-semibold mb-2 ">
						CountInStock
					</label>
					<input
						type="number"
						name="CountInstock"
						value={productData.CountInstock}
						onChange={handleProductData}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				{/*------------------------------------------------------------------------  */}
				<div className="mb-6">
					<label className="block font-semibold mb-2 ">SKU</label>
					<input
						type="number"
						name="sku"
						value={productData.sku}
						onChange={handleProductData}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				{/*------------------------------------------------------------------------  */}
				<div className="mb-6">
					<label className="block font-semibold mb-2 ">
						Sizes(comma - separated)
					</label>
					<input
						type="text"
						name="sizes"
						value={productData.sizes.join(", ")}
						onChange={(e) =>
							setProductData({
								...productData,
								sizes: e.target.value
									.split(", ")
									.map((size) => size.trim()),
							})
						}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				{/*------------------------------------------------------------------------  */}
				<div className="mb-6">
					<label className="block font-semibold mb-2 ">
						Colours(comma - separated)
					</label>
					<input
						type="text"
						name="color"
						value={productData.color.join(", ")}
						onChange={(e) =>
							setProductData({
								...productData,
								color: e.target.value
									.split(", ")
									.map((color) => color.trim()),
							})
						}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				{/*------------------------------------------------------------------------  */}
				<div className="mb-6">
					<label className="block font-semibold mb-2 ">
						Upload Image
					</label>
					<input type="file" onChange={handleimageProductData} />
					<div className="flex gap-4 md-4 ">
						{productData.images.map((image, index) => (
							<img
								key={index}
								src={image.url}
								alt={`Product Image ${index}`}
								className="w-20 h-20 object-cover shadow-md rounded-md"
							/>
						))}
					</div>
				</div>
				{/*------------------------------------------------------------------------  */}
				<button
					type="submit"
					className="w-full bg-green-500 text-white rounded-md py-2 hover:bg-green-600 transition-colors duration-100 "
				>
					Update Product
				</button>
			</form>
		</div>
	);
};

export default EditProductPage;
