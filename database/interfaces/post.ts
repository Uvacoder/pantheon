import { User } from "../entities/user";

export interface PostInput {
    title: string;
    category: string;
    content: string;
    images?: string[];
}

export interface PostFilter {
    poster?: string;
    category?: string;
    date?: Date;
    sort: "new" | "top";
    skip: number;
    limit: number;
}

export interface PostQuery {
    id: string;
    poster: User;
}

export interface PostUpdate {
    content?: string;
    images?: string[];
}
