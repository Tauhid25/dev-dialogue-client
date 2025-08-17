import { useForm, Controller } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPostCountByUser,
  getTags,
  submitNewPost,
  getUserByEmail,
} from "../../services/api";
import { useNavigate } from "react-router";
import Select from "react-select";
import Loading from "../Loading/Loading";

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [limitReached, setLimitReached] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch up-to-date user info from DB
  const { data: dbUser, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () => getUserByEmail(user?.email),
    enabled: !!user?.email,
  });

  // Count user's posts
  const { data: postCount = 0, isLoading: countLoading } = useQuery({
    queryKey: ["userPostCount"],
    queryFn: () => getPostCountByUser(user?.email),
    enabled: !!user?.email,
  });

  // Set post limit restriction
  useEffect(() => {
    if (dbUser?.membership !== "gold" && postCount >= 5) {
      setLimitReached(true);
    }
  }, [dbUser, postCount]);
   // Tags
  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  // Post submission
  const mutation = useMutation({
    mutationFn: submitNewPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      reset();
      navigate("/dashboard/my-posts");
    },
  });

  const onSubmit = (data) => {
    const post = {
      authorName: user?.displayName,
      authorEmail: user?.email,
      authorImage: user?.photoURL,
      title: data.title,
      description: data.description,
      tags: data.tags.map((tag) => tag.value),
      upVote: 0,
      downVote: 0,
      createdAt: new Date(),
    };
    mutation.mutate(post);
  };

  if (userLoading || countLoading) return <Loading></Loading>;

  if (limitReached) {
    return (
      <div className="bg-white p-6 rounded shadow max-w-xl mx-auto text-center dark:bg-gray-800 dark:text-white dark:border dark:border-white">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Post Limit Reached
        </h2>
        <p className="text-gray-600 mb-6">
          You can only post 5 times as a regular user. Become a member to post
          more.
        </p>
        <button
          onClick={() => navigate("/membership")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
        >
          Become a Member
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow dark:bg-gray-800 dark:text-white dark:border dark:border-white">
      <h2 className="text-2xl font-bold mb-6">Add New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium">Post Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Enter post title"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">Title is required</span>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">
            Post Description
          </label>
          <textarea
            {...register("description", { required: true })}
            rows="5"
            className="w-full mt-1 p-2 border rounded"
            placeholder="Enter post description"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              Description is required
            </span>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 dark:text-white dark:bg-gray-800">Tags</label>
          <Controller
          className="dark:bg-gray-800 dark:text-white"
            control={control}
            name="tags"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={tags.map((tag) => ({ value: tag, label: `#${tag}` }))}
                isMulti
                className="dark:bg-gray-800 dark:text-white"
                placeholder="Select tags"
              />
            )}
          />
          {errors.tags && (
            <span className="text-red-500 text-sm dark:text-white">
              At least one tag is required
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
