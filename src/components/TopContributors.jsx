import { useQuery } from "@tanstack/react-query"
import { getTopContributors } from "../services/api"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Loading from "../pages/Loading/Loading";


const TopContributors = () => {
    useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const { data: contributors = [], isLoading } = useQuery({
    queryKey: ["topContributors"],
    queryFn: getTopContributors,
  })

  return (
    <section className="pt-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-[#007dff] pb-8 dark:text-white">
         Top Contributors
      </h2>
      {isLoading ? (
        <Loading></Loading>
      ) : contributors.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-white">No top contributors found.</p>
      ) : (
        <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contributors.map((user) => (
            <div
              key={user._id}
              className="bg-gray-50  p-5 rounded-lg shadow-md text-center dark:bg-gray-800 dark:text-white dark:border dark:border-white"
            >
              <img
                src={user.photoURL || "/default-user.png"}
                alt={user.name}
                className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border"
              />
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-600 ">{user.email}</p>
              <p className="text-sm text-yellow-600 font-semibold mt-2 dark:text-white">
                ⭐ {user.upVotes} Total Upvotes
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default TopContributors
