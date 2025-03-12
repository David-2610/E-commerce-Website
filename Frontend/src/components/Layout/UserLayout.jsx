import { Outlet } from "react-router";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const UserLayout = () => {
	return (
		<>
			<Header />

			<main>
				<Outlet />
			</main>

			<Footer />
		</>
	);
};

export default UserLayout;
