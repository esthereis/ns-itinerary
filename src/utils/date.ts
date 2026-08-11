import { format } from "date-fns";

export function formatTime(date: Date | string): string {
  return format(new Date(date), "HH:mm");
}

export function formatDuration(duration: number): string {
  if (duration > 60) {
    const numericTime: number = duration / 60;
    const hours: number = Math.trunc(numericTime);
    const minutes: number = Math.trunc((numericTime - hours) * 60);
    return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}min`;
  } else {
    return `${duration}min`;
  }
}

export const getDayOrTime = (
  date: Date | string,
  filter: "day" | "time",
): string => {
  const day = date.toString().slice(0, 10);
  const time = date.toString().slice(11, 16);

  if (filter === "day") {
    return day;
  }
  return time;
};
