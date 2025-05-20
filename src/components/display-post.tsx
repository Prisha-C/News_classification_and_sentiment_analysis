"use client"


import { convertTo12HourFormat, generateSlug, getNews } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import { NewsArticle } from "@/types/blog";
import { LoadingSpinner } from "./ui/spinner";
import Link from "next/link";

export function BlogPosts() {
    const [news, setNews] = useState<NewsArticle[] | null>(null);
    useEffect(() => {
        const fetchNews = async () => {
            try{
            const data = await getNews();
            setNews(data);
        }catch(e){
            console.error("error",e)
        }
        };
        fetchNews();
    }, []);
    if (!news) {
        return <LoadingSpinner className="w-full  flex justify-center items-center"/>;
    }

    return (
        <div className="px-5 grid-cols-1 grid gap-6 lg:grid-cols-3 md:grid-cols-2">
            {news.map((item) => (
                <Link
                href={{
                    pathname: `/blogs/${item.content ? generateSlug(item.content) : "default-slug"}`,
                    query: {
                        title: item.title,
                        description: item.description,
                        urlToImage: item.urlToImage,
                        publishedAt: item.publishedAt,
                    },
                }}
                key={item.title}
            >
                <Card key={item.title}>
                    <div className="flex flex-col justify-between h-full ">
                        <CardHeader className="p-0 rounded">
                            <img
                                src={item.urlToImage}
                                className="rounded-2xl h-[300px] w-full"
                                alt="hello"
                            />
                            <div className="p-2 flex flex-row justify-between text-xl">
                                <div>{item.publishedAt.slice(0, 10)}</div>
                                <div>
                                    {convertTo12HourFormat(item.publishedAt)}
                                </div>
                            </div>
                            <CardTitle className="p-2 text-2xl">
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-2 py-3">
                            {item?.description?.slice(0, 100) ?? ""}...
                        </CardContent>
                    </div>
                </Card>
                </Link>
            ))}
        </div>
    );
}
