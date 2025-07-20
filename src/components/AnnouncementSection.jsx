import { useQuery } from '@tanstack/react-query'
import { getAnnouncements } from '../services/api'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const AnnouncementSection = () => {
    useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: getAnnouncements,
  })

  if (isLoading) return <p>Loading announcements...</p>
  if (announcements.length === 0) return null // Hide section if none

  return (
    <div className="rounded-lg ">
      <h2 className="text-2xl font-bold text-center mb-4">Announcements</h2>
      <div className="space-y-4">
        {announcements.map((item) => (
          <div data-aos="fade-left" key={item._id} className="bg-white p-4 rounded shadow border">
            <div  className="flex items-center gap-3 mb-2 lg:[height:61px]">
              <img
                src={item.authorImage}
                alt={item.authorName}
                className="w-10 h-10 rounded-full"
              />
              <h3 className="font-semibold">{item.authorName}</h3>
            </div>
            <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnnouncementSection
