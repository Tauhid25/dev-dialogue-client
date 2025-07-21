import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import { getMyPosts, deletePostById } from "../../services/api";
import Swal from "sweetalert2";

const POSTS_PER_PAGE = 5;

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const {
    data = { posts: [], total: 0 },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myPosts", user?.email, page],
    queryFn: () => getMyPosts(user?.email, page, POSTS_PER_PAGE),
    enabled: !!user?.email,
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: (postId) => deletePostById(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(["myPosts", user?.email, page]);
    },
  });


  const handleDelete = (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(postId, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
          },
          onError: () => {
            Swal.fire(
              "Error!",
              "There was a problem deleting the post.",
              "error"
            );
          },
        });
      }
    });
  };

  const handleCommentClick = (postId) => {
    navigate(`/dashboard/comments/${postId}`);
  };

  const totalPages = Math.ceil(data.total / POSTS_PER_PAGE);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">My Posts</h2>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to load posts.</p>}

      {!isLoading && data?.posts?.length === 0 && (
        <p className="text-gray-500">You haven't posted anything yet.</p>
      )}

      {!isLoading && data?.posts?.length > 0 && (
        <>
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
                {data.posts.map((post) => (
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

          {/* Pagination */}
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-4 py-1 border rounded">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyPosts;
