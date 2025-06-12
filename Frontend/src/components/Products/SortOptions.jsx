import { useSearchParams } from "react-router-dom";

function SortOptions() {
	const [searchParams, setSearchParams] = useSearchParams();

	const handleSortChange = (e) => {
		const sortBy = e.target.value;
		searchParams.set("sortBy", sortBy);
		setSearchParams(searchParams);
	};

	return (
		<div className="mb-4 flex items-center justify-end">
			<select
				id="sort"
				value={searchParams.get("sortBy") || ""}
				onChange={handleSortChange}
				className="border p-2 rounded-md focus:outline-none"
			>
				<option value="">Sort option</option>
				<option value="priceAsc">Price : Low to High</option>
				<option value="priceDesc">Price : High to Low</option>
				<option value="popularity">Most Popular on top</option>
			</select>
		</div>
	);
}

export default SortOptions;
