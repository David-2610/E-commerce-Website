import { IoMdClose } from "react-icons/io";
import Cartcontent from "../Cart/cartconetnt";
import { fetchCart } from "../../redux/slices/cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
const Cartdrawer = ({ draweropen, togglecartDrawer }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, guestId } = useSelector((state) => state.auth);
	const { cart } = useSelector((state) => state.cart);
	const userId = user ? user.id : null;

	const HandleCheckout = () => {
		togglecartDrawer();
		if (!user) {
			navigate("/login?redirect=checkout");
		} else {
			navigate("/checkout");
		}
	};
	useEffect(() => {
		if (userId || guestId) {
			dispatch(fetchCart({ userId, guestId }));
		}
	}, [dispatch, userId, guestId]);
	
	
	return (
		<div
			className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
				draweropen ? "translate-x-0" : "translate-x-full"
			}`}
		>
			<div className="flex justify-end p-4">
				<button onClick={togglecartDrawer}>
					<IoMdClose className="h-6 w-6 text-gray-500" />
				</button>
			</div>
			<div className="flex-grow p-4 overflow-y-auto">
				<h2 className="text-xl font-semibold  mb-4 ">Your Cart</h2>
				{cart && cart?.products?.length > 0 ? (
					
					<Cartcontent
						cart={cart}
						userId={userId}
						guestId={guestId}
					/>
				) : (
					<p>Your cart is empty.</p>
				)}
			</div>

			<div className="p-4  bg-white sticky bottom-0">
				{cart && cart?.products?.length > 0 && (
					<>
						<button
							onClick={HandleCheckout}
							className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition"
						>
							Checkout
						</button>
						<p className="text-sm text-gray-500 mt-2 tracking-tighter text-center">
							Shipping,Taxes , and discount codes calculated at
							Checkout
						</p>
					</>
				)}
			</div>
		</div>
	);
};

export default Cartdrawer;
