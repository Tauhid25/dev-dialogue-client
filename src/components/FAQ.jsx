import React from "react";

const FAQ = () => {
  return (
    <section className="">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        Frequently Asked <span className="text-pink-500">Questions</span>
      </h2>

      <div className="mx-auto space-y-5">
        {/* Q1 */}
        <div className="collapse collapse-plus bg-white rounded-2xl shadow-lg hover:shadow-pink-200 transition duration-300 border border-gray-200">
          <input type="radio" name="faq-accordion" defaultChecked />
          <div className="collapse-title text-lg font-semibold text-gray-800">
            1. What is DevDialogue, and who is it for?
          </div>
          <div className="collapse-content text-gray-600">
            <p>
              DevDialogue is a platform for developers to connect, share
              knowledge, post projects, and grow together.
            </p>
          </div>
        </div>

        {/* Q2 */}
        <div className="collapse collapse-plus bg-white rounded-2xl shadow-lg hover:shadow-pink-200 transition duration-300 border border-gray-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-semibold text-gray-800">
            2. How can I share my projects on DevDialogue?
          </div>
          <div className="collapse-content text-gray-600">
            <p>
              You can upload project details, add descriptions, and showcase
              your work to inspire and collaborate.
            </p>
          </div>
        </div>

        {/* Q3 */}
        <div className="collapse collapse-plus bg-white rounded-2xl shadow-lg hover:shadow-pink-200 transition duration-300 border border-gray-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-semibold text-gray-800">
            3. Does DevDialogue support developer collaboration?
          </div>
          <div className="collapse-content text-gray-600">
            <p>
              Yes! Developers can comment, give feedback, and engage in
              discussions to build stronger communities and solutions.
            </p>
          </div>
        </div>

        {/* Q4 */}
        <div className="collapse collapse-plus bg-white rounded-2xl shadow-lg hover:shadow-pink-200 transition duration-300 border border-gray-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-semibold text-gray-800">
            4. What makes DevDialogue different from other platforms?
          </div>
          <div className="collapse-content text-gray-600">
            <p>
              DevDialogue focuses on developer-first features like project
              sharing, discussions, mentorship, and real-time community support.
            </p>
          </div>
        </div>

        {/* Q5 */}
        <div className="collapse collapse-plus bg-white rounded-2xl shadow-lg hover:shadow-pink-200 transition duration-300 border border-gray-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-semibold text-gray-800">
            5. Can I upgrade my account for more features?
          </div>
          <div className="collapse-content text-gray-600">
            <p>
              Yes, DevDialogue offers membership upgrades with premium features
              like advanced networking, project visibility, and insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;


