import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import { getUserPosts, getUserByEmail } from "../../services/api";
import Loading from "../Loading/Loading";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  const { data: posts = [], isLoading: isPostsLoading } = useQuery({
    queryKey: ["userPosts", user?.email],
    queryFn: () => getUserPosts(user.email),
    enabled: !!user?.email,
  });

  const { data: userInfo } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () => getUserByEmail(user.email),
    enabled: !!user?.email,
  });

  const membership = userInfo?.membership || "bronze";

  const badge =
    membership === "gold" ? (
      <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded font-semibold flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
        Gold Badge
      </span>
    ) : (
      <span className="bg-gray-300 text-gray-800 px-2 py-1 rounded font-semibold flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
        Bronze Badge
      </span>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded p-6 mt-8">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <img
          src={
            user?.photoURL ||
            userInfo?.photoURL ||
            "https://i.ibb.co/7gP3v9T/user.png"
          }
          alt={user?.displayName || userInfo?.name}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-3xl font-bold">
            {userInfo?.name || user?.displayName}
          </h1>
          <p className="text-gray-600">{user?.email}</p>
          <div className="mt-2">{badge}</div>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
        {isPostsLoading ? (
          <Loading></Loading>
        ) : posts.length === 0 ? (
          <p className="text-gray-500">You have not posted anything yet.</p>
        ) : (
          <ul className="space-y-3">
            {posts.slice(0, 3).map((post) => (
              <li key={post._id} className="border-b pb-2">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-gray-500 text-sm">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default MyProfile;
