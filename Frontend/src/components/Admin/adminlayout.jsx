import { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSideBar from "./AdminSideBar";
import { Outlet } from "react-router";

const Adminlayout = () => {
	const [isSidebarOpen, setisSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setisSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="min-h-screen flex flex-col md:flex-row relative">
			<div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
				<button onClick={toggleSidebar} className="text-white">
					<FaBars size={24} />
				</button>
				<h1 className="text-xl font-medium ml-4">Admin Dashboard</h1>
			</div>

			{/* overlay for mobile sidebar */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 z-10 bg-black/50 md:hidden"
					onClick={toggleSidebar}
				></div>
			)}

			<div
				className={` bg-gray-900 min-h-screen  text-white w-64 absolute md:relative transform ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}
			>
				<AdminSideBar />
			</div>
            <div className="flex-grow p-6 overflow-auto">
                <Outlet/>
      

            </div>
		</div>
	);
};

export default Adminlayout;
