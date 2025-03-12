import Hero from "../components/Layout/Hero";
import Gendercoll from "../components/Products/Gendercoll";
import New_arival from "../components/Products/New_arival";
import Productdetail from "../components/Products/productdetail";

const Home = () => {
	return (
		<div>
			<Hero />
			<Gendercoll />
			<New_arival />

			<h2 className="text-3xl text-center font-bold mb-4">Best Sellers</h2>
			 <Productdetail/>
		</div>
	);
};

export default Home;
