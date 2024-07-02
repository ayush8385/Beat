import { useEffect, useState } from "react";
import { API_CONSTANTS } from "../../constants";
import Logo from "../Logo";
import { useNavigate } from "react-router-dom";

const Artists = ({ artists, accessToken }) => {
  const [loading, setLoading] = useState(true);
  const [artistsData, setArtistsData] = useState([]);
  const navigate = useNavigate();
  const getArtists = (artistIds) => {
    fetch(`${API_CONSTANTS.GET_ARTISTS}?ids=${artistIds}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          if (data.error.status === 401) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            navigate("/login");
          }
        } else {
          setLoading(false);
          setArtistsData(data?.artists);
        }
      })
      .catch((error) => console.log("Artists", error));
  };
  useEffect(() => {
    const artistIds = [];
    artists?.forEach((element) => {
      artistIds.push(element.id);
    });
    getArtists(artistIds);
  }, [artists]);
  if (loading) {
    return <Logo />;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
        scrollbarWidth: "none",
        height: "100%",
        width: "100%",
      }}
    >
      {artistsData &&
        artistsData.map((artist, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                marginBottom: 10,
                width: "100%",
                alignItems: "center",
              }}
            >
              <img
                width={60}
                height={60}
                style={{ borderRadius: 50, marginRight: 20 }}
                src={artist?.images[1].url}
              />
              <div style={{ marginTop: 0, minWidth: 220, marginRight: 20 }}>
                <p
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontFamily: "Oxygen",
                    fontWeight: 700,
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {artist?.name}
                </p>
                <p
                  style={{
                    color: "white",
                    fontSize: 12,
                    fontFamily: "Oxygen",
                    fontWeight: 400,
                    opacity: 0.8,
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {artist?.followers?.total} Followers
                </p>
              </div>
              <p className="viewMoreBg" style={{ color: "#1bb954", opacity:0.8 }}>
                {`View More`}
              </p>
            </div>
          );
        })}
    </div>
  );
};
export default Artists;
