import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router"; // You said you're using `react-router`
import { getPopularPosts } from "../services/api";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


const FeaturedDiscussions = () => {
    useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => getPopularPosts(3), // Return top 3 posts
  });

  return (
    <section className="bg-white py-12 px-4 md:px-10 lg:px-20 rounded-lg shadow">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Featured Discussions 🔥
        </h2>

        {isLoading ? (
          <p className="text-gray-600">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500">No featured posts found.</p>
        ) : (
          <div data-aos="fade-down"   data-aos-easing="linear" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {post.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>👤 {post.authorName}</span>
                  <span>👍 {post.upVote - post.downVote}</span>
                </div>
                <Link
                  to={`/post/${post._id}`}
                  className="inline-block mt-4 text-blue-600 hover:underline"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDiscussions;
