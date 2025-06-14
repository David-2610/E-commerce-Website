import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import UserLayout from "./components/Layout/UserLayout";
import AdminLayout from "./components/Admin/adminlayout";
import Login from "./pages/Login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import Collection from "./pages/CollectionPage";
import Productdetails from "./components/Products/productdetail";
import Checkout from "./components/Cart/checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailspage from "./pages/OrderDetailspage";
import Myorderpage from "./pages/myorderpage";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";

import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import AddProductPage from "./components/Admin/addproduct";

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Toaster position="top-right" />
				<Routes>
					<Route path="/" element={<UserLayout />}>
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="profile" element={<Profile />} />
						<Route
							path="collections/:collection"
							element={<Collection />}
						/>
						<Route
							path="/product/:id"
							element={<Productdetails />}
						/>
						<Route path="/checkout" element={<Checkout />} />
						<Route
							path="order-confirmation"
							element={<OrderConfirmationPage />}
						/>
						<Route
							path="order/:id"
							element={<OrderDetailspage />}
						/>
						<Route path="my-orders" element={<Myorderpage />} />
					</Route>
					<Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
						<Route index element={<AdminHomePage />} />
						<Route path="users" element={<UserManagement />} />
						<Route
							path="products"
							element={<ProductManagement />}
						/>
						<Route path="orders" element={<OrderManagement />} />
						<Route
							path="products/:id/edit"
							element={<EditProductPage />}
						/>
						<Route path="/admin/products/add" element={<AddProductPage />} />

					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
// sb-pui24339914998@personal.example.com
// k<^+UOI6
