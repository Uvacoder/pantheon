import { Entity, Index, ManyToOne, PrimaryKey, PrimaryKeyType, Property } from "mikro-orm";
import { Comment } from "./comment";
import { Post } from "./post";
import { User } from "./user";

@Entity()
class CommentVote {
    @ManyToOne({ entity: () => Comment, primary: true })
    comment!: Comment;

    @ManyToOne({ entity: () => User, primary: true })
    voter!: User;

    @Property({ type: Number })
    value!: number; // -1, 0, or 1

    [PrimaryKeyType]: [string, string];
}

@Entity()
class PostVote {
    @ManyToOne({ entity: () => Post, primary: true })
    post!: Post;

    @ManyToOne({ entity: () => User, primary: true })
    voter!: User;

    @Property({ type: Number })
    value!: number; // -1, 0, or 1

    [PrimaryKeyType]: [string, string];
}

export { PostVote, CommentVote };