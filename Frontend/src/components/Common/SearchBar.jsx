import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../../redux/slices/productsSlice";

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isopen, setIsopen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSearchToggle = () => {
		setIsopen(!isopen);
	};
	const handleSearch = (e) => {
		e.preventDefault();
		dispatch(setFilters({ search: searchTerm }));
		navigate(`/collections/all?search=${searchTerm}`);
		setIsopen(false);
	};
	return (
		<div
			className={`flex justify-center items-center w-full transition-all duration-300 ease-in-out ${
				isopen ? "absolute top-0 left-0 bg-white h-24 z-50" : "w-auto"
			} `}
		>
			{isopen ? (
				<form
					onSubmit={handleSearch}
					className="relative flex justify-center items-center w-full"
				>
					<div className="relative w-1/2 ">
						<input
							type="text "
							placeholder="Search"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="bg-gray-100 px-4 py-2 rounded-lg w-full pl-2 pr-12 focus:outline-none placeholder:text-gray-700"
						/>
						<button
							type="submit"
							className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
						>
							<HiMagnifyingGlass className="h-6 w-6" />
						</button>
					</div>
					<button
						type="button"
						onClick={handleSearchToggle}
						className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2  text-gray-600 hover:text-gray-800"
					>
						<HiMiniXMark className="h-6 w-6 " />
					</button>
				</form>
			) : (
				<button onClick={handleSearchToggle}>
					<HiMagnifyingGlass className="h-6 w-6" />
				</button>
			)}
		</div>
	);
};

export default SearchBar;
