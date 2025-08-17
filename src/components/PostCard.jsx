// import { FaRegComments, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
// import { Link } from "react-router"; 
// import { useQuery } from "@tanstack/react-query";
// import { getCommentCount } from "../services/api";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { useEffect } from "react";

// const PostCard = ({ post }) => {
//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   const voteCount = post.upVote - post.downVote;

//   const { data: commentCount = 0 } = useQuery({
//     queryKey: ["commentCount", post._id],
//     queryFn: () => getCommentCount(post._id),
//   });

//   return (
//     <Link to={`/posts/${post._id}`}>
//       <div
//         data-aos="fade-up"
//         className="bg-white border p-4 rounded-lg shadow hover:shadow-md transition"
//       >
//         {/* Author Info */}
//         <div className="flex items-center gap-2 mb-2">
//           <img
//             src={post.authorImage}
//             alt={post.authorName}
//             className="w-10 h-10 rounded-full"
//           />
//           <span className="font-semibold">{post.authorName}</span>
//         </div>

//         {/* Title */}
//         <h2 className="text-xl font-bold mb-1">{post.title}</h2>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 mb-2">
//           {post.tags?.map((tag, index) => (
//             <span
//               key={index}
//               className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
//             >
//               #{tag}
//             </span>
//           ))}
//         </div>

//         {/* Date */}
//         <p className="text-xs text-gray-400 mb-2">
//           {new Date(post.createdAt).toLocaleString()}
//         </p>

//         {/* Vote & Comment Stats */}
//         <div className="flex items-center gap-4 mt-3 text-sm text-gray-700">
//           <span className="flex items-center gap-1">
//             <FaThumbsUp /> {post.upVote}
//           </span>
//           <span className="flex items-center gap-1">
//             <FaThumbsDown /> {post.downVote}
//           </span>
//           <span className="flex items-center gap-1">
//             <FaRegComments /> {commentCount}
//           </span>
//           <span className="font-bold">Total Vote: {voteCount}</span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default PostCard;




import { FaRegComments, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Link } from "react-router"; 
import { useQuery } from "@tanstack/react-query";
import { getCommentCount } from "../services/api";
import AOS from "aos";
import "aos/dist/aos.css";
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

  // ✅ Short description (first 10 words only)
  const shortDescription = post.description
    ? post.description.split(" ").slice(0, 10).join(" ") + "..."
    : "";

  return (
    <Link to={`/posts/${post._id}`}>
      <div
        data-aos="fade-up"
        className="bg-white p-4 rounded-lg shadow hover:shadow-md transition dark:bg-gray-800 dark:text-white dark:border dark:border-white"
      >
        {/* Author Info */}
        <div className="flex items-center gap-2 mb-2">
          <img
            src={post.authorImage}
            alt={post.authorName}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-semibold">{post.authorName}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-1">{post.title}</h2>

        {/* Short Description */}
        <p className="text-sm text-gray-600 mb-2 dark:text-white">{shortDescription}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {post.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-800 dark:text-white"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Date */}
        <p className="text-xs text-gray-400 mb-2 dark:text-white">
          {new Date(post.createdAt).toLocaleString()}
        </p>

        {/* Vote & Comment Stats */}
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-700">
          <span className="flex items-center gap-1 dark:text-white">
            <FaThumbsUp /> {post.upVote}
          </span>
          <span className="flex items-center gap-1 dark:text-white">
            <FaThumbsDown /> {post.downVote}
          </span>
          <span className="flex items-center gap-1 dark:text-white">
            <FaRegComments /> {commentCount}
          </span>
          <span className="font-bold dark:text-white">Total Vote: {voteCount}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
