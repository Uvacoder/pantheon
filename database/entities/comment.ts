import { Entity, Index, ManyToOne, PrimaryKey, Property } from "mikro-orm";
import { Post } from "./post";
import { User } from "./user";
import { v4 } from "uuid";
import { MAX_COMMENT_LEN } from "../global";

// uses the materialized paths way of storing a tree in a relational database

@Entity()
@Index({ properties: ["post", "path"] })
class Comment {
    @PrimaryKey({ type: String })
    id: string = v4();

    @ManyToOne({ entity: () => User, nullable: true })
    @Index()
    commenter: User | null = null;

    @ManyToOne({ entity: () => Post })
    post!: Post;

    @Property({ type: String })
    @Index()
    path: string = ""; // delimited string containing id's of other comments

    @Property({ type: Number })
    votes: number = 0;

    @Property({ type: String, length: MAX_COMMENT_LEN })
    content!: string;

    @Property({ type: Date })
    createdAt: Date = new Date();
}

export { Comment };
