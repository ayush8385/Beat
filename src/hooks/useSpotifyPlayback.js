import { useEffect, useState } from "react";

const useSpotifyPlayback = (shouldInitialize) => {
  const [isPlayBackInitialised, setIsPlaybackInitialized] = useState(false);
  useEffect(() => {
    console.log("shouldInitialize", shouldInitialize);
    if (shouldInitialize) {
      // Ensure the SDK script is loaded
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      // Define the Spotify Web Playback SDK ready function
      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = localStorage.getItem("access_token");
        // eslint-disable-next-line no-undef
        const player = new Spotify.Player({
          name: "Beats Player",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 1,
        });

        player.addListener("ready", ({ device_id }) => {
          localStorage.setItem("deviceId", device_id);
          console.log("Ready with Device ID", device_id);
          setTimeout(() => {
            setIsPlaybackInitialized(true);
          }, 1000);
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.addListener("initialization_error", (res) => {
          console.log(res);
        });

        player.addListener("authentication_error", ({ message }) => {
          console.error(message);
        });

        player.addListener("account_error", ({ message }) => {
          console.error(message);
        });

        player.connect().then((success) => {
          if (success) {
            console.log(
              "The Web Playback SDK successfully connected to Spotify!"
            );
          }
        });
      };
    }
  }, [shouldInitialize]);
  return { isPlayBackInitialised };
};
export default useSpotifyPlayback;
