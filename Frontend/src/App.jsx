import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import UserLayout from "./components/Layout/UserLayout";
import AdminLayout from "./components/Layout/AdminLayout";
import Login from "./pages/Login";
import Register from "./pages/register";
const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Toaster position="top-right" />
				<Routes>
					<Route path="/" element={<UserLayout />}>
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</Route>
					<Route path="/admin" element={<AdminLayout />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
