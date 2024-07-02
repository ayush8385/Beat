import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AlbumDetail from "./Album/AlbumDetail";
import Home from "./Home";

const AlbumNavigator = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/album?:id",
      element: <AlbumDetail/>,
    },
  ]);
  return <RouterProvider router={router} />;
};
export default AlbumNavigator;
