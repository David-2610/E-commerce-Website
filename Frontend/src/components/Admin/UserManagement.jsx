import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	addUser,
	deleteUser,
	fetchUsers,
	updateUser,
} from "../../redux/slices/adminSlice";

function UserManagement() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);
	const { users, loading, error } = useSelector((state) => state.admin);

	useEffect(() => {
		if (user && user.role === "admin") {
			dispatch(fetchUsers()); // Fetch users on component mount
		} else {
			navigate("/");
		}
	}, [dispatch, user, navigate]);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "customer",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			await dispatch(addUser(formData)).unwrap();
	
			// Reset form only on success
			setFormData({
				name: "",
				email: "",
				password: "",
				role: "customer",
			});
	
			// Fetch updated users list instead of reloading the page
			dispatch(fetchUsers());
		} catch (error) {
			console.error("Failed to add user:", error);
		}
	};
	

	const handleRoleChange = (userId, newRole) => {
		dispatch(updateUser({ id: userId, role: newRole }));
	};

	const handleDeleteUser = async (userId) => {
		if (window.confirm("Are your sure you want to delete this user?")) {
			try {
				await dispatch(deleteUser(userId)).unwrap();
				dispatch(fetchUsers());
			} catch (err) {
				console.error("Failed to delete user:", err);
			}
		}
	};
	

	return (
		<div className="max-w-7xl mx-auto p-6">
			<h2 className="text-2xl font-bold mb-4">User Management</h2>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{/* Add new user form */}
			<div className="p-6 rounded-lg mb-6">
				<h3 className="text-lg font-bold mb-4">Add New User</h3>
				<form onSubmit={handleFormSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700">Name</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full p-2 border rounded mt-2"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full p-2 border rounded mt-2"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Password</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="w-full p-2 border rounded mt-2"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Role</label>
						<select
							name="role"
							value={formData.role}
							onChange={handleChange}
							className="w-full p-2 border rounded mt-2"
						>
							<option value="customer">Customer</option>
							<option value="admin">Admin</option>
						</select>
					</div>

					<button
						type="submit"
						className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
					>
						Add User
					</button>
				</form>
			</div>
			{/* User List Management */}

			<div className="overflow-x-auto shadow=md sm:rounded-lg">
				<table className="min-w-full text-left text=gray-500">
					<thead className="bg-gray-300 text-sm uppercase text-black">
						<tr>
							<th className="py-3 px-2">Name</th>
							<th className="py-3 px-2">Email</th>
							<th className="py-3 px-2">Role</th>
							<th className="py-3 px-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{(Array.isArray(users) ? users : [])
							.filter(Boolean)
							.map((user) => (
								<tr
									key={user._id}
									className="border-b hover:bg-gray-100"
								>
									<td className="p-4 font-medium text-gray-900 whitespace-nowrap">
										{user.name}
									</td>
									<td className="p-4">{user.email}</td>
									<td className="p-4">
										<select
											value={user.role}
											onChange={(e) =>
												handleRoleChange(
													user._id,
													e.target.value
												)
											}
											className="p-2 border rounded"
										>
											<option value="customer">
												Customer
											</option>
											<option value="admin">Admin</option>
										</select>
									</td>
									<td className="p-4">
										<button
											onClick={() =>
												handleDeleteUser(user._id)
											}
											className="bg-red-500 text-white rounded w-full hover:bg-red-700 px-2 py-2"
										>
											Delete
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			<p className="mt-3 text-gray-700 text-sm">
				Note: Please wait for few seconds and then refresh the page to
				see the changes after you click on Update, Delete or Add User
				button.
			</p>
		</div>
	);
}

export default UserManagement;
