import { Entity, Index, PrimaryKey, Property } from "mikro-orm";
import { v4 } from "uuid";
import { MAX_USER_DESC_LEN, MAX_USER_NAME_LEN } from "../global";

@Entity()
class User {
    @PrimaryKey({ type: String })
    id: string = v4();

    @Property({ type: String, length: MAX_USER_NAME_LEN, unique: true })
    @Index()
    name!: string;

    @Property({ type: String, length: MAX_USER_DESC_LEN })
    description: string = "Hi! I'm new to Pantheon!";

    @Property({ type: String, nullable: true })
    avatar?: string;

    @Property({ type: Date })
    createdAt: Date = new Date();
}

export { User };
