import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductsGrid from "./productgrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { useParams } from "react-router-dom";

function ProductDetails({productId}) {
    console.log("ProductDetails component rendered with productId:", productId);

    const {id} = useParams();
    const productFetchId = productId || id;
    const dispatch = useDispatch();
    const {selectedProduct, loading, error, similarProducts} = useSelector((state) => state.products);
    const {user, guestId} = useSelector((state)=> state.auth);
    const [mainImage, setMainImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    
    useEffect(() => {
      if (productFetchId) {
        const fetchSequentially = async () => {
          try {
            const result = await dispatch(fetchProductDetails(productFetchId));
    
            // Check if the product fetch was successful
            if (fetchProductDetails.fulfilled.match(result)) {
              await dispatch(fetchSimilarProducts({ id: productFetchId }));
            } else {
              console.warn("Failed to fetch product details, skipping similar products.");
            }
          } catch (error) {
            console.error("Unexpected error while fetching product and similar products:", error);
          }
        };
    
        fetchSequentially();
      }
    }, [dispatch, productFetchId]);
    
      
    useEffect (() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
        }
    }, [selectedProduct]);

    const handleQuantityChange = (action) => {
        if (action === "plus") setQuantity((prev) => prev+1)
        if (action === "minus" && quantity > 1) setQuantity((prev) => prev-1)
    };

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Please select size & color before adding to cart.", {
                duration:1000,
            });
            return;
        }

        setIsButtonDisabled(true);

        dispatch(
            addToCart({
                userId: user?.id,
                productId:productFetchId,
                quantity,
                size: selectedSize,
                color: selectedColor,
                guestId,
            })
        )
        .then(() => {
            toast.success("Product added to Cart successfully!", {
                duration: 1000,
            });
        })
        .finally(() => {
            setIsButtonDisabled(false);
        });
    };

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error: {error}</p>
    }
	console.log("similarProducts:", similarProducts);

    return ( 
        <div className="p-6">
            {selectedProduct && (
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
                <div className="flex flex-col md:flex-row">
                    {/* Left thumbnails */}
                    <div className="hidden md:flex flex-col space-y-4 mr-6">
                        {selectedProduct.images.map((image, index) => (
                            <img onClick={()=>setMainImage(image.url)} key={index} src={image.url} alt={image.altText || `Thumbnail ${index}`} 
                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url? "border-black" : "border-gray-600"}`} />
                        ))}
                    </div>
                    {/* Main Image */}
                    <div className="md:w-1/2" >
                    <div className="mb-4">
                        {mainImage ? (
            <img 
                src={mainImage} 
                alt="Main Product" 
                className="w-full h-full object-cover rounded-lg"
            />
        ) : (
            <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="bg-gray-200 rounded-full w-12 h-12"></div>
                    <span className="mt-2 text-gray-500 text-sm">Loading image...</span>
                </div>
            </div>
        )}
                        {/* <img src={mainImage} alt="Main Product" 
                        className="w-full h-auto object-cover rounded-lg"/> */}
                    </div>
                    </div>
                    {/* Mobile Thumbnails */}
                    <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
                        {selectedProduct.images.map((image, index) => (
                            <img key={index} src={image.url} alt={image.altText || `Thumbnail ${index}`} onClick={()=>setMainImage(image.url)} className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url? "border-black" : "border-gray-600"}`} />
                        ))}
                    </div>
                    {/* Right side */}
                    <div className="md:w-1/2 md:ml-10">
                    <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                        {selectedProduct.name}
                    </h1>
                    <p className="text-lg text-gray-600 mb-1 line-through">
                        {selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}
                    </p>
                    <p className="text-2xl text-black mb-2">
                        ${selectedProduct.price}
                    </p>
                    <p className="text-gray-600 mb-4">
                        {selectedProduct.description}
                    </p>

                    <div className="mb-4">
                        <p className="text-gray-700">Color:</p>
                        <div className="flex mt-2 gap-2">
                            {selectedProduct.colors.map((color) => (
                                <button onClick={() => setSelectedColor(color)} key={color} className={`w-8 h-8 rounded-full border ${selectedColor === (color) ? "border-4 border-black" : "border-gray-300"}`} style={{ backgroundColor: color.toLowerCase().replace(/\s/g, "")
                                }}></button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-gray-700">Size:</p>
                        <div className="flex gap-2 mt-2">
                            {selectedProduct.sizes.map((size) => (
                                <button onClick={() => setSelectedSize(size)} key={size} 
                                className={`px-4 py-2 rounded border ${selectedSize === (size) ? "bg-black text-white" : ""}`}>{size}</button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="text-gray-700">Quantity:</p>
                        <div className="flex items-center space-x-4 mt-2">
                            <button onClick={() => handleQuantityChange("minus")} className="px-2 py-1 bg-gray-200 rounded text-lg">-</button>
                            <span className="text-lg">{quantity}</span>
                            <button onClick={() => handleQuantityChange("plus")} className="px-2 py-1 bg-gray-200 rounded text-lg">+</button>
                        </div>
                    </div>

                    <button onClick={handleAddToCart} disabled={isButtonDisabled} className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "bg-gray-900"}`}>{isButtonDisabled ? "Adding...": "Add to Cart"}</button>

                    <div className="mt-10 text-gray-700">
                        <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                        <table className="w-full text-sm text-left text-gray-600">
                            <tbody>
                                <tr>
                                    <td className="py-2">Brand</td>
                                    <td className="py-2">{selectedProduct.brand}</td>
                                </tr>
                                <tr>
                                    <td className="py-2">Material</td>
                                    <td className="py-2">{selectedProduct.material}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>

                <div className="mt-20">
                    <h2 className="text-2xl text-center font-medium mb-4">You May Also Like</h2>
                    <ProductsGrid products={similarProducts} loading={loading} error={error}/>
                </div>
            </div>
            )}
        </div>
     );
}

export default ProductDetails;