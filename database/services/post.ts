import { Post } from "../entities/post";
import { User } from "../entities/user";
import { PostFilter, PostInput, PostQuery, PostUpdate } from "../interfaces/post";
import { getOrm } from "../orm";
import { MikroORM, QueryOrder } from "mikro-orm";

const PostRepo = (orm: MikroORM) => orm.em.getRepository(Post);

const PostService = {
    async create(post: PostInput, poster: User) {
        const orm = await getOrm();

        const postEntity = new Post();
        postEntity.title = post.title;
        postEntity.category = post.category;
        postEntity.content = post.content;
        postEntity.poster = poster;
        if (post.images) {
            postEntity.images = post.images;
        }

        orm.em.persistAndFlush(postEntity);
        return postEntity.id;
    },

    async findById(id: string) {
        const orm = await getOrm();

        return await PostRepo(orm).findOne({ id: id }, ["poster"]);
    },

    async findManyByIds(ids: string[]) {
        const orm = await getOrm();

        return await PostRepo(orm).find({ id: { $in: ids } });
    },

    async findByIdAndPoster(postQuery: PostQuery) {
        const orm = await getOrm();

        return await PostRepo(orm).findOne({ id: postQuery.id, poster: postQuery.poster });
    },

    async findByFilter(filter: PostFilter) {
        const orm = await getOrm();

        const where: any = {};
        if (filter.poster) {
            where.poster = filter.poster;
        }
        if (filter.category) {
            where.category = filter.category;
        }
        if (filter.date) {
            where.createdAt = { 
                $gte: filter.date, 
                $lte: new Date()
            }
        }

        const perPage = 15;

        const posts = await PostRepo(orm).find(
            where,
            ["poster"],
            filter.sort === "top" ?
                { votes: QueryOrder.DESC } :
                { createdAt: QueryOrder.DESC },
            perPage,
            (filter.page - 1) * perPage
        );

        const pageCount = Math.ceil((await PostRepo(orm).count(where)) / perPage);

        return { 
            posts, 
            pageCount
        };
    },

    async update(postQuery: PostQuery, postUpdate: PostUpdate) {
        const orm = await getOrm();

        const post = await PostService.findByIdAndPoster(postQuery);
        if (post) {
            if (postUpdate.content) {
                post.content = postUpdate.content;
            }
            if (postUpdate.images) {
                post.images = postUpdate.images;
            }
        }
        await PostRepo(orm).flush();
        return post;
    },

    async delete(postQuery: PostQuery) {
        const orm = await getOrm();

        const post = await PostService.findByIdAndPoster(postQuery);
        if (post) {
            post.poster = null;
            post.title = "";
            post.content = "";
            post.images = [];
        }
        await PostRepo(orm).flush();
        return post;
    }
};

export default PostService;
