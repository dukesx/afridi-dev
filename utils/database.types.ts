export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      appreciations: {
        Row: {
          id: string;
          created_at: string | null;
          reacted_article: string;
          reacted_author: string;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          reacted_article: string;
          reacted_author: string;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          reacted_article?: string;
          reacted_author?: string;
        };
      };
      article_copyright_reports: {
        Row: {
          id: string;
          created_at: string | null;
          priority: string | null;
          article_id: string | null;
          reason: string | null;
          contact: string | null;
        };
        Insert: {
          id: string;
          created_at?: string | null;
          priority?: string | null;
          article_id?: string | null;
          reason?: string | null;
          contact?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          priority?: string | null;
          article_id?: string | null;
          reason?: string | null;
          contact?: string | null;
        };
      };
      article_views: {
        Row: {
          article_id: string;
          created_at: string | null;
          id: string;
        };
        Insert: {
          article_id: string;
          created_at?: string | null;
          id?: string;
        };
        Update: {
          article_id?: string;
          created_at?: string | null;
          id?: string;
        };
      };
      articles: {
        Row: {
          id: string;
          created_at: string | null;
          updated_at: string | null;
          publisher_id: string | null;
          title: string;
          description: string;
          cover: string;
          channel_id: string | null;
          sponsor_id: string | null;
          author_id: string;
          body: string;
          article_tags: string[] | null;
          editors_pick: boolean | null;
          type: string | null;
          views: number;
          read_time: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          updated_at?: string | null;
          publisher_id?: string | null;
          title: string;
          description: string;
          cover: string;
          channel_id?: string | null;
          sponsor_id?: string | null;
          author_id: string;
          body: string;
          article_tags?: string[] | null;
          editors_pick?: boolean | null;
          type?: string | null;
          views?: number;
          read_time?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          updated_at?: string | null;
          publisher_id?: string | null;
          title?: string;
          description?: string;
          cover?: string;
          channel_id?: string | null;
          sponsor_id?: string | null;
          author_id?: string;
          body?: string;
          article_tags?: string[] | null;
          editors_pick?: boolean | null;
          type?: string | null;
          views?: number;
          read_time?: string | null;
        };
      };
      articles_tags: {
        Row: {
          id: string;
          created_at: string | null;
          article_id: string;
          tag_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          article_id: string;
          tag_id: string;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          article_id?: string;
          tag_id?: string;
        };
      };
      author_followed_tags: {
        Row: {
          id: string;
          created_at: string | null;
          author_id: string;
          tag_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          author_id: string;
          tag_id: string;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          author_id?: string;
          tag_id?: string;
        };
      };
      authors: {
        Row: {
          id: string;
          created_at: string | null;
          dp: string | null;
          cover: string | null;
          bio: string | null;
          email: string | null;
          location: string | null;
          github: string | null;
          followed_tags: string[] | null;
          article_editor_tour: boolean | null;
          website_tour: boolean | null;
          role: string | null;
          content_count: number | null;
          full_name: string | null;
          gender: string | null;
          username: string | null;
          updated_at: string | null;
          provider: Json | null;
        };
        Insert: {
          id: string;
          created_at?: string | null;
          dp?: string | null;
          cover?: string | null;
          bio?: string | null;
          email?: string | null;
          location?: string | null;
          github?: string | null;
          followed_tags?: string[] | null;
          article_editor_tour?: boolean | null;
          website_tour?: boolean | null;
          role?: string | null;
          content_count?: number | null;
          full_name?: string | null;
          gender?: string | null;
          username?: string | null;
          updated_at?: string | null;
          provider?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          dp?: string | null;
          cover?: string | null;
          bio?: string | null;
          email?: string | null;
          location?: string | null;
          github?: string | null;
          followed_tags?: string[] | null;
          article_editor_tour?: boolean | null;
          website_tour?: boolean | null;
          role?: string | null;
          content_count?: number | null;
          full_name?: string | null;
          gender?: string | null;
          username?: string | null;
          updated_at?: string | null;
          provider?: Json | null;
        };
      };
      bookmarks: {
        Row: {
          id: string;
          created_at: string | null;
          article_id: string;
          author_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          article_id: string;
          author_id: string;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          article_id?: string;
          author_id?: string;
        };
      };
      channel_articles: {
        Row: {
          id: string;
          created_at: string | null;
          article_id: string;
          channel_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          article_id: string;
          channel_id: string;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          article_id?: string;
          channel_id?: string;
        };
      };
      channels: {
        Row: {
          id: string;
          created_at: string | null;
          title: string;
          cover: string;
          dp: string;
          creator_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          title: string;
          cover: string;
          dp: string;
          creator_id: string;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          title?: string;
          cover?: string;
          dp?: string;
          creator_id?: string;
        };
      };
      co_authors_articles: {
        Row: {
          id: string;
          created_at: string | null;
          author_id: string;
          article_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          author_id: string;
          article_id: string;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          author_id?: string;
          article_id?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          created_at: string | null;
          article_id: string;
          author_id: string | null;
          body: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          article_id: string;
          author_id?: string | null;
          body?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          article_id?: string;
          author_id?: string | null;
          body?: string | null;
        };
      };
      replies: {
        Row: {
          id: string;
          created_at: string | null;
          body: string | null;
          author_id: string | null;
          comment_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          body?: string | null;
          author_id?: string | null;
          comment_id: string;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          body?: string | null;
          author_id?: string | null;
          comment_id?: string;
        };
      };
      spam_reports: {
        Row: {
          id: string;
          created_at: string | null;
          comment_id: string | null;
          reply_id: string | null;
          reason: string | null;
          reporter_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          comment_id?: string | null;
          reply_id?: string | null;
          reason?: string | null;
          reporter_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          comment_id?: string | null;
          reply_id?: string | null;
          reason?: string | null;
          reporter_id?: string | null;
        };
      };
      status_feed: {
        Row: {
          id: string;
          created_at: string | null;
          body: string;
          author_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          body: string;
          author_id: string;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          body?: string;
          author_id?: string;
        };
      };
      tags: {
        Row: {
          created_at: string | null;
          title: string;
          color: string | null;
          id: string;
          icon: string | null;
          followers: number | null;
          content_count: number | null;
          image: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          title: string;
          color?: string | null;
          id?: string;
          icon?: string | null;
          followers?: number | null;
          content_count?: number | null;
          image?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          title?: string;
          color?: string | null;
          id?: string;
          icon?: string | null;
          followers?: number | null;
          content_count?: number | null;
          image?: string | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
