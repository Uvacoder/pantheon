import { PostFilter } from "../../database/interfaces/post";

export interface UpdateBody {
    update: {
        content?: string;
        images?: string[];
    };
}

export interface CreateBody {
    title: string;
    category: string;
    content: string;
    images?: string[];
}

export interface SearchBody {
    filters: PostFilter;
}