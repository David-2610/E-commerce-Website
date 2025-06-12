import react , { useState } from "react";
import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import Featuresection from "../components/Products/Featuresection";
import Gendercoll from "../components/Products/Gendercoll";
import New_arival from "../components/Products/New_arival";
import Productdetail from "../components/Products/productdetail";
import ProductGrid from "../components/Products/productgrid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

import axios from "axios";

const Home = () => {
	const dispatch = useDispatch();
	const { products , loading, error} = useSelector((state) => state.products);
	const [bestSellerProduct, setBestSellerProduct] = useState(null);

	useEffect(() => {
		// fetch product for a specific collection
		dispatch(
			fetchProductsByFilters({
				gender: "Women",
				category: "Top Wear",
				limit: 8,
			})
		);
		// fetch the best seller product
		const fetchBestSeller = async () => {
			try {
				const response = await axios.get(
					`${
						import.meta.env.VITE_BACKEND_URL
					}/api/products/best-seller`
				);
				setBestSellerProduct(response.data[0]);
			} catch (error) {
				console.error(error);
			}
		};7
		fetchBestSeller();
	
	}, [dispatch]);
	return (
		<div>
			<Hero />
			<Gendercoll />
			<New_arival />

			<h2 className="text-3xl text-center font-bold mb-4">
				Best Sellers
			</h2>

			{bestSellerProduct ? (
				<Productdetail productId={bestSellerProduct._id} />
			) : (
				<p className="text-center">Loading Best Seller Products...</p>
			)}
			<div className="container mx-auto ">
				<h2 className=" text-3xl text-center font-bold mb-4">
					Top Wear For Womens
				</h2>
				<ProductGrid products={products} loading={loading} error={error} />
			</div>
				<FeaturedCollection />
				<Featuresection />
		</div>
	);
};

export default Home;

