// import useFetchDevices from "../../hooks/useFetchDevices";
import { useContext, useEffect, useState } from "react";
import "./PlayerController.css";
import { PlayerContext } from "../contexts/PlayerContext";
import { API_CONSTANTS } from "../../constants";
import useFetchAccessToken from "../../hooks/useFetchAccessToken";
import { pauseTrack, playTrack } from "../../api";
const Controller = ({ trackData }) => {
  const { isTrackPlaying, setIsTrackPlaying } = useContext(PlayerContext);
  const [playStateIcon, setPlayStateIcon] = useState("play");
  const { accessToken } = useFetchAccessToken();
  useEffect(() => {
    if (isTrackPlaying) {
      setPlayStateIcon("pause");
    } else {
      setPlayStateIcon("play");
    }
  }, [isTrackPlaying]);
  const playPauseTrack = () => {
    if (isTrackPlaying) {
      pauseTrack({
        accessToken: accessToken,
        handleResponse: (data) => {
          if (data?.status === 204) {
            setIsTrackPlaying(false);
          }
        },
      });
    } else {
      playTrack({
        uri: trackData?.uri,
        position: 20000,
        accessToken,
        handleResponse: (data) => {
          if (data?.status === 204) {
            setIsTrackPlaying(true);
          }
        },
      });
    }
  };
  return (
    <div
      className="controllerBg"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "0px 0px",
        padding: "10px 20px",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flex: 1,
        }}
      >
        <img className="songImage" src={trackData?.album?.images[1].url} />
        <div className="songName">
          <p
            style={{
              padding: 0,
              margin: 0,
              fontSize: 16,
              fontFamily: "Oxygen",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.3,
            }}
          >
            {trackData?.name}
          </p>
          <div style={{ display: "flex", marginTop: 3 }}>
            {trackData?.artists.map((item, ind) => {
              return (
                <p
                  key={ind}
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: 12,
                    fontFamily: "Oxygen",
                    fontWeight: 700,
                    color: "white",
                    opacity: 0.8,
                  }}
                >
                  {ind > 0 ? ", " : ""}
                  {item.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div id="music_controls">
        <div>
          <i
            style={{ fontSize: 22, color: "rgb(179, 178, 178)" }}
            onclick="shuffle()"
            class="fas fa-random"
          ></i>
        </div>
        <div>
          <i
            style={{ fontSize: 22, color: "rgb(190, 190, 190)" }}
            onclick="previous()"
            class="fa fa-step-backward"
            aria-hidden="true"
          ></i>
        </div>

        <div
          key={playStateIcon}
          onClick={() => playPauseTrack()}
          id="play_pause"
        >
          <i
            style={{ fontSize: 38, color: "whitesmoke" }}
            class={`fa fa-${playStateIcon}-circle-o`}
            aria-hidden="true"
          />
        </div>

        <div>
          <i
            style={{ fontSize: 22, color: "rgb(190, 190, 190)" }}
            onclick="next()"
            class="fa fa-step-forward"
            aria-hidden="true"
          ></i>
        </div>
        <div>
          <i
            style={{ fontSize: 22, color: "rgb(190, 190, 190)" }}
            onclick="repeat()"
            class="fas fa-sync    "
          ></i>
        </div>
      </div>
      <div id="options">
        {/* <div>
          <i
            style={{ color: "rgb(190, 190, 190)" }}
            class="fas fa-sliders-h"
          ></i>
        </div>
        <div style={{ position: "relative" }}>
          <i
            style={{ color: "rgb(190, 190, 190)" }}
            class="fab fa-chromecast"
          ></i>
          <div id="device_dropdown"></div>
        </div> */}
        <i style={{ color: "rgb(190, 190, 190)" }} class="fas fa-volume-up"></i>
        <div id="volume_bar">
          <div id="vol_inside"></div>
          <div id="vol_point"></div>
        </div>
      </div>
    </div>
  );
};
export default Controller;
