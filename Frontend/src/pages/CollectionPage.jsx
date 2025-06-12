import { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa6";
import Filtersidebar from "../components/Products/Filtersidebar";
import SortOptions from "../components/Products/SortOptions";
import Productgrid from "../components/Products/productgrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const CollectionPage = () => {
    const {collection} = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {products, loading, error} = useSelector((state) => state.products);
    const queryParams = Object.fromEntries([...searchParams]);
    // const [products, setProducts] = useState([]);
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsByFilters({collection, ...queryParams}));
    }, [dispatch, collection, searchParams]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        //Closes sidebar if the user clicks outside the sidebar
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    }

    useEffect(() => {
        //Add eventlistener for clicks
        document.addEventListener("mousedown", handleClickOutside);
        //Clean eventlistener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



	return (
        <div className="flex flex-col lg:flex-row">
            {/* Mobile Filter option */}
            <button onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center "><FaFilter className="mr-2" />Filters</button>
            {/* Filter Sidebar */}
            <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
                <Filtersidebar />
            </div>
            <div className="flex-1 p-4 lg:p-6">  {/* Changed to flex-1 and added lg padding */}
            <div className="mb-6">  {/* Added wrapper div */}
                <h2 className="text-2xl uppercase mb-4 font-bold">All Collections</h2>
                <SortOptions/>
            </div>
            <Productgrid products={products} loading={loading} error={error}/>
        </div>
        </div>
    );
};

export default CollectionPage;
