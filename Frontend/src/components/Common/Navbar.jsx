import { Link } from "react-router";
import { useState } from "react";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import Cartdrawer from "../Layout/Cartdrawer";

const Navbar = () => {
	const [draweropen, SetcartDrawer] = useState(false);
	const [navdraweropen, setNavdraweropen] = useState(false);

	const togglenavDrawer = () => {
		setNavdraweropen(!navdraweropen);
	};

	const togglecartDrawer = () => {
		SetcartDrawer(!draweropen);
	};

	return (
		<>
			<nav className="container mx-auto flex  items-center justify-between py-4 px-6s">
				<div>
					<Link to="/" className="text-2xl font-medium">
						ByteWears
					</Link>
				</div>
				<div className="hidden md:flex space-x-6">
					<Link
						to="/collections/all"
						className="text-gray-700 hover:text-black text-sm font-medium uppercase "
					>
						Men
					</Link>
					<Link
						to="/about"
						className="text-gray-700 hover:text-black text-sm font-medium uppercase "
					>
						Women
					</Link>
					<Link
						to="/about"
						className="text-gray-700 hover:text-black text-sm font-medium uppercase "
					>
						Top Wear
					</Link>
					<Link
						to="/about"
						className="text-gray-700 hover:text-black text-sm font-medium uppercase "
					>
						Bottom Wear
					</Link>
				</div>
				<div className="flex items-center space-x-4">
					<Link to="/profile" className=" hover:text-black ">
						<HiOutlineUser className="h-6 w-6 text-gray-700" />
					</Link>
					<button
						className="relative hover:text-black "
						onClick={togglecartDrawer}
					>
						<HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
						<span className="absolute -top-1 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
							4
						</span>
					</button>
					<div className="overflow-hidden">
						<SearchBar />
					</div>

					<button className=" md:hidden" onClick={togglenavDrawer}>
						<FaBars className="h-6 w-6 text-gray-700" />
					</button>
				</div>
			</nav>
			<Cartdrawer
				draweropen={draweropen}
				togglecartDrawer={togglecartDrawer}
			/>
			<div
				className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
					navdraweropen ? "translate-x-0" : "-translate-x-full"
				} `}
			>
				<div className="flex justify-end p-4">
					<button onClick={togglenavDrawer}>
						<IoMdClose className="h-6 w-6 text-gray-600" />
					</button>
				</div>
				<div className="p-4">
					<h2 className="text-xl font-semibold mb-4">Menu</h2>
					<nav className="space-y-4">
						<Link
							to="#"
							onClick={togglenavDrawer}
							className="block text-gray-600 hover:text-black"
						>
							Men
						</Link>
						<Link
							to="#"
							onClick={togglenavDrawer}
							className="block text-gray-600 hover:text-black"
						>
							Women
						</Link>
						<Link
							to="#"
							onClick={togglenavDrawer}
							className="block text-gray-600 hover:text-black"
						>
							Top Wear
						</Link>
						<Link
							to="#"
							onClick={togglenavDrawer}
							className="block text-gray-600 hover:text-black"
						>
							Bottom Wear
						</Link>
					</nav>
				</div>
			</div>
		</>
	);
};

export default Navbar;
