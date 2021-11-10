import { MikroORM } from "mikro-orm";
import { Favorite } from "../entities/favorite";
import { User } from "../entities/user"
import { getOrm } from "../orm";
import PostService from "./post";

const FavRepo = (orm: MikroORM) => orm.em.getRepository(Favorite);

export const FavoriteService = {
    async create(postId: string, user: User) {
        const orm = await getOrm();

        const favoriteEntity = new Favorite();

        const favorite = await FavRepo(orm).findOne({ post: postId, user: user });
        if (favorite) {
            return undefined;
        }

        const post = await PostService.findById(postId);
        if (post) {
            favoriteEntity.post = post;
            favoriteEntity.user = user;
        }

        return favoriteEntity;
    },

    async findByUser(user: User) {
        const orm = await getOrm();

        const favorites = await FavRepo(orm).find({
            user: user
        }, ["post", "post.user"]);
        return favorites;
    },

    async delete(postId: string, user: User) {
        const orm = await getOrm();

        const favorite = await FavRepo(orm).findOne({ post: postId, user: user });

        if(favorite) {
            orm.em.removeAndFlush(favorite);
        }

        return favorite;
    }
}

export default FavoriteService;