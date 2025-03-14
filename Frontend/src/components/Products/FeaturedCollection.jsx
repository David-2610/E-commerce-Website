import { Link } from "react-router";
import Featured from "../../assets/featured.webp"; // Import the image file

const FeaturedCollection = () => {
	return (
		<section className="py-16 px-4 lg:px-0">
			<div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
				<div className="lg:w-1/2 p-8 text-center lg:text-left">
					<h2 className="text-lg font-semibold text-gray-700 mb-2">
						Comfort and Style
					</h2>
					<h2 className="text-4xl lg:text-gray-900 mb-6">
						Apparel Made for your everyday life
					</h2>
					<p className="text-lg text-gray-600 mb-6">
						Lorem ipsum dolor sit amet consectetur, adipisicing
						elit. Enim culpa, impedit cum rem quam doloremque quis
						fugiat! Consectetur, illum error.
					</p>
					<Link
						to="/collections/all"
						className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-700 transition duration-300 ease-in-out"
					>
						Shop Now
					</Link>
				</div>
				<div className="lg:w-1/2">
					<img
						src={Featured}
						alt="Featured Collection"
						className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl "
					/>
				</div>
			</div>
		</section>
	);
};

export default FeaturedCollection;
