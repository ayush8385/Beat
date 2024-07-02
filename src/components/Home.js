import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_CONSTANTS } from "../constants";
import useFetchAccessToken from "../hooks/useFetchAccessToken";
import Albums from "./Album/Albums";
import useFetchProfile from "../hooks/useFetchProfile";

const Home = () => {
  const { accessToken } = useFetchAccessToken();
  const [newReleaseAlbums, setNewReleaseAlbums] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const { userProfileData } = useFetchProfile({ fetchOnLoad: true });
  const navigate = useNavigate();

  const fetchNewReleaseAlbums = () => {
    fetch(API_CONSTANTS.NEW_RELEASES, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          navigate("/login");
        } else {
          setNewReleaseAlbums(data?.albums?.items);
        }
      });
  };
  const fetchUserPlaylists = () => {
    fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserPlaylists(data?.items);
      });
  };

  useEffect(() => {
    fetchNewReleaseAlbums();
    fetchUserPlaylists();
  }, []);
  return (
    <div style={{width: '100%'}}>
      {newReleaseAlbums.length > 0 && (
        <div style={{marginTop: 20}}>
          <p
            style={{
              color: "white",
              fontFamily: "Oxygen",
              fontSize: 14,
              fontWeight: 700,
              marginLeft: 30,
            }}
          >
            Releases
          </p>
          <Albums type={"album"} albums={newReleaseAlbums} />
        </div>
      )}
      {userPlaylists.length > 0 && (
        <div style={{marginTop: 20}}>
          <p
            style={{
              color: "white",
              fontFamily: "Oxygen",
              fontSize: 14,
              fontWeight: 700,
              marginLeft: 30,
            }}
          >
            Playlists
          </p>
          <Albums type={"playlists"} albums={userPlaylists} />
        </div>
      )}
    </div>
  );
};
export default Home;
