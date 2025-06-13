import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	deleteProduct,
	fetchAdminProducts,
} from "../../redux/slices/adminProductSlice";

function ProductManagement() {
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector(
		(state) => state.adminProducts
	);

	useEffect(() => {
		dispatch(fetchAdminProducts());
	}, [dispatch]);

	const handleProductDelete = (id) => {
		if (window.confirm("Are your sure you want to delete this product?")) {
			dispatch(deleteProduct(id));
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="max-w-7xl mx-auto p-6">
			<h2 className="text-2xl font-bold mb-6">All Products</h2>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold">All Products</h2>
				<Link
					to="/admin/products/add"
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
				>
					+ Add Product
				</Link>
			</div>

			<div className="overflow-x-auto shadow-md sm:rounded-lg">
				<table className="min-w-full text-left text-gray-500">
					<thead className="bg-gray-100 text-xs uppercase text-gray-700">
						<tr>
							<th className="px-3 py-4">S.No</th>
							{/* 👈 New column */}
							<th className="px-3 py-4">Name</th>
							<th className="px-3 py-4">Price</th>
							<th className="px-3 py-4">SKU</th>
							<th className="px-3 py-4">Actions</th>
						</tr>
					</thead>
					<tbody>
						{products.length > 0 ? (
							products.map((product, index) => (
								<tr
									key={product._id}
									className="border-b hover:bg-gray-50"
								>
									<td className="p-4">{index + 1}</td>
									{/* 👈 Serial number */}
									<td className="p-4 text-medium text-gray-900 whitespace-nowrap">
										{product.name}
									</td>
									<td className="p-4">${product.price}</td>
									<td className="p-4">{product.sku}</td>
									<td className="p-4">
										<Link
											to={`/admin/products/${product._id}/edit`}
											className="bg-yellow-300 text-white px-2 py-2 hover:bg-yellow-400 rounded mr-2"
										>
											Edit
										</Link>
										<button
											onClick={() =>
												handleProductDelete(product._id)
											}
											className="bg-red-500 text-white px-2 py-2 hover:bg-red-600 rounded"
										>
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={5}
									className="p-4 text-center text-gray-500"
								>
									No Products found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ProductManagement;
