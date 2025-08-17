import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import {
  getAdminStats,
  getTags,
  addNewTag,
} from "../../services/api";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "react-toastify";

const COLORS = ["#007dff", "#6366F1", "#f97316"];

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Stats API
  const { data: stats = {} } = useQuery({
    queryKey: ["adminStats"],
    queryFn: getAdminStats,
  });
  
  // Tags API
  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  // Form state
  const [tagInput, setTagInput] = useState("");

  const { mutate: handleAddTag, isPending } = useMutation({
    mutationFn: addNewTag,
    onSuccess: () => {
      toast.success("Tag added successfully!");
      queryClient.invalidateQueries(["tags"]);
      setTagInput("");
    },
    onError: () => toast.error("Failed to add tag"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tagInput.trim()) {
      handleAddTag(tagInput.trim().toLowerCase());
    }
  };

  const chartData = [
    { name: "Posts", value: stats?.postCount || 0 },
    { name: "Comments", value: stats?.commentCount || 0 },
    { name: "Users", value: stats?.userCount || 0 },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        <img
          src={user?.photoURL || "/default-user.png"}
          alt={user?.displayName}
          className="w-28 h-28 rounded-full border"
        />
        <div>
          <h1 className="text-3xl font-bold">{user?.displayName}</h1>
          <p className="text-gray-600">{user?.email}</p>
          <p className="mt-2 text-sm">
            <strong>Total Posts:</strong> {stats.postCount || 0}
          </p>
          <p className="text-sm">
            <strong>Total Comments:</strong> {stats.commentCount || 0}
          </p>
          <p className="text-sm">
            <strong>Total Users:</strong> {stats.userCount || 0}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded shadow p-6 mb-10 dark:bg-gray-800 dark:text-white dark:border dark:border-white">
        <h2 className="text-xl font-semibold mb-4">Site Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Add Tag Form */}
      <div className="bg-white p-6 rounded shadow dark:bg-gray-800 dark:text-white dark:border dark:border-white">
        <h2 className="text-xl font-semibold mb-4">Add New Tag</h2>
        <form onSubmit={handleSubmit} className="flex gap-4 items-center">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="input input-bordered w-full max-w-xs dark:bg-gray-800 dark:text-white dark:border dark:border-white"
            placeholder="Enter tag name (e.g. javascript)"
          />
          <button
            type="submit"
            disabled={isPending}
            className="btn bg-[#007dff] text-white"
          >
            {isPending ? "Adding..." : "Add Tag"}
          </button>
        </form>

        {/* Show all tags */}
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Existing Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
