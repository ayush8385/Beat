import { API_CONSTANTS, client_id, redirect_uri } from "../../constants";
import Logo from "../Logo";
import "./Login.css";
const Login = () => {

  const authoriseSpotifyUser = () => {
    let url = API_CONSTANTS.AUTHORIZE_API;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show-dialogue=true";
    url +=
      "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url;
  };
  return (
    <div className="loginBox">
      <Logo />
      <p
        style={{
          fontSize: 22,
          color: "white",
          fontWeight: 700,
          marginTop: 24,
          fontFamily: "Oxygen",
          opacity: 0.8,
        }}
      >
        Welcome to Beats
      </p>
      <div
        onClick={() => authoriseSpotifyUser()}
        class="button-box"
      >
        <p>Login With Spotify</p>
        <img
          width="30"
          height="30"
          src="https://static-00.iconduck.com/assets.00/spotify-icon-2048x2048-n3imyp8e.png"
        />
      </div>
    </div>
  );
};
export default Login;
