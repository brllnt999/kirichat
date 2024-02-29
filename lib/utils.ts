import { customAlphabet } from "nanoid";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect, useRef } from 'react';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export const timestamps: { createdAt: true; updatedAt: true } = {
  createdAt: true,
  updatedAt: true,
};


export function TruncatedString({ text, limit }: { text: string; limit: number }) {
  // Check if the text is longer than the limit
  const displayText =
    text.length > limit ? text.substring(0, limit) + "..." : text;

  return displayText;
}

export function calculateDaysDifference(createdAt: string) {
  // Parse the createdAt string into a Date object
  const createdDate = new Date(createdAt);
  // Get today's date
  const today = new Date();
  // Calculate the difference in milliseconds
  const differenceInTime = today.getTime() - createdDate.getTime();
  // Convert milliseconds to days
 const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
}



// Define the type for the effect function


export type Action = "create" | "update" | "delete";

export type OptimisticAction<T> = {
  action: Action;
  data: T;
};
