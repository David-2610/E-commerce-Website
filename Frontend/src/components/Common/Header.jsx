import Topbar from "./topbar";
import Navbar from "./Navbar";
// import { Link } from "react-router-dom"
const Header = () => {
	return (
		<header className="border-b border-gray-200">
			<Topbar />
			<Navbar />
		</header>
	);
};

export default Header;
