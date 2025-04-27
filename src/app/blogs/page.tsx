import { BlogPosts } from "@/components/display-post";



export default function BlogPage(){

    return (
        <div className="py-10">
            <h2 className="text-center text-5xl pb-[100px]">List of Blogs</h2>
            <BlogPosts/>
        </div>
    )
}