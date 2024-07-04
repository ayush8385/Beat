import { useContext, useEffect, useState } from "react";
import Controller from "./Controller";
import "./PlayerController.css";
import ProgressBar from "./ProgressBar";
import { API_CONSTANTS } from "../../constants";
import useFetchAccessToken from "../../hooks/useFetchAccessToken";
import Logo from "../Logo";
import { PlayerContext } from "../../contexts/PlayerContext";
import { playTrack } from "../../api";
import { useNavigate } from "react-router-dom";
const PlayerController = () => {
  const { accessToken } = useFetchAccessToken();
  const [trackData, setTrackData] = useState(null);
  const [trackProgress, resetTrackProgress] = useState(0);
  const { setOverlayBgUrl, setIsTrackPlaying, trackId, position } =
    useContext(PlayerContext);
  const navigate = useNavigate();

  const getTrackData = (id) => {
    fetch(`${API_CONSTANTS.GET_TRACK}${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTrackData(data);
        playTrack({
          uri: data?.uri,
          position: position,
          accessToken: accessToken,
          handleResponse: (data) => handleResponse(data),
        });
      });
  };

  const handleResponse = (data) => {
    if (data?.status === 204) {
      resetTrackProgress(trackData?.duration_ms);
      setOverlayBgUrl(trackData?.album?.images[1].url);
      setIsTrackPlaying(true);
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/login");
      console.log(data?.error);
    }
  };

  useEffect(() => {
    if (trackId) {
      localStorage.setItem("trackId", trackId);
      getTrackData(trackId);
    }
  }, [trackId]);

  return (
    <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
      {trackData ? (
        <>
          <Controller trackData={trackData} />
          {trackProgress > 0 && trackId ? (
            <ProgressBar duration={trackProgress} />
          ) : (
            <div style={{ height: 8,      backgroundColor: "rgba(255,255,255,0.1)", }}></div>
          )}
        </>
      ) : (
        <Logo />
      )}
    </div>
  );
};
export default PlayerController;
