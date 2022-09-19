// 18:20 -> 1100
export function converterHourStringToMinutes(hourString: string) {
  const [hour, minutes] = hourString.split(':').map(Number);

  const minutesAmount = hour * 60 + minutes;

  return minutesAmount;
}

// 1100 -> 18:20
export function converterMinutesToHourString(minutesAmount: number) {
  const hours = Math.floor(minutesAmount / 60);

  const minutes = minutesAmount % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}`;
}
