import Hero from "../components/Layout/Hero";
import Gendercoll from "../components/Products/Gendercoll";
import New_arival from "../components/Products/New_arival";
import Productdetail from "../components/Products/productdetail";
import ProductGrid from "../components/Products/productgrid";

const placeholoderproducts = [
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

const Home = () => {
	return (
		<div>
			<Hero />
			<Gendercoll />
			<New_arival />

			<h2 className="text-3xl text-center font-bold mb-4">
				Best Sellers
			</h2>
			<Productdetail />
			<div className="container mx-auto ">
				<h2 className=" text-3xl text-center font-bold mb-4">
					Top Wear For Womens
				</h2>
				<ProductGrid Products={placeholoderproducts} />
			</div>
		</div>
	);
};

export default Home;
