import { useMemo, useState } from "react";
import { PlayerContext } from "./PlayerContext";

const PlayerContextProvider = ({ children }) => {
  const [overlayBgUrl, setOverlayBgUrl] = useState(undefined);
  const [ isTrackPlaying, setIsTrackPlaying ] = useState(undefined);
  const [trackId, setTrackId] = useState(localStorage.getItem("trackId"));
  const [position, setPosition] = useState(0);
  const value = useMemo(
    () => ({
      overlayBgUrl,
      setOverlayBgUrl,
      isTrackPlaying,
      setIsTrackPlaying,
      trackId,
      setTrackId,
      position,
      setPosition,
    }),
    [overlayBgUrl, setOverlayBgUrl, isTrackPlaying, setIsTrackPlaying,trackId, setTrackId, position, setPosition]
  );
  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export default PlayerContextProvider;