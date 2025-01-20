import { format, formatDistance } from "date-fns";

export function formatTime(date: Date | string): string {
  return format(new Date(date), "HH:mm");
}

export function formatMinutes(
  departure: Date | string,
  arrival: Date | string
): string {
  return formatDistance(new Date(arrival), new Date(departure));
}
