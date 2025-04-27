import { ModeToggle } from "@/components/ui/darkmode-toggle-button";

import { BlogPosts } from "@/components/display-post";

export default function Home() {
    return (
        <div>
            
            <div className="h-[700px] w-full flex items-center text-center justify-center">
                <h1 className="text-6xl"> Welcome to news analysis</h1>
            </div>
            <BlogPosts />
        </div>
    );
}
