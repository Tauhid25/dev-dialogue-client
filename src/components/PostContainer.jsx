import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../services/api";
import PostCard from "./PostCard";
import Loading from "../pages/Loading/Loading";

const PostContainer = () => {
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts", sortByPopularity, page],
    queryFn: () => getAllPosts({ sortByPopularity, page, limit }),
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="space-y-2">
      <button
        className="btn btn-outline bg-[#009fff] text-white px-4 py-1 rounded-lg text-base hover:bg-[#007dff] cursor-pointer"
        onClick={() => setSortByPopularity(!sortByPopularity)}
      >
        Sort by {sortByPopularity ? "Newest" : "Popularity"}
      </button>

      <div>
        <h2 className="text-2xl font-bold mb-4">All Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="btn btn-sm"
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="btn btn-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostContainer;
