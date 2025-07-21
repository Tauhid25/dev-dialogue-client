import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { becomeMember } from "../../services/api";

const Success = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [hasUpgraded, setHasUpgraded] = useState(false);

  const mutation = useMutation({
    mutationFn: () => becomeMember(user.email),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", user.email]);
      setHasUpgraded(true);
    },
    onError: (err) => {
      console.error("Membership upgrade failed:", err);
    },
  });

  useEffect(() => {
    if (user?.email && !hasUpgraded) {
            mutation.mutate();
    }
  }, [user?.email, hasUpgraded, mutation]);

  return (
    <div className="text-center mt-20">
      <h2 className="text-3xl font-bold text-green-600">✅ Payment Successful!</h2>
      <p className="mt-4 text-gray-600">
        You're now a <strong>Gold Member</strong> of DevDialogue 🎉
      </p>
      <button
        onClick={() => navigate("/dashboard/my-profile")}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Success;





