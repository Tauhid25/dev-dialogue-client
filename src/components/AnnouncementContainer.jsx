import { useQuery } from "@tanstack/react-query";
import { getAnnouncements } from "../services/api";
import AnnouncementCard from "./AnnouncementCard";
import Loading from "../pages/Loading/Loading";

const AnnouncementContainer = () => {
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: getAnnouncements,
  });

  if (isLoading) return <Loading></Loading>;
  if (announcements.length === 0) return null; // Hide section if none

  return (
    <div className="rounded-lg ">
      <h2 className="text-2xl font-bold text-center mb-4">Announcements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcements.map((item) => (
          <AnnouncementCard key={item._id} item={item}></AnnouncementCard>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementContainer;
