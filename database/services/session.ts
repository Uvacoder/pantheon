import crypto from "crypto";
import { MikroORM } from "mikro-orm";
import { getOrm } from "../orm";
import { Session } from "../entities/session";
import { User } from "../entities/user";

const SessionRepo = (orm: MikroORM) => orm.em.getRepository(Session);

const SessionService = {
    async create() {
        const orm = await getOrm();

        const newCookie = crypto.randomBytes(64).toString("hex");

        const session = new Session();
        session.id = newCookie;

        orm.em.persistAndFlush(session);
        return newCookie;
    },

    async findByCookie(cookie: string) {
        const orm = await getOrm();

        return await SessionRepo(orm).findOne({ id: cookie });
    },

    async updateUser(cookie: string, user: User) {
        const orm = await getOrm();

        const session = await SessionRepo(orm).findOne({ id: cookie });
        if (session) {
            session.user = user;
            await SessionRepo(orm).flush();
            return session;
        } else {
            const session = new Session();

            session.id = cookie;
            session.user = user;

            orm.em.persistAndFlush(session);
        }
    },

    async deleteUser(cookie: string) {
        const orm = await getOrm();

        const session = await SessionRepo(orm).findOne({ id: cookie });
        if (session) {
            session.user = null;
        }
        await SessionRepo(orm).flush();
        return session;
    }
};

export default SessionService;
