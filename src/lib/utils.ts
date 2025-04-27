import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertTo12HourFormat(time:string) {
 
  console.log("time",time.slice(11,time.length-1))
  let [hours, minutes] = time.slice(11,time.length-1).split(':').map(Number);
  
  let period = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12 || 12; 
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  
  return `${hours}:${minutes} ${period}`;
}

export async function getNews() {
  try {
      const response = await fetch(
          "API_KEY"
      );
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); 
      console.log(data.articles);
      return data?.articles
  } catch (error) {
      console.error("Error fetching news:", error);
  }
}