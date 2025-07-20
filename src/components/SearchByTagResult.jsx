import { useQuery } from "@tanstack/react-query";
import { getPostsByTag } from "../services/api";
import PostCard from "./PostCard";

const SearchByTagResult = ({ selectedTag }) => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["postsByTag", selectedTag],
    queryFn: () => getPostsByTag(selectedTag),
    enabled: !!selectedTag,
  });

  if (!selectedTag) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">
        Posts tagged with <span className="text-blue-600">#{selectedTag}</span>
      </h2>

      {isLoading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">No posts found for this tag.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchByTagResult;
