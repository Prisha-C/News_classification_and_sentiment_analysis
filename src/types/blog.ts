export type NewsArticle = {
    source: {
      id: string | null;
      name: string;
    };
    author: string;
    title: string;
    description?: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content?: string;
  };

  export type LoadingSpinnerProps ={
    className?: string;
  }
  