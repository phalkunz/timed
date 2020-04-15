const padLeft = (timePart: number) => {
  return String(timePart).length >= 2 ? timePart : `0${timePart}`;
};

const formatTime = (seconds: number): string => {
  const displaySeconds = Math.round(seconds % 60);
  const hours = Math.floor(seconds / (60 * 60));
  const minutes = Math.floor(seconds / 60) - (hours * 60);
  return `${padLeft(hours)}:${padLeft(minutes)}:${padLeft(displaySeconds)}`;
};

export default formatTime;
