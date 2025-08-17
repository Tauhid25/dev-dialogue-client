import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPostById,
  votePost,
  submitComment,
  getCommentsByPostId,
} from "../../services/api";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FacebookShareButton, FacebookIcon } from "react-share";
import Loading from "../Loading/Loading";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const shareUrl = `${window.location.origin}/post/${id}`;

  const { data: post, isLoading: loadingPost } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });

  const { data: comments = [], isLoading: loadingComments } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getCommentsByPostId(id),
  });

  const voteMutation = useMutation({
    mutationFn: ({ postId, type }) => votePost(postId, type),
    onSuccess: () => queryClient.invalidateQueries(["post", id]),
  });

  const commentMutation = useMutation({
    mutationFn: (comment) => submitComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", id]);
      setCommentText("");
    },
  });

  const handleVote = (type) => {
    if (!user) return alert("Please login to vote");
    voteMutation.mutate({ postId: id, type });
  };

  const handleComment = () => {
    if (!user) return alert("Please login to comment");
    if (!commentText.trim()) return;
    commentMutation.mutate({
      postId: id,
      commenterEmail: user.email,
      commenterName: user.displayName,
      comment: commentText,
    });
  };

  if (loadingPost) return <Loading></Loading>;

  return (
   <div className="pt-8 min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white">
     <div className="max-w-3xl mx-2 md:mx-4 lg:mx-auto my-4 p-4 bg-white border rounded shadow dark:bg-gray-800 dark:text-white dark:border dark:border-white">
      {/* Post Header */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={post.authorImage}
          alt="author"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h4 className="font-semibold">{post.authorName}</h4>
          <p className="text-sm text-gray-500 dark:text-white">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="mb-3 text-gray-700 dark:text-white ">{post.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, i) => (
          <span key={i} className="bg-gray-200 text-sm px-2 py-1 rounded-full dark:bg-gray-800 dark:text-white">
            #{tag}
          </span>
        ))}
      </div>

      {/* Vote & Share */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => handleVote("upVote")} className="btn btn-sm dark:bg-gray-700 dark:text-white dark:border dark:border-white">
          ⬆️ {post.upVote}
        </button>
        <button onClick={() => handleVote("downVote")} className="btn btn-sm dark:bg-gray-700 dark:text-white dark:border dark:border-white">
          ⬇️ {post.downVote}
        </button>
        <FacebookShareButton url={shareUrl} quote={post.title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>

      {/* Comment Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>

        {/* Add Comment */}
        <div className="mb-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full border rounded p-2"
            rows={3}
            placeholder="Write a comment..."
          />
          <button
            onClick={handleComment}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded cursor-pointer"
          >
            Comment
          </button>
        </div>

        {/* Display Comments */}
        {loadingComments ? (
         <Loading></Loading>
        ) : comments.length > 0 ? (
          <ul className="space-y-3 ">
            {comments.map((c, i) => (
              <li key={i} className="bg-gray-50 p-3 rounded border dark:bg-gray-700 dark:text-white dark:border-white">
                <p className="text-sm text-gray-700 dark:text-white">{c.comment}</p>
                <p className="text-xs text-gray-400 dark:text-white">
                  By {c.commenterEmail} on{" "}
                  {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
   </div>
  );
};

export default PostDetails;
