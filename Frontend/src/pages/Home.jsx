import React, { useState, useEffect } from "react";
import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import Featuresection from "../components/Products/Featuresection";
import Gendercoll from "../components/Products/Gendercoll";
import New_arival from "../components/Products/New_arival";
import Productdetail from "../components/Products/productdetail";
import ProductGrid from "../components/Products/productgrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import axios from "axios";

const Home = () => {
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector((state) => state.products);
	const [bestSellerProduct, setBestSellerProduct] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch products
				await dispatch(
					fetchProductsByFilters({
						gender: "Women",
						category: "Top Wear",
						limit: 8,
					})
				);

				// Fetch best seller
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
				);
				setBestSellerProduct(response.data[0]);
			} catch (error) {
				console.error("Error loading homepage data:", error);
			}
		};

		fetchData();
	}, [dispatch]);

	return (
		<div>
			<Hero />
			<Gendercoll />
			<New_arival />

			<h2 className="text-3xl text-center font-bold mb-4">Best Sellers</h2>

			{bestSellerProduct ? (
				<Productdetail productId={bestSellerProduct._id} />
			) : (
				<p className="text-center">Loading Best Seller Products...</p>
			)}

			<div className="container mx-auto">
				<h2 className="text-3xl text-center font-bold mb-4">
					Top Wear For Women
				</h2>
				<ProductGrid products={products} loading={loading} error={error} />
			</div>

			<FeaturedCollection />
			<Featuresection />
		</div>
	);
};

export default Home;
