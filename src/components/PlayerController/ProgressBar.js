import { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { seekTrack } from "../../api";
import useFetchAccessToken from "../../hooks/useFetchAccessToken";

const ProgressBar = ({ duration }) => {
  const progressBarRef = useRef(null);
  const { accessToken } = useFetchAccessToken();
  const { isTrackPlaying, setPosition } = useContext(PlayerContext);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (progressBarRef.current) {
      if (isTrackPlaying) {
        console.log('here')
        progressBarRef.current.style.transition = `width ${
          duration
        }ms linear`;
        // progressBarRef.current.style.width = `100%`;
        progressBarRef.current.getBoundingClientRect(); // force reflow
        progressBarRef.current.style.width = "100%";
      } else {
        setPosition(elapsedTime);
        progressBarRef.current.style.transition = "none";
        progressBarRef.current.style.width = `0%`;
      }
    }
  }, [duration, isTrackPlaying, elapsedTime]);

  useEffect(() => {
    let interval;
    if (isTrackPlaying) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => {
          const newElapsedTime = prevElapsedTime + 1000;
          if (newElapsedTime >= duration) {
            clearInterval(interval);
            return duration;
          }
          return newElapsedTime;
        });
      }, 1000);
    } else if (!isTrackPlaying && elapsedTime !== duration) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTrackPlaying, elapsedTime, duration]);

  const handleClick = (event) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    console.log(event.target.offsetWidth);
    const clickPositionPercent = (clickX / event.target.offsetWidth) * 100;
    progressBarRef.current.style.width = `${clickPositionPercent}%`;
    progressBarRef.current.style.transition = "none";
    const clickPositionMs = (clickPositionPercent / 100) * duration;
    seekTrack({ accessToken, clickPositionMs }).then(()=> {
      // setElapsedTime(clickPositionMs);
      // progressBarRef.current.style.transition = "none";
      // progressBarRef.current.style.width = `${
      //   (clickPositionMs / duration) * 100
      // }%`;
      // setPosition(clickPositionMs);
    });
  };

  return (
    <div
      style={{
        width: "100%",
        height: 8,
        backgroundColor: "rgba(255,255,255,0.1)",
        position:'relative',
      }}
    >
      <div
        ref={progressBarRef}
        style={{ width: "0%", height: 8, backgroundColor: "red", opacity: 0.6 }}/>
      <div onClick={handleClick} style={{position:'absolute', cursor:'pointer', width:'100%', backgroundColor:"transparent", height:8, top:0}}/>
    </div>
  );
};

export default ProgressBar;
