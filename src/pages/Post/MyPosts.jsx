import { useContext } from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import { getMyPosts, deletePostById } from "../../services/api";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myPosts", user?.email],
    queryFn: () => getMyPosts(user?.email),
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: (postId) => deletePostById(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(["myPosts", user?.email]);
    },
  });

  const handleDelete = (postId) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(postId);
    }
  };

  const handleCommentClick = (postId) => {
    navigate(`/dashboard/comments/${postId}`);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">My Posts</h2>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to load posts.</p>}

      {!isLoading && posts?.length === 0 && (
        <p className="text-gray-500">You haven't posted anything yet.</p>
      )}

      {!isLoading && posts?.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Votes</th>
                <th className="px-4 py-2 border">Comments</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-b">
                  <td className="px-4 py-2 border font-medium text-gray-900">
                    {post.title}
                  </td>
                  <td className="px-4 py-2 border">
                    {post.upVote - post.downVote}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleCommentClick(post._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Comments
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
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

export default MyPosts;
