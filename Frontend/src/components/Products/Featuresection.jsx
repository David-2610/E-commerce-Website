import {
	HiShoppingBag,
	HiOutlineCreditCard,
	HiChartSquareBar,
} from "react-icons/hi";

const Featuresection = () => {
	return (
		<section className="py-16 px-4 bg-white ">
			<div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
				<div className="flex flex-col items-center">
					<div className="p-4 rounded-full mb-4">
						<HiShoppingBag className="text-3xl" />
					</div>
					<h4 className="tracking-tighter mb-2">
						FREE INTERNAYIONAL SHIPPING
					</h4>
					<p className="text-gray-600 text-sm tracking-tighter">
						On all Orders over $100.00
					</p>
				</div>
				<div className="flex flex-col items-center">
					<div className="p-4 rounded-full mb-4">
						<HiChartSquareBar className="text-3xl" />
					</div>
					<h4 className="tracking-tighter mb-2">
						45 DAYS RETURN POLICY
					</h4>
					<p className="text-gray-600 text-sm tracking-tighter">
						Money back within 30 days
					</p>
				</div>
				<div className="flex flex-col items-center">
					<div className="p-4 rounded-full mb-4">
						<HiOutlineCreditCard className="text-3xl" />
					</div>
					<h4 className="tracking-tighter mb-2">SECURE CHECKOUT</h4>
					<p className="text-gray-600 text-sm tracking-tighter">
						100% Secure payment
					</p>
				</div>
			</div>
		</section>
	);
};

export default Featuresection;
