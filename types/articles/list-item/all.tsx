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
