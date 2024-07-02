export const getYear = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear();
};

export const msToMinutesAndSeconds = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${formattedSeconds}`;
};