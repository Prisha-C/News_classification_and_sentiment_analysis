import { NewsArticle } from "@/types/blog";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertTo12HourFormat(time:string) {
 
  // console.log("time",time.slice(11,time.length-1))
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
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=0d70fc02ef244c6e99dc344964fcc814"
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

export function generateSlug(article: string) {
  const slugifiedTitle = article
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")   // Replace non-alphanumerics with hyphen
    .replace(/^-+|-+$/g, "");      // Remove leading/trailing hyphens

   // or hash of URL/title

  return `${slugifiedTitle}`;
}