import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnnouncement } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: createAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries(["announcements"]);
      Swal.fire({
        title: "Good job!",
        text: "You have successfully made an announcement!",
        icon: "success",
      });
      reset();
    },
  });

  const onSubmit = (data) => {
    if (!user) return alert("User not logged in");

    const announcementData = {
      ...data,
      authorName: user.displayName,
      authorImage: user.photoURL,
    };

    mutation.mutate(announcementData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-[#009fff] mb-4">
        Make Announcement
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.title && <p className="text-red-500 text-sm">Required</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border px-3 py-2 rounded min-h-[100px]"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">Required</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-outline bg-[#009fff] text-white px-4 py-1 rounded-lg text-base hover:bg-[#007dff] cursor-pointer"
        >
          Submit Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
