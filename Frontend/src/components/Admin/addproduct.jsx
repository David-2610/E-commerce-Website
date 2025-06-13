import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/slices/productsSlice";
import axios from "axios";


function AddProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
    rating: "",
    numReviews: "",
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: data.imageUrl, altText: "" }],
      }));
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createProduct(productData));
    navigate("/admin/products");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-lg rounded-md">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Text inputs */}
        {[
          "name",
          "description",
          "price",
          "discountPrice",
          "countInStock",
          "sku",
          "category",
          "brand",
          "collections",
          "material",
          "rating",
          "numReviews",
        ].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block mb-1 font-medium capitalize">{field}</label>
            {field === "description" ? (
              <textarea
                name={field}
                value={productData[field]}
                onChange={handleChange}
                className="w-full border rounded p-2"
                rows={3}
              />
            ) : (
              <input
                name={field}
                value={productData[field]}
                onChange={handleChange}
                className="w-full border rounded p-2"
                type={["price", "discountPrice", "countInStock", "rating", "numReviews"].includes(field) ? "number" : "text"}
              />
            )}
          </div>
        ))}

        {/* Gender */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Gender</label>
          <select
            name="gender"
            value={productData.gender}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Sizes (comma separated)</label>
          <input
            name="sizes"
            value={productData.sizes.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            className="w-full border rounded p-2"
          />
        </div>

        {/* Colors */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Colors (comma separated)</label>
          <input
            name="colors"
            value={productData.colors.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((c) => c.trim()),
              })
            }
            className="w-full border rounded p-2"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          {uploading && <p>Uploading...</p>}
          <div className="flex gap-4 mt-2">
            {productData.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.altText}
                className="w-20 h-20 object-cover"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 w-full"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
