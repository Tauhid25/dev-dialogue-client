import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { stripePromise } from "../../services/stripe";

const Membership = () => {
  const { user } = useContext(AuthContext);

  const handleMembership = async () => {
    if (!user) return alert("Please log in first.");

    try {
      const stripe = await stripePromise;

      const res = await axios.post(
        "http://localhost:3000/create-checkout-session",
        {
          email: user.email,
        }
      );

      await stripe.redirectToCheckout({ sessionId: res.data.id });
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-2 md:mx-auto bg-white p-6 rounded shadow mt-10 text-center border border-b-gray-500">
      <h2 className="text-3xl font-bold text-[#009fff] mb-4">
        Upgrade to Gold Membership
      </h2>
      <p className="text-gray-600 mb-6">
        Become a member for <span className="font-semibold">$ 100</span> to
        enjoy exclusive benefits:
      </p>
      <ul className="list-disc list-inside text-left mb-6 text-gray-700">
        <li>Post more than 5 posts</li>
        <li>
          Earn a <strong>Gold Badge</strong> on your profile
        </li>
        <li>Get highlighted among other users</li>
      </ul>
      <button
        onClick={handleMembership}
        className="btn btn-outline bg-[#009fff] text-white px-4 py-1 rounded-lg text-base hover:bg-[#007dff] cursor-pointer"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Membership;
