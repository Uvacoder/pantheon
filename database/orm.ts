import { LoadStrategy, MikroORM, Options, ReflectMetadataProvider } from "mikro-orm";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Favorite } from "./entities/favorite";
import { Post } from "./entities/post";
import { Session } from "./entities/session";
import { User } from "./entities/user";
import { Comment } from "./entities/comment";
import { Credentials } from "./entities/credentials";
import { PostVote, CommentVote } from "./entities/vote";

require("dotenv").config();

export const config: Options<PostgreSqlDriver> = {
    type: "postgresql",
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    metadataProvider: ReflectMetadataProvider,
    entities: [User, Credentials, Session, Post, PostVote, Favorite, Comment, CommentVote],
    loadStrategy: LoadStrategy.JOINED,
    pool: { min: 0, max: 15 }
};

let orm: MikroORM<PostgreSqlDriver> | undefined = undefined;

export async function getOrm() {
    if (!orm) {
        console.log("Initializing Orm...");
        orm = await MikroORM.init<PostgreSqlDriver>(config);
        // const generator = orm.getSchemaGenerator();
        // await generator.dropSchema();
        // await generator.createSchema();
        // await generator.updateSchema();
        console.log("Initialization Complete.");
    }
    return orm;
}
