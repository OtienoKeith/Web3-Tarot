import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import tarotCards from './tarotCards';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomCards(count = 3) {
  const shuffled = [...tarotCards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
