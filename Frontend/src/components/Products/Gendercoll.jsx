import { Link } from "react-router";
import menscollimage from "../../assets/mens-collection.webp";
import womencollimage from "../../assets/womens-collection.webp";
const Gendercoll = () => {
	return (
		<section className="py-16 mx-4 md:px-0">
			<div className="container mx-auto flex flex-col md:flex-row gap-8">
                {/* {Mens} */}
				<div className="relative flex-1">
					<img
						src={menscollimage}
						alt="mens-collection"
						className="w-full h-[700px] object-cover"
					/>
					<div className="absolute bottom-8 left-8 bg-white/50 p-4 rounded-2xl ">
						<h2 className=" text-2xl font-bold mb-3 text-gray-900">
							Men's Collection
						</h2>
						<Link
							to="/collections/all?gender=mens"
							className="text-gray-900 p-1  hover:text-gray-700 hover:bg-white/60 rounded-4xl"
						>
							Shop Now
						</Link>
					</div>
				</div>
                {/* {Womens} */}
				<div className="relative flex-1">
					<img
						src={womencollimage}
						alt="womens-collection"
						className="w-full h-[700px] object-cover"
					/>
					<div className="absolute bottom-8 left-8 bg-white/50 p-4 rounded-2xl ">
						<h2 className=" text-2xl font-bold mb-3 text-gray-900">
							Women's Collection
						</h2>
						<Link
							to="/collections/all?gender=womens"
							className="text-gray-900 p-1  hover:text-gray-700 hover:bg-white/60 rounded-4xl"
						>
							Shop Now
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Gendercoll;
