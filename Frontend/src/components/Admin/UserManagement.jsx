import React, { useState } from "react";
const UserManagement = () => {
	const users = [
		{
			_id: 252001,
			name: "Alice Smith",
			email: "alice@example.com",
			role: "Admin",
		},
		{
			_id: 252002,
			name: "Bob Johnson",
			email: "bob@example.com",
			role: "Customer",
		},
		{
			_id: 252003,
			name: "Charlie Brown",
			email: "charlie@example.com",
			role: "Customer",
		},
		{
			_id: 252004,
			name: "David Lee",
			email: "david@example.com",
			role: "Admin",
		},
		{
			_id: 252005,
			name: "Eve Wang",
			email: "eve@example.com",
			role: "Customer",
		},
	];

	const [formdata, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "Customer",
	});
	const handleChange = (e) => {
		setFormData({
			...formdata,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formdata);
		setFormData({
			name: "",
			email: "",
			password: "",
			role: "Customer",
		});
	};
	const handleRoleChange = (userId, newRole) => {
		console.log(`Changing role for user ${userId} to ${newRole}`);

		// Here you would typically make an API call to update the user's role
	};
	const handleDeleteUser = (userId) => {
		if (window.confirm("Are you sure you want to delete this user?")) {
			console.log("Delete User with UserId:", userId);
		}
	};
	return (
		<div className="mx-auto p-6 max-w-7xl">
			<h2 className="text-2xl font-bold mb-4">User Management</h2>
			<div className=" p-6 rounded-lg mb-6">
				<h3 className="text-lg font-bold mb-4">Add New User</h3>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700 ">Name</label>
						<input
							type="text"
							name="name"
							value={formdata.name}
							onChange={handleChange}
							className="w-full p-2 border rounded"
							required
						/>
					</div>
					{/* ------------------------------------------------------------------------ */}
					<div className="mb-4">
						<label className="block text-gray-700 ">Email</label>
						<input
							type="text"
							name="email"
							value={formdata.email}
							onChange={handleChange}
							className="w-full p-2 border rounded"
							required
						/>
					</div>
					{/* ------------------------------------------------------------------------ */}
					<div className="mb-4">
						<label className="block text-gray-700 ">Password</label>
						<input
							type="password"
							name="password"
							value={formdata.password}
							onChange={handleChange}
							className="w-full p-2 border rounded"
							required
						/>
					</div>
					{/* ------------------------------------------------------------------------ */}
					<div className="mb-4">
						<label className="block text-gray-700 ">Role</label>
						<select
							name="role"
							value={formdata.role}
							onChange={handleChange}
							className="w-full p-2 border rounded"
							required
						>
							<option value="Customer">Customer</option>
							<option value="Admin">Admin</option>
						</select>
					</div>
					{/* ------------------------------------------------------------------------ */}
					<button
						type="submit"
						className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
					>
						Add User
					</button>
					{/* ------------------------------------------------------------------------ */}
				</form>
			</div>
			{/* USer LIST */}
			<div className="overflow-x-auto shadow-md sm:rounded-lg">
				<table className="min-w-full text-left text-gray-500">
					<thead className="bg-gray-500 text-sm uppercase text-gray-700">
						<tr>
							<th className="px-4 py-3">Name</th>
							<th className="px-4 py-3">Email</th>
							<th className="px-4 py-3">Role</th>
							<th className="px-4 py-3">Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr
								key={user._id}
								className="border-b hover:bg-gray-50"
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
										<option value="Customer">
											Customer
										</option>
										<option value="Admin">Admin</option>
									</select>
								</td>
								<td className="p-4">
									<button
										className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
										onClick={() =>
											handleDeleteUser(user._id)
										}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserManagement;
