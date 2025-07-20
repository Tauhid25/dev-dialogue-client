import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import MyProfile from "../pages/Profile/MyProfile";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPost from "../pages/Post/AddPost";
import MyPosts from "../pages/Post/MyPosts";
import Membership from "../pages/Membership/Membership";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import Success from "../pages/Membership/Success";
import PostDetails from "../pages/Post/PostDetails";
import About from "../pages/About/About";
import AdminProfile from "../pages/Profile/AdminProfile";
import ReportedComments from "../pages/Dashboard/ReportedComments";
import Comments from "../pages/comments/Comments";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "../routes/AdminRoute";
import Forbidden from "../pages/Forbidden/Forbidden";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/posts/:id",
        element: (
          <PrivateRoute>
            <PostDetails></PostDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/membership",
        element: (
          <PrivateRoute>
            <Membership></Membership>
          </PrivateRoute>
        ),
      },
      {
        path: "/success",
        Component: Success,
      },
      {
        path: "/forbidden",
        Component: Forbidden,
      },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "/dashboard/my-profile",
        Component: MyProfile,
      },
      {
        path: "/dashboard/add-post",
        Component: AddPost,
      },
      {
        path: "/dashboard/my-posts",
        Component: MyPosts,
      },
      {
        path: "/dashboard/admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reported-comments",
        element: (
          <AdminRoute>
            <ReportedComments></ReportedComments>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/make-announcement",
        element: (
          <AdminRoute>
            <MakeAnnouncement></MakeAnnouncement>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/comments/:postId",
        element: (
          <AdminRoute>
            <Comments></Comments>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    Component: ErrorPage,
  },
]);
