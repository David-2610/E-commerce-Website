import { Link } from "react-router";

const ProductManagement = () => {
	const Products = [
		{
			_id: 12344,
			name: "Shirt",
			price: 20,
			sku: "123456789",
		},
		{
			_id: 22434,
			name: "Pants",
			price: 30,
			sku: "987654321",
		},
		{
			_id: 33456,
			name: "Shoes",
			price: 40,
			sku: "123456789",
		},
		{
			_id: 46434,
			name: "Hat",
			price: 15,
			sku: "987654321",
		},
		{
			_id: 54653,
			name: "Jacket",
			price: 50,
			sku: "123456789",
		},
	];

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete the product ? ")) {
			console.log("Delete Product with id :", id);
		}
	};
	return (
		<div className="max-w-7xl mx-auto p-6 ">
			<h2 className="text-2xl font-bold mb-6">Product Management </h2>
			<div className="overflow-x-auto shadow-md sm:rounded-lg">
				<table className="min-w-full  text-left text-gray-500">
					<thead className="text-xs text-gray-100 uppercase bg-gray-700 ">
						<tr>
							<th scope="col" className="px-3 py-3">
								Name
							</th>
							<th scope="col" className="px-3 py-3">
								Price
							</th>
							<th scope="col" className="px-3 py-3">
								SKU
							</th>
							<th scope="col" className="px-3 py-3">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{Products.length > 0 ? (
							Products.map((product) => (
								<tr
									key={product._id}
									className="border-b hover:bg-gray-50 cursor-pointer"
								>
									<td className="p-4 font-medium text-gray-900 whitespace-nowrap">
										{product.name}
									</td>
									<td className="p-4">{product.price}</td>
									<td className="px-3 py-4">{product.sku}</td>
									<td className="px-3 py-4">
										<Link
											to={`/admin/products/${product._id}/edit`}
											className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
										>
											Edit
										</Link>
										<button
											onClick={() =>
												handleDelete(product._id)
											}
                                            className="bg-red-500 text-white px-2 py-1  rounded hover:bg-red-600"
										>
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={4} className="text-center text-gray-500 p-4">
									No products available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProductManagement;
