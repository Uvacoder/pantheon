import { Entity, Index, OneToOne, PrimaryKey, Property } from "mikro-orm";
import { v4 } from "uuid";
import { MAX_EMAIL_LEN } from "../global";
import { User } from "./user";

@Entity()
class Credentials {
    @PrimaryKey({ type: String })
    id: string = v4();

    @OneToOne({ entity: () => User })
    @Index()
    user!: User;

    @Property({ type: String, length: MAX_EMAIL_LEN, unique: true })
    @Index()
    email!: string;

    @Property({ type: String })
    hashedPassword!: string;

    @Property({ type: String })
    salt!: string;
}

export { Credentials };
