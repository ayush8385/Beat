import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import AlbumDetail from "./Album/AlbumDetail";
import Home from "./Home";
import PlayListDetail from "./PlayList/PlaylistDetail";

const RootNavigator = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/album/:id",
          element: <AlbumDetail />,
        },
        {
          path: "/playlists/:id",
          element: <PlayListDetail />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
};
export default RootNavigator;
