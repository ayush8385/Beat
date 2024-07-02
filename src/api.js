import { API_CONSTANTS } from "./constants";

export const playTrack = ({
  uri,
  position = 0,
  accessToken,
  handleResponse,
} = {}) => {
  fetch(`${API_CONSTANTS.PLAY_TRACK}${localStorage.getItem("deviceId")}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      uris: [uri],
      position_ms: position,
    }),
  })
    .then((data) => {
      if (handleResponse) {
        handleResponse(data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const pauseTrack = ({ accessToken, handleResponse }) => {
  fetch(`${API_CONSTANTS.PAUSE_TRACK}${localStorage.getItem("deviceId")}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  }).then((data) => handleResponse(data));
};
