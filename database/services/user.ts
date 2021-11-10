import * as bcrypt from "bcrypt";
import { User } from "../entities/user";
import { UserInput, UserUpdate } from "../interfaces/user";
import { getOrm } from "../orm";
import { Credentials } from "../entities/credentials";
import { MikroORM } from "mikro-orm";

const SALT_ROUNDS = 12;

const UserRepo = (orm: MikroORM) => orm.em.getRepository(User);
const CredRepo = (orm: MikroORM) => orm.em.getRepository(Credentials);

const UserService = {
    async create(user: UserInput) {
        const orm = await getOrm();

        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        const userEntity = new User();
        userEntity.name = user.name;

        const credentialsEntity = new Credentials();
        credentialsEntity.email = user.email;
        credentialsEntity.hashedPassword = hashedPassword;
        credentialsEntity.salt = salt;
        credentialsEntity.user = userEntity;

        orm.em.persist(credentialsEntity);
        orm.em.persist(userEntity);
        await orm.em.flush();

        return userEntity.id;
    },

    async matchByPassword(credentials: Credentials | null, password: string) {
        if (credentials?.salt && credentials?.hashedPassword) {
            const hashedPassword = await bcrypt.hash(password, credentials.salt);
            return hashedPassword === credentials.hashedPassword;
        } else {
            return false;
        }
    },

    async findUserById(id: string) {
        const orm = await getOrm();

        return await UserRepo(orm).findOne({ id: id });
    },

    async findCredsByEmail(email: string) {
        const orm = await getOrm();

        return await CredRepo(orm).findOne({ email: email });
    },

    async findUserByName(name: string) {
        const orm = await getOrm();

        return await UserRepo(orm).findOne({ name: name });
    },

    async findByLogin(email: string, password: string) {
        const creds = await UserService.findCredsByEmail(email);
        const match = await UserService.matchByPassword(creds, password);
        if (creds && match) {
            return await UserService.findUserById(creds.user.id);
        } else {
            return undefined;
        }
    },

    async updateAvatar(user: User, userUpdate: UserUpdate) {
        const orm = await getOrm();

        if (userUpdate.avatar) {
            user.avatar = userUpdate.avatar;
        }
        if (userUpdate.description) {
            user.description = userUpdate.description;
        }
        orm.em.flush();
        return user;
    }
};

export default UserService;
