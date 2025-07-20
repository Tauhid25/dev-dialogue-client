import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, makeAdmin } from "../../services/api";
import { FaUserShield } from "react-icons/fa";

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", searchTerm],
    queryFn: () => getAllUsers(searchTerm),
  });
  console.log(users);
  const mutation = useMutation({
    mutationFn: makeAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
    },
  });

  const handleMakeAdmin = (userId) => {
    mutation.mutate(userId);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#009fff]">Manage Users</h2>

      <form onSubmit={handleSearch} className="mb-4 flex gap-3">
        <input
          type="text"
          placeholder="Search by name"
          className="border px-4 py-2 rounded w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-outline bg-[#009fff] text-white px-4 py-1 rounded-lg text-base hover:bg-[#007dff] cursor-pointer"
        >
          Search
        </button>
      </form>

      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Subscription</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border capitalize">
                    {user?.membership || "bronze"}
                  </td>
                  <td className="px-4 py-2 border capitalize">
                    {user?.role || "user"}
                  </td>
                  <td className="px-4 py-2 border">
                    {user.role !== "admin" ? (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm flex items-center gap-1"
                      >
                        <FaUserShield /> Make Admin
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">
                        Already Admin
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
