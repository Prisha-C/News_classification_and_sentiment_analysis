"use client";

import { generateSlug, getNews } from "@/lib/utils";
import { NewsArticle } from "@/types/blog";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogDetails() {
    const [news, setNews] = useState<NewsArticle | null>(null);
    const { id: slug } = useParams();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNews();
                const blogPost = data.find((item: NewsArticle) => {
                    const blogSlug = generateSlug(item.content ?? "");
                    return blogSlug === slug;
                });

                setNews(blogPost);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, [slug]);

    if (!news) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-10">
            <article className="w-full max-w-4xl min-w-[200px] prose prose-lg">
                {/* Blog Image */}
                {news.urlToImage && (
                    <img
                        src={news.urlToImage}
                        className="rounded-2xl h-[300px] w-full object-cover mb-6"
                        alt={news.title}
                    />
                )}

                <h1 className="text-5xl font-bold mb-4">{news.title}</h1>

                <div className="text-gray-600 text-lg mb-6">
                    <p>
                        <strong>Author:</strong> {news.author || "Unknown"}
                    </p>
                    <p>
                        <strong>Published At:</strong>{" "}
                        {new Date(news.publishedAt).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Source:</strong> {news.source.name}
                    </p>
                </div>

        
                {news.description && (
                    <p className="mb-6 text-3xl">{news.description}</p>
                )}

            
               

                <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline mt-6 inline-block"
                >
                    Read full article
                </a>
            </article>
        </div>
    );
}