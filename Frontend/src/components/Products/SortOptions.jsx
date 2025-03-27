import { useSearchParams } from "react-router";
const SortOptions = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const handlesortchange = (e) => {
		const sortby = e.target.value;
		searchParams.set("sort", sortby);
		setSearchParams(searchParams);
	};
	return (
		<div className="mb-4 flex items-center justify-end">
			<select
				id="sort"
				onChange={handlesortchange}
				value={searchParams.get("sort") || ""}
				className="border p-2 rounded-md focus:outline-none"
			>
				<option value="">Default</option>
				<option value="asc">Price: Low to High</option>
				<option value="desc">Price: High to Low</option>
				<option value="popularity">Popularity</option>
			</select>
		</div>
	);
};

export default SortOptions;
