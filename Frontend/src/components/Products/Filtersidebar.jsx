import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
const Filtersidebar = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const [Filters, setFilters] = useState({
		category: searchParams.get("category") || "",
		gender: searchParams.get("gender") || "",
		color: searchParams.get("color") || "",
		size: searchParams.get("size") || "",
		material: searchParams.get("material") || "",
		brand: searchParams.get("brand") || "",
		minprice: searchParams.get("minprice") || 0,
		maxprice: searchParams.get("maxprice") || 100,
	});
	const [pricerange, setPricerange] = useState([0, 100]);

	const categories = ["Top Wear", "Bottom Wear"];

	const colours = [
		"Black",
		"White",
		"Red",
		"Blue",
		"Green",
		"Yellow",
		"Pink",
		"Grey",
		"Brown",
		"Orange",
		"Purple",
		"Navy Blue",
		"Beige",
		"Gold",
		"Silver",
		"Multi Color",
	];

	const sizes = ["S", "M", "L", "XL", "XXL"];

	const materials = [
		"Cotton",
		"Polyester",
		"Silk",
		"Wool",
		"Nylon",
		"Denim",
		"Leather",
		"Linen",
	];

	const brands = [
		"Adidas",
		"Nike",
		"Puma",
		"Reebok",
		"Fila",
		"U.S. Polo Assn.",
	];
	const genders = ["Men", "Women"];

	const handlefilterchange = (e) => {
		const { name, value, type, checked } = e.target;
		let newFilters = { ...Filters };
		if (type === "checkbox") {
			if (checked) {
				newFilters[name] = [...(newFilters[name] || []), value];
			} else {
				newFilters[name] = newFilters[name].filter(
					(item) => item !== value
				);
			}
		} else {
			newFilters[name] = value;
		}
		setFilters(newFilters);
		updateURLParams(newFilters);
	};
	const handlepricerangechange = (e) => {
		const newPrice = e.target.value;
		setPricerange([0, newPrice]);
		const newFilter = { ...Filters, minprice: 0, maxprice: newPrice };
		setFilters(newFilter);
		updateURLParams(newFilter);
	};

	const updateURLParams = (newFilters) => {
		const params = new URLSearchParams();
		Object.keys(Filters).forEach((key) => {
			if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
				params.append(key, newFilters[key].join(","));
			} else {
				params.append(key, newFilters[key]);
			}
		});
		setSearchParams(params);
		navigate(`?${params.toString()}`);
	};

	useEffect(() => {
		const params = Object.fromEntries([...searchParams]);

		setFilters({
			category: params.category || "",
			gender: params.gender || "",
			color: params.color || "",
			size: params.size ? params.size.split(",") : [],
			material: params.material ? params.material.split(",") : [],
			brand: params.brand ? params.brand.split(",") : [],
			minprice: params.minprice || 0,
			maxprice: params.maxprice || 100,
		});
		setPricerange([0, params.maxprice || 100]);
	}, [searchParams]);
	return (
		<div className="p-4">
			<h3 className="text-xl font-medium text-gray-600 mb-4">Filter</h3>
			{/* Category Filter */}
			<div className="mb-6">
				<label className="block text-gray-600 font-medium mb-2">
					Category
				</label>
				{categories.map((category) => (
					<div key={category} className="flex items-center mb-1">
						<input
							type="radio"
							name="category"
							value={category}
							onChange={handlefilterchange}
							checked={Filters.category === category}
							className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
						/>
						<span className="text-gray-700">{category}</span>
					</div>
				))}
			</div>
			{/* Gender Filter */}
			<div className="mb-6">
				<label className="block text-gray-600 font-medium mb-2">
					Gender
				</label>
				{genders.map((gender) => (
					<div key={gender} className="flex items-center mb-1">
						<input
							type="radio"
							name="gender"
							value={gender}
							onChange={handlefilterchange}
							checked={Filters.gender === gender}
							className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
						/>
						<span className="text-gray-700">{gender}</span>
					</div>
				))}
			</div>
			{/* Color Filter */}
			<div className="mb-6">
				<label className="block text-gray-600 font-medium mb-2">
					Colour
				</label>
				<div className="flex flex-wrap gap-2">
					{colours.map((color) => (
						<button
							key={color}
							name="colour"
							value={color}
							onClick={handlefilterchange}
							className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover: scale-105 ${
								Filters.color.includes(color.toLowerCase())
									? "ring-2 border-blue-500"
									: ""
							}`}
							style={{
								backgroundColor: color.toLowerCase(),
							}}
						></button>
					))}
				</div>
			</div>
			{/* size filter */}
			<label className="block text-gray-600 font-medium mb-2">Size</label>
			{sizes.map((size) => (
				<div key={size} className="flex items-center mb-1 ">
					<input
						type="checkbox"
						name="size"
						value={size}
						onChange={handlefilterchange}
						checked={Filters.size.includes(size)}
						className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
					/>
					<span className="text-gray-700">{size}</span>
				</div>
			))}
			{/* material filter */}
			<label className="block text-gray-600 font-medium mb-2">
				Material
			</label>
			{materials.map((material) => (
				<div key={material} className="flex items-center mb-1">
					<input
						type="checkbox"
						name="material"
						value={material}
						onChange={handlefilterchange}
						checked={Filters.material.includes(material)}
						className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
					/>
					<span className="text-gray-700">{material}</span>
				</div>
			))}
			{/* Brand filter */}
			<label className="block text-gray-600 font-medium mb-2">
				Brands
			</label>
			{brands.map((brand) => (
				<div key={brand} className="flex items-center mb-1">
					<input
						type="checkbox"
						name="brand"
						value={brand}
						onChange={handlefilterchange}
						checked={Filters.brand.includes(brand)}
						className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
					/>
					<span className="text-gray-700">{brand}</span>
				</div>
			))}
			{/* price range flter */}
			<div className="mb-8">
				<label className="block text-gray-600 font-medium mb-2">
					Price Range
				</label>
				<input
					type="range"
					name="pricerange"
					value={pricerange[1]}
					onChange={handlepricerangechange}
					min={0}
					max={100}
					className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
				/>
				<div className="flex justify-between text-gray-600 mt-2">
					<span>$0</span>
					<span>${pricerange[1]}</span>
				</div>
			</div>
		</div>
	);
};

export default Filtersidebar;
