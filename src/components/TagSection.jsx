import { useQuery } from "@tanstack/react-query";
import { getTags } from "../services/api";
import Loading from "../pages/Loading/Loading";

const TagSection = ({ onTagClick }) => {
  const { data: tags = [], isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  if (isLoading) return <Loading></Loading>

  return (
    <div className="py-10">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Browse by Tags</h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagSection;

