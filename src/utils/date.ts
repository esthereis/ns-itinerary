import { format } from "date-fns";

export function formatTime(date: Date | string): string {
  return format(new Date(date), "HH:mm");
}

export function formatDuration(duration: number): string {
  if (duration > 60) {
    const numericTime: number = duration / 60;
    const hours: number = Math.trunc(numericTime);
    const minutes: number = Math.trunc((numericTime - hours) * 60);
    return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}min.`;
  } else {
    return `${duration}min.`;
  }
}

export function formatLegDuration(duration: number): string | undefined {
  const numbers = duration.toString().match(/\d+/g);
  if (numbers) {
    const minutes = numbers?.length < 2 ? numbers[0] : numbers[1];
    const hour = numbers?.length === 2 ? numbers[0] : undefined;
    return hour ? `${hour}h ${minutes}min.` : `${minutes}min.`;
  }
  return undefined;
}
