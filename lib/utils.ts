import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge";
import crypto from 'crypto'
import { currentUser } from "@clerk/nextjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function generateColors(storeId: string, userId: string) {
  // Combine storeId and userId to generate unique numeric value
  let combinedValue = 0;
  for (let i = 0; i < storeId.length; i++) {
      combinedValue += storeId.charCodeAt(i);
  }
  for (let j = 0; j < userId.length; j++) {
      combinedValue += userId.charCodeAt(j);
  }

  // Generate two colors based on the combined value
  const color1 = '#' + Math.abs(combinedValue).toString(16).slice(0, 6); // First 6 characters
  const color2 = '#' + Math.abs(combinedValue * 2).toString(16).slice(0, 6); // Double the value for the second color

  return [color1, color2];
}




export const getUserById  = async () => {

  const user = await currentUser();

  return user;
}



function colorToHex(colorName: string ) {
  const colors: { [key: string ]: string} = {
    'white': '#FFFFFF',
    'black': '#000000',
    'red': '#FF0000',
    'green': '#00FF00',
    'blue': '#0000FF',
    'yellow': '#FFFF00',
    'cyan': '#00FFFF',
    'magenta': '#FF00FF',
    'gray': '#808080',
    'silver': '#C0C0C0',
    'maroon': '#800000',
    'olive': '#808000',
    'navy': '#000080',
    'purple': '#800080',
    'teal': '#008080'
    // Add more color mappings as needed
};


  // Convert colorName to lowercase to ensure case-insensitive matching
  const lowerColorName = colorName.toLowerCase();

  // Check if the colorName exists in the colors object
  if (lowerColorName in colors) {
      return colors[lowerColorName];
  } else {
      return "Color not found";
  }
}

