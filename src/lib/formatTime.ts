const formatTime = (seconds: number): string => {
  const displaySeconds = seconds % 60;
  const hours = Math.floor(seconds / (60 * 60));
  const minutes = Math.floor(seconds / 60) - (hours * 60);
  console.log(hours, minutes, displaySeconds);
  return `${hours}:${minutes}:${displaySeconds}`;
};

export default formatTime;
