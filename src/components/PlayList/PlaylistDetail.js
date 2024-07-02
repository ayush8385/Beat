import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import useFetchAccessToken from "../../hooks/useFetchAccessToken";
import { useEffect, useState } from "react";
import { API_CONSTANTS } from "../../constants";
import { getYear } from "../../utils";
import Tracks from "../Album/Tracks";
import Logo from "../Logo";

const PlaylistDetail = () => {
  const context = useOutletContext();
  const { onPlayClick } = context;
  const { accessToken } = useFetchAccessToken();
  const [playlistData, setPlaylistData] = useState(null);
  const [tracks, setTracks] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getPlaylistDetails = (id) => {
    fetch(`${API_CONSTANTS.PLAYLIST_DETAIL_API}${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data');
        if (data.error) {
          if (data.error.status === 401) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            navigate("/login");
          }
        } else {
          setTimeout(() => {
            console.log("playlistData",data);
            setPlaylistData(data);
            setTracks(data.tracks.items);
          }, 2000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getPlaylistDetails(id);
  }, [id]);

  return (
    <div
      style={{
        width: "100%",
        height: "68%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      {playlistData ? (
        <>
          <div
            style={{
              display: "flex",
              width: "40%",
              height: "100%",
              padding: "0px 30px",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", marginBottom: 10 }}>
              <img
                width={200}
                height={200}
                style={{ borderRadius: 14, marginRight: 20 }}
                src={playlistData?.images[0].url}
              />
              <div
                style={{
                  height: "100%",
                  paddingBottom: 20,
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "white",
                      fontFamily: "Oxygen",
                      fontWeight: 700,
                      fontSize: 18,
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {playlistData?.name}
                  </p>
                  <p
                    style={{
                      color: "white",
                      fontFamily: "Oxygen",
                      fontWeight: 700,
                      fontSize: 14,
                      opacity: 0.8,
                      margin: 0,
                      padding: 0,
                      marginTop: 5,
                    }}
                  >
                    {getYear(playlistData?.release_date)} | {playlistData?.label}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                  }}
                >
                  <div
                    style={{
                      alignSelf: "flex-end",
                      padding: "6px 10px",
                      backgroundColor: "#1bb954",
                      borderRadius: 8,
                      marginRight: 30,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <i
                      style={{
                        fontSize: 14,
                        color: "rgb(255, 255, 255)",
                        marginRight: 6,
                      }}
                      class="fa fa-play"
                    />
                    <p
                      style={{
                        color: "white",
                        margin: 0,
                        fontFamily: "Oxygen",
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      Play All
                    </p>
                  </div>
                  <div
                    style={{
                      alignSelf: "flex-end",
                      padding: "6px 10px",
                      backgroundColor: "#1bb954",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <i
                      style={{
                        fontSize: 14,
                        color: "rgb(255, 255, 255)",
                        marginRight: 6,
                      }}
                      class="fas fa-random"
                    />
                    <p
                      style={{
                        color: "white",
                        margin: 0,
                        fontFamily: "Oxygen",
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      Shuffle
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <Artists artists={playlistData?.artists} accessToken={accessToken} /> */}
          </div>
          <div
            style={{
              display: "flex",
              width: "60%",
              height: "100%",
            }}
          >
            <Tracks onPlayClick={(id) => onPlayClick(id)} tracks={tracks} type={"playlist"} />
          </div>
        </>
      ) : (
        <Logo />
      )}
    </div>
  );
};
export default PlaylistDetail;
