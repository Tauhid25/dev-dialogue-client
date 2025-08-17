import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, makeAdmin } from "../../services/api";
import { FaUserShield } from "react-icons/fa";
import Loading from "../Loading/Loading";

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["allUsers", searchTerm, page],
    queryFn: () => getAllUsers({ search: searchTerm, page, limit }),
    keepPreviousData: true,
  });

  const users = data?.users || [];
  const totalUsers = data?.total || 0;
  const totalPages = Math.ceil(totalUsers / limit);

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
    setPage(1);
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-6xl mx-auto dark:bg-gray-800 dark:text-white dark:border dark:border-white">
      <h2 className="text-2xl font-bold mb-4 text-[#009fff] dark:text-white">Manage Users</h2>

      <form onSubmit={handleSearch} className="mb-4 flex gap-3">
        <input
          type="text"
          placeholder="Search by name"
          className="border px-4 py-2 rounded w-full md:w-1/2 "
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
      <Loading></Loading>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100 text-left dark:bg-gray-800 dark:text-white">
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

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="btn btn-sm btn-outline"
            >
              Prev
            </button>
            <span className="px-4 py-2">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="btn btn-sm btn-outline"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUsers;

