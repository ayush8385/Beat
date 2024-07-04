import "./Dashboard.css";
import Logo from "../Logo";
import useFetchAccessToken from "../../hooks/useFetchAccessToken";
import NavBar from "../NavBar/NavBar";
import PlayerController from "../PlayerController/PlayerController";
import useSpotifyPlayback from "../../hooks/useSpotifyPlayback";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  const { loading } = useFetchAccessToken({fetchOnLoad:true});
  const { isPlayBackInitialised } = useSpotifyPlayback(!loading);

  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
        }}
      >
        <Logo />
      </div>
    );
  }

  return (
    <div className="container">
      <NavBar />
      <Outlet />
      {isPlayBackInitialised && (
        <PlayerController />
      )}
    </div>
  );
};
export default Dashboard;
