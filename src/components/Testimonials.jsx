import review1Img from "../assets/review-1.jpg";
import review2Img from "../assets/review-2.jpg";
import review3Img from "../assets/review-3.jpg";
import review4Img from "../assets/review-4.jpg";
import review5Img from "../assets/review-5.jpg";
import review6Img from "../assets/review-6.jpg";
import review7Img from "../assets/review-7.jpg";
import review8Img from "../assets/review-8.jpg";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      img: review1Img,
      name: "Sharif Khan",
      text: "DevDialogue is simple, clean, and powerful. I enjoy sharing knowledge with like-minded developers.",
    },
    {
      img: review2Img,
      name: "Ashik Chowdhury",
      text: "A perfect platform for exploring discussions. The interface is smooth, and search works wonderfully.",
    },
    {
      img: review3Img,
      name: "Rubel Biswas",
      text: "Finally, a place where learning feels interactive and community-driven. DevDialogue makes it enjoyable daily.",
    },
    {
      img: review4Img,
      name: "Jahangir Alom",
      text: "I love how fast DevDialogue is. Finding trending posts is quick and effortless always.",
    },
    {
      img: review5Img,
      name: "Rubina Chowdhury",
      text: "The feedback and reporting system ensures safe, reliable discussions. It feels professional and trustworthy.",
    },
    {
      img: review6Img,
      name: "Shahin Naik",
      text: "DevDialogue connects me with developers worldwide. Knowledge-sharing has never been this fun before.",
    },
    {
      img: review7Img,
      name: "Nahid Sarkar",
      text: "The design is clean, modern, and distraction-free. Perfect for exploring new tech conversations.",
    },
    {
      img: review8Img,
      name: "Babul Islam",
      text: "Posting, commenting, and exploring is seamless here. DevDialogue truly inspires learning and collaboration daily.",
    },
  ];

  return (
    <div>
      <div className="text-center mb-10 pt-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold py-2 md:py-4 dark:text-white">
          Voices of Our Happy Members
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto dark:text-white">
          Discover genuine stories and experiences from members who found value,
          connection, and inspiration with DevDialogue.
        </p>
      </div>

      {/* Scrolling Wrapper */}
      <div className="overflow-hidden">
        <div className="flex gap-6 animate-[scrollLeft_20s_linear_infinite]">
          {[...Array(2)].map((_, i) =>
            reviews.map((review, idx) => (
              <div
                key={`${review.name}-${i}`}
                className="bg-white p-6 rounded-2xl min-w-[250px] flex flex-col items-center text-center shadow-md border border-gray-200 dark:bg-gray-800 dark:text-white dark:border-white dark:border"
              >
                <img
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                  src={review.img}
                  alt={review.name}
                />
                <p className="text-lg font-semibold">{review.name}</p>
                <p className="text-xs text-gray-600 mt-2 dark:text-white">{review.text}</p>
                <div className="flex justify-center items-center py-3">
                  {[...Array(5)].map((_, starIdx) => (
                    <FaStar key={starIdx} color="orange" />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
