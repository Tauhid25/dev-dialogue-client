import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";

const SearchResults = () => {
  const { searchText, searchResults } = useContext(AuthContext);

  if (!searchText) return null; // Don't render if no search

  return (
    <div className="py-6">
      <h3 className="text-2xl font-semibold mb-4">
        Search Results for: <span className="text-blue-600">#{searchText}</span>
      </h3>

      <div className="px-4 py-8 my-4 bg-white border rounded">
        {searchResults.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          <ul className="space-y-4">
            {searchResults.map((post) => (
              <li key={post._id} className="pb-3">
                <Link
                  to={`/posts/${post._id}`}
                  className="text-xl font-bold text-blue-700 hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-gray-600 text-sm">
                  {post.description.slice(0, 100)}...
                </p>
                <div className="text-sm mt-1 text-gray-400">
                  Tags:{" "}
                  {post.tags?.map((tag, i) => (
                    <span key={i}>#{tag} </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
