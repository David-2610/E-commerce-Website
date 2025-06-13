import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails, updateProduct } from "../../redux/slices/productsSlice";
import axios from "axios";

function EditProductPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const {selectedProduct, loading, error} = useSelector((state)=> state.products);

    const [productData, setProductData] = useState({
        name:"",
        description:"",
        price: 0,
        countInStock:0,
        sku: "",
        category:"",
        brand:"",
        sizes:[],
        colors:[],
        collections:"",
        material:"",
        gender: "",
        images: [],
    });

    const [uploading, setUploading] = useState(false); //This is for uploading of images
    
    useEffect(() => {
        if(id) {
            dispatch(fetchProductDetails(id));
        }
    }, [dispatch, id]);

    useEffect(()=> {
        if(selectedProduct) {
            setProductData(selectedProduct);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProductData((prevData)=> ({...prevData, [name] : value}));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append("image", file);

        try {
            setUploading(true);
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                formData,
                {
                    header : {"Content-Type" : "multipart/form-data"}
                }
            );
			setProductData((prevData) => ({
				...prevData,
				images: [...prevData.images, { url: data.imageUrl, altText: "" }],
			  }));
			  
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

	const handleSubmit = async (e) => {
		e.preventDefault();
		await dispatch(updateProduct({ id, productData }));
		navigate("/admin/products");
	  };
	  

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>

    return ( 
        <div className="max-w-5xl mx-auto p-6 shadow-lg rounded-md">
            <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">Product Name</label>
                    <input type="text" name="name" value={productData.name} onChange={handleChange} className="w-full border border-gray-500 rounded p-3" required/>
                </div>

                {/* Desciption */}

                <div className="mb-6">
                    <label className="block font-semibold mb-2">Description</label>
                    <textarea name="description" value={productData.description} onChange={handleChange} className="w-full border border-gray-500 rounded p-3" rows={4}></textarea>
                </div>

                {/* Price */}

                <div className="mb-6">
                    <label className="block font-semibold mb-2">Price</label>
                    <input type="number" name="price" value={productData.price} className="w-full border border-gray-500 rounded p-3" onChange={handleChange} />
                </div>

                {/* Count in stock */}

                <div className="mb-6">
                    <label className="block font-semibold mb-2">Available Units</label>
                    <input type="number" name="countInStock" value={productData.countInStock} className="w-full border border-gray-500 rounded p-3" onChange={handleChange} />
                </div>

                {/* SKU */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">SKU</label>
                    <input type="text" name="sku" value={productData.sku} className="w-full border border-gray-500 rounded p-3" onChange={handleChange} />
                </div>

                {/* Sizes */}

                <div className="mb-6">
                    <label className="block font-semibold mb-2">Size available (comma-separated)</label>
                    <input type="text" name="sizes" value={productData.sizes.join(",")} className="w-full border border-gray-500 rounded p-3" onChange={(e) => setProductData({...productData, sizes: e.target.value.split(",").map((size) => size.trim())})} />
                </div>

                {/* Colors */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">Colors (comma-separated)</label>
                    <input type="text" name="colors" value={productData.colors.join(",")} className="w-full border border-gray-500 rounded p-3" onChange={(e) => setProductData({...productData, colors: e.target.value.split(",").map((color) => color.trim())})} />
                </div>

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">Upload Image</label>
                    <input type="file" onChange={handleImageUpload}/>
                    {uploading && <p>Uploading...</p>}

                        <div className="flex gap-4 mt-4">
                        {productData.images.map((image, index) => (
                            <div key={index}>
                                <img src={image.url} alt={productData.name} className="w-20 h-20 object-cover rounded-md shadow-md" />
                            </div>
                        ))}
                    </div>
                </div>

                <button type="Submit" className="w-full h-12 transition-colors text-lg bg-green-600 hover:bg-green-900 text-white px-4 py-2 mt-4 rounded-lg">Update product details</button>
            </form>
        </div>
     );
}

export default EditProductPage;