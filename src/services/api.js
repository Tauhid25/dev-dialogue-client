import axios from "axios";

export const getSearchResults = async (query) => {
  const res = await axios.get(
    `https://dev-dialogue-server.vercel.app/posts/search?tag=${query}`
  );
  return res.data;
};

export const getPopularTags = async () => {
  const res = await axios.get("https://dev-dialogue-server.vercel.app/tags/popular");
  return res.data;
};

export const getAllPosts = async ({ sortByPopularity, tag, page, limit }) => {
  const params = {
    sort: sortByPopularity ? "popular" : "new",
    tag,
    page,
    limit,
  };
  const res = await axios.get("https://dev-dialogue-server.vercel.app/posts", { params });
  return res.data;
};

export const getAllTags = async () => {
  const res = await axios.get("https://dev-dialogue-server.vercel.app/tags");
  return res.data;
};

export const getAnnouncements = async () => {
  const res = await axios.get("https://dev-dialogue-server.vercel.app/announcements");
  return res.data;
};

// Get post details with comments
export const getPostDetails = async (id) => {
  const res = await axios.get(`https://dev-dialogue-server.vercel.app/posts/${id}`);
  return res.data;
};

// Submit comment
export const submitComment = async (commentData) => {
  try {
    const res = await axios.post("https://dev-dialogue-server.vercel.app/comments", commentData);
    return res.data;
  } catch (error) {
    console.error("Failed to submit comment:", error);
    throw new Error("Failed to submit comment");
  }
};

// Handle vote (upvote/downvote)
export const handleVote = async (postId, type, userEmail) => {
  const res = await axios.patch(`https://dev-dialogue-server.vercel.app/posts/${postId}/vote`, {
    type,
    userEmail,
  });
  return res.data;
};

// Get all posts by user
export const getMyPosts = async (email, page = 1, limit = 5) => {
  const res = await fetch(
    `https://dev-dialogue-server.vercel.app/posts/my-posts?email=${email}&page=${page}&limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

// // Delete post
export const deletePostById = async (postId) => {
  const res = await fetch(`https://dev-dialogue-server.vercel.app/posts/${postId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
};

// Membership upgrade
export const becomeMember = async (email) => {
  const res = await axios.patch(`https://dev-dialogue-server.vercel.app/users/membership`, {
    email,
  });
  return res.data;
};

// // Get all users, with optional search
export const getAllUsers = async ({ search = "", page = 1, limit = 5 }) => {
  const res = await axios.get(`https://dev-dialogue-server.vercel.app/admin/users`, {
    params: { search, page, limit },
  });
  return res.data;
};

// Make a user an admin
export const makeAdmin = async (userId) => {
  const res = await axios.patch(`https://dev-dialogue-server.vercel.app/users/${userId}`);
  return res.data;
};

export const getReportedComments = async () => {
  const res = await axios.get("https://dev-dialogue-server.vercel.app/comments/reported");
  return res.data;
};

export const handleReportAction = async (reportId, action) => {
  const res = await axios.patch(
    `https://dev-dialogue-server.vercel.app/comments/action/${reportId}`,
    { action }
  );
  return res.data;
};

export const createAnnouncement = async (announcement) => {
  const res = await axios.post(
    "https://dev-dialogue-server.vercel.app/announcements",
    announcement
  );
  return res.data;
};

export const getUserPosts = async (email) => {
  const res = await axios.get(
    `https://dev-dialogue-server.vercel.app/posts/my-profile?email=${email}`
  );
  return res.data;
};

export const getUserByEmail = async (email) => {
  const res = await axios.get(`https://dev-dialogue-server.vercel.app/users?email=${email}`);
  return res.data;
};

// Get total counts for admin dashboard stats
export const getAdminStats = async () => {
  const res = await axios.get("https://dev-dialogue-server.vercel.app/admin/stats");
  return res.data; // { postsCount, commentsCount, usersCount }
};

// Add new tag to the system
export const addTag = async (tag) => {
  const res = await axios.post("https://dev-dialogue-server.vercel.app/admin/tags", { tag });
  return res.data;
};

export const getCommentsByPostId = async (postId) => {
  const res = await axios.get(`https://dev-dialogue-server.vercel.app/comments/${postId}`);
  return res.data;
};

export const reportComment = async (commentId, feedback) => {
  const res = await axios.patch(
    `/https://dev-dialogue-server.vercel.app/comments/report/${commentId}`,
    { feedback }
  );
  return res.data;
};

export const getPostCountByUser = async (email) => {
  if (!email) return 0; // Prevent error on first render
  const res = await axios.get(
    `https://dev-dialogue-server.vercel.app/posts/count?email=${email}`
  );
  return res.data?.count || 0;
};

// src/services/api.js
export const getTags = async () => {
  const res = await axios.get("https://dev-dialogue-server.vercel.app/tags"); // Assumes your backend has this route
  return res.data; // Expected: [ "React", "MongoDB", "Firebase", ... ]
};

// src/services/api.js
export const submitNewPost = async (postData) => {
  const res = await axios.post("https://dev-dialogue-server.vercel.app/posts", postData);
  return res.data;
};

// Get a single post by ID
export const getPostById = async (id) => {
  const res = await axios.get(`https://dev-dialogue-server.vercel.app/posts/${id}`);
  return res.data;
};

// Vote on a post (upvote/downvote)
export const votePost = async (postId, type) => {
  const res = await axios.patch(
    `https://dev-dialogue-server.vercel.app/posts/${postId}/${type}`
  );
  return res.data;
};

// Search posts by tag
export const searchPostsByTag = async (tag) => {
  const res = await axios.get(
    `https://dev-dialogue-server.vercel.app/posts/search?tag=${encodeURIComponent(tag)}`
  );
  return res.data;
};

// Get popular posts (e.g. for featured discussions)
export const getPopularPosts = async (limit = 3) => {
  const res = await axios.get(
    `https://dev-dialogue-server.vercel.app/posts?sort=popular&limit=${limit}`
  );
  return res.data;
};

// Get top contributors
export const getTopContributors = async () => {
  const res = await axios.get("https://dev-dialogue-server.vercel.app/users/top-contributors");
  return res.data;
};

// Get posts by tag
export const getPostsByTag = async (tag) => {
  const res = await axios.get(
    `https://dev-dialogue-server.vercel.app/posts/search?tag=${encodeURIComponent(tag)}`
  );
  return res.data;
};

// Add tag
export const addNewTag = async (tag) => {
  const res = await axios.post("https://dev-dialogue-server.vercel.app/tags", { name: tag });
  return res.data;
};

// for save user profile
export const saveUser = async (user) => {
  const res = await axios.post("https://dev-dialogue-server.vercel.app/users", user);
  return res.data;
};

export const fetchUserByEmail = async (email) => {
  const res = await axios.get(`https://dev-dialogue-server.vercel.app/users?email=${email}`);
  return res.data;
};

// Get comment count by post ID
export const getCommentCount = async (postId) => {
  const res = await axios.get(`https://dev-dialogue-server.vercel.app/comments/count/${postId}`);
  return res.data.count;
};
