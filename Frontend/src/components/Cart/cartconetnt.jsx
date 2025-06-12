import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {

    const dispatch = useDispatch();

    //Handle adding or subtracting to the Cart
    const handleAddToCart = (productId, delta, quantity, size, color) => {
        const newQuantity = quantity + delta;

        if(newQuantity >=1) {
            dispatch(updateCartItemQuantity({
                productId,
                quantity:newQuantity,
                guestId,
                userId,
                size, 
                color,
            }))
        }
    };

    const handleRemoveFromCart = (productId, size, color) => {
        dispatch(removeFromCart({ productId, guestId, userId, size, color }))
        }

    return (
        <div>
            {cart.products.map((product, index) => (
                    <div key={index} className="flex item-start justify-between py-4 border-b" >
                        <div className="flex item-start" >
                            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded"/>
                        </div>
                        <div>
                            <h3>{product.name}</h3>
                            <p className="text-sm text-gray-500 mr-12 pr-12">
                                Size: {product.size} | Color: {product.color}
                            </p>
                            <div className="flex items-center mt-2" >
                                <button onClick={()=> handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)} className="border rounded px-2 py-1 text-xl font-medium ml-2" >-</button>
                                <span className="mx-2">{product.quantity}</span>
                                <button onClick={()=> handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)} className="border rounded px-2 py-1 text-xl font-medium" >+</button>
                            </div>
                        </div>
                        <div>
                            <p>$ {product.price.toLocaleString()}</p>
                            <button onClick={()=> handleRemoveFromCart(product.productId, product.size, product.color)} className="h-10 w-10 mt-2 text-red-600">
                                <RiDeleteBin3Line />
                            </button>
                        </div>
                    </div>
            ))
            }
        </div>
    );
};

export default CartContents;