import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../assets/login.webp";
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	// Now here i am writing the code to prevent loading of the full page upon clicking the sign in or sign up button
	const navigate = useNavigate();
	const location = useLocation();
	const { user, guestId, loading } = useSelector((state) => state.auth);
	const { cart } = useSelector((state) => state.cart);

	// get the redirect parameter and check if it's checkout or something
	
	const redirect =
		new URLSearchParams(location.search).get("redirect") || "/";
	const isCheckoutRedirect = redirect.includes("checkout");

	useEffect(() => {
		if (user) {
		  if (guestId) {
			dispatch(mergeCart({ guestId, user })).then(() => {
			  navigate(isCheckoutRedirect ? "/checkout" : "/", { replace: true });
			});
		  }
		}
	  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser({ email, password }));
		// Clear the input fields after submission
		setEmail("");
		setPassword("");
		
	};

	return (
		<div className=" flex ">
			<div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
				<form
					onSubmit={handleSubmit}
					className="w-full max-w-md bg-white p-8 rounded-lg border border-gray-300 shadow-sm "
				>
					<div className=" flex justify-center m-6">
						<h2 className="text-2xl font-bold mb-4">ByteWear</h2>
					</div>
					<h2 className="text-2xl font-bold mb-6 text-center ">
						Hey there!👋🏻
					</h2>
					<p className="text-center mb-6">
						{" "}
						Enter Your Username and Password to Login.
					</p>
					<div className="mb-4">
						<label className="block text-sm font-bold mb-2">
							Email
							<input
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className=" border rounded w-full p-2 "
							/>
						</label>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-bold mb-2">
							Password
							<input
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className=" border rounded w-full p-2 "
							/>
						</label>
					</div>
					<button
						type="submit"
						className="bg-black hover:bg-gray-700 text-white font-semibold p-2 rounded-lg w-full transition duration-150 "
					>
						{loading ? "Signing you in..." : "Sign In"}
					</button>
					<p className="mt-6 text-sm text-center">
						Don't have an account?{" "}
						<Link
							to={`/register?redirect=${encodeURIComponent(
								redirect
							)}`}
							className="text-blue-500"
						>
							{" "}
							Register
						</Link>
					</p>
				</form>
			</div>
			<div className="hidden md:block w-1/2 bg-white">
				<div className="h-full flex flex-col justify-center items-center">
					<img
						src={login}
						alt="Login to Account"
						className="h-[700px] w-full object-cover rounded-br-4xl rounded-r-4xl"
					/>
				</div>
			</div>
		</div>
	);
};

export default Login;
