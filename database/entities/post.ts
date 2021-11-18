import { ArrayType, Entity, Index, ManyToOne, PrimaryKey, Property } from "mikro-orm";
import { User } from "./user";
import { MAX_POST_LEN, MAX_TITLE_LEN } from "../global";
import { uuid } from "../utils/id";

@Entity()
@Index({ properties: ["poster", "category"] })
class Post {
    @PrimaryKey({ type: String })
    id: string = uuid();

    @ManyToOne({ entity: () => User, nullable: true })
    poster: User | null = null;

    @Property({ type: String, length: MAX_TITLE_LEN })
    title!: string;

    @Property({ type: String })
    @Index()
    category!: string;

    @Property({ type: Number })
    votes: number = 0;

    @Property({ type: Number })
    comments: number = 0;

    @Property({ type: String, length: MAX_POST_LEN })
    content!: string;

    @Property({ type: ArrayType })
    images: string[] = [];

    @Property({ type: Date })
    createdAt: Date = new Date();
}

export { Post };
