import { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa6";
import Filtersidebar from "../components/Products/Filtersidebar";
import SortOptions from "../components/Products/SortOptions";
import Productgrid from "../components/Products/productgrid";
const CollectionPage = () => {
	const [products, setProducts] = useState([]);

	const sidebarRef = useRef(null);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	const handleClickOutside = (e) => {
		if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
			setIsSidebarOpen(false);
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
		    document.removeEventListener("mousedown", handleClickOutside);
		}
	},[]);

	useEffect(() => {
		// Fetch products from the backend
		setTimeout(() => { 
			const fetchProducts = [
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
				{
					_id: 5,
					name: "product5",
					price: 1000,
					images: [
						{
							url: "https://picsum.photos/500/500?/random?image=5",
							alt: "product image 5",
						},
					],
				},
				{
					_id: 6,
					name: "product6",
					price: 1000,
					images: [
						{
							url: "https://picsum.photos/500/500?/random?image=6",
							alt: "product image 6",
						},
					],
				},
				{
					_id: 7,
					name: "product7",
					price: 1000,
					images: [
						{
							url: "https://picsum.photos/500/500?/random?image=7",
							alt: "product image 7",
						},
					],
				},
				{
					_id: 8,
					name: "product8",
					price: 1000,
					images: [
						{
							url: "https://picsum.photos/500/500?/random?image=8",
							alt: "product image 8",
						},
					],
				},
			];
			setProducts(fetchProducts);
		}, 1000);
	}, []);

	return (
		<div className="flex flex-col lg:flex-row">
			{/* mobile filter button */}

			<button
				onClick={toggleSidebar}
				className="lg:hidden border p-2 flex justify-center items-center "
			>
				<FaFilter className="mr-2" />
				Filters
			</button>
			{/* filter section */}
			<div
				ref={sidebarRef}
				className={`${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
			>
				<Filtersidebar />
			</div>
			<div className="flex-grow p-4">
				<h2 className="text-2xl uppercase mb-4">All Collection</h2>

				<SortOptions />

				<Productgrid Products={products} />
			</div>
		</div>
	);
};

export default CollectionPage;
