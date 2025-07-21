import { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";

const feedbackOptions = [
  "Much appreciated!",
  "Irrelevant opinion",
  "Grateful for your opinion!",
];

const Comments = () => {
  const { postId } = useParams();
  const queryClient = useQueryClient();

  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [reported, setReported] = useState({});

  // Fetch comments
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/comments/${postId}`);
      return res.data;
    },
  });

  // Report comment mutation
  const mutation = useMutation({
    mutationFn: ({ commentId, feedback }) =>
      axios.patch(`http://localhost:3000/comments/report/${commentId}`, {
        feedback,
      }),
    onSuccess: (_, { commentId }) => {
      setReported((prev) => ({ ...prev, [commentId]: true }));
      queryClient.invalidateQueries(["comments", postId]);
    },
  });

  const handleReport = (commentId) => {
    const feedback = selectedFeedback[commentId];
    if (feedback) {
      mutation.mutate({ commentId, feedback });
    }
  };

  const openModal = (commentText) => {
    setModalContent(commentText);
    setShowModal(true);
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Comments on this Post</h2>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 border">Commenter Email</th>
                <th className="px-4 py-2 border">Comment</th>
                <th className="px-4 py-2 border">Feedback</th>
                <th className="px-4 py-2 border">Report</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => {
                const shortComment =
                  comment?.comment?.length > 20
                    ? `${comment.comment.slice(0, 20)}... `
                    : comment.comment;

                return (
                  <tr key={comment._id} className="border-b">
                    <td className="px-4 py-2 border">
                      {comment.commenterEmail}
                    </td>
                    <td className="px-4 py-2 border">
                      {shortComment}
                      {comment?.comment?.length > 20 && (
                        <button
                          onClick={() => openModal(comment.comment)}
                          className="text-blue-600 hover:underline text-sm ml-1"
                        >
                          Read More
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      <select
                        className="border p-1 rounded"
                        onChange={(e) =>
                          setSelectedFeedback((prev) => ({
                            ...prev,
                            [comment._id]: e.target.value,
                          }))
                        }
                        value={selectedFeedback[comment._id] || ""}
                        disabled={reported[comment._id]}
                      >
                        <option value="">Select feedback</option>
                        {feedbackOptions.map((fb, idx) => (
                          <option key={idx} value={fb}>
                            {fb}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleReport(comment._id)}
                        className={`px-3 py-1 rounded text-sm ${
                          reported[comment._id]
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                        disabled={
                          reported[comment._id] ||
                          !selectedFeedback[comment._id]
                        }
                      >
                        {reported[comment._id] ? "Reported" : "Report"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for full comment text */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Full Comment</h3>
            <p className="text-gray-700 mb-6">{modalContent}</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
