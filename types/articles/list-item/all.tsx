export interface AfridiHorizontalArticleListItemProps {
  title: string;
  description: string;
  index: number;
  cover: string;
  tag?: {
    title: string;
    id: string;
  };
}

export interface AfridiHorizontalFeedArticleListItemProps {
  title: string;
  description: string;
  bookmarked: boolean;
  read_time: string;
  cover: string;
}
