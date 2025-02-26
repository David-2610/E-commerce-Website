import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import AdminLayout from "./components/Layout/AdminLayout";
const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<UserLayout />} />
					<Route path="/admin" element={<AdminLayout />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
