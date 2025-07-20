import { FaRegComments, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getCommentCount } from "../services/api"; // adjust path as needed
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


const PostCard = ({ post }) => {
    useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const voteCount = post.upVote - post.downVote;

  const { data: commentCount = 0 } = useQuery({
    queryKey: ["commentCount", post._id],
    queryFn: () => getCommentCount(post._id),
  });

  return (
    <Link to={`/posts/${post._id}`}>
      <div data-aos="fade-right" className="bg-white border p-4 rounded-lg shadow hover:shadow-md transition">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={post.authorImage}
            alt={post.authorName}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-semibold">{post.authorName}</span>
        </div>
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="text-sm text-gray-600">{post.tag}</p>
        <p className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleString()}
        </p>

        <div className="flex items-center gap-4 mt-3 text-sm text-gray-700">
          <span className="flex items-center gap-1">
            <FaThumbsUp /> {post.upVote}
          </span>
          <span className="flex items-center gap-1">
            <FaThumbsDown /> {post.downVote}
          </span>
          <span className="flex items-center gap-1">
            <FaRegComments /> {commentCount}
          </span>
          <span className="font-bold">Total Vote: {voteCount}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
