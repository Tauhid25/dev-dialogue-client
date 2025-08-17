import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router"; 
import { getPopularPosts } from "../services/api";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Loading from "../pages/Loading/Loading";


const FeaturedDiscussions = () => {
    useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => getPopularPosts(4), 
  });

  return (
    <section className="py-12  dark:bg-gray-800 dark:text-white">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-8 dark:text-white">
          Featured Discussions 🔥
        </h2>

        {isLoading ? (
          <Loading></Loading>
        ) : posts.length === 0 ? (
          <p className="text-gray-500">No featured posts found.</p>
        ) : (
          <div data-aos="fade-up"  className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300 dark:bg-gray-800 dark:text-white dark:border dark:border-white dark:rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 dark:text-white">
                  {post.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="dark:text-white">👤 {post.authorName}</span>
                  <span className="dark:text-white">👍 {post.upVote - post.downVote}</span>
                </div>
                <Link
                  to={`/posts/${post._id}`}
                  className="inline-block mt-4 text-blue-600 hover:underline dark:text-white"
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
