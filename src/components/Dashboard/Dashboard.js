import "./Dashboard.css";
import Logo from "../Logo";
import useFetchAccessToken from "../../hooks/useFetchAccessToken";
import NavBar from "../NavBar/NavBar";
import PlayerController from "../PlayerController/PlayerController";
import useSpotifyPlayback from "../../hooks/useSpotifyPlayback";
import { Outlet } from "react-router-dom";
import { useState } from "react";
const Dashboard = () => {
  const { loading } = useFetchAccessToken({fetchOnLoad:true});
  const { isPlayBackInitialised } = useSpotifyPlayback(!loading);
  const [trackId, setTrackId] = useState(localStorage.getItem("trackId"));
  const onPlayClick = (id) => {
    setTrackId(id);
  };
  const propsToPass = { onPlayClick };

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
      <Outlet context={{...propsToPass}} />
      {isPlayBackInitialised && (
        <PlayerController trackId={trackId} />
      )}
    </div>
  );
};
export default Dashboard;
