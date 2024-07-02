import { useEffect, useRef } from "react";

const ProgressBar = ({ duration, isPlaying }) => {
  const progressBarRef = useRef(null);
  useEffect(() => {
    if (progressBarRef.current && duration) {
      progressBarRef.current.style.transition = "none";
      progressBarRef.current.style.width = "0%";
      progressBarRef.current.getBoundingClientRect();
      progressBarRef.current.style.transition = `width ${duration}ms linear`;
      progressBarRef.current.style.width = "100%";
    }
  }, [duration]);
  return (
    <div
      ref={progressBarRef}
      style={{ width: "0%", height: 8, backgroundColor: "red", opacity: 0.6 }}
    ></div>
  );
};
export default ProgressBar;
