import { MikroORM } from "mikro-orm";
import { User } from "../entities/user.entity";
import { CommentVote, PostVote } from "../entities/vote.entity";
import { VoteInput } from "../interfaces/vote";
import { getOrm } from "../orm";
import CommentService from "./comment.service";
import PostService from "./post.service";

const VoteService = {
    async votePost(newVote: VoteInput) {
        const orm = await getOrm();

        const post = await PostService.findById(newVote.resourceId);
        if (post) {
            const voteEntity = await orm.em.findOne(PostVote, { post: newVote.resourceId, voter: newVote.voter });
            
            // check if vote entity already exists in database
            if (voteEntity) {
                // if so, we need to update the vote entity's value
                post.votes += newVote.value - voteEntity.value;

                voteEntity.value = newVote.value;

                orm.em.flush();
    
                return voteEntity;
            } else {
                // otherwise we create a new vote entity and persist it
                post.votes += newVote.value;

                const voteEntity = new PostVote();   
                voteEntity.post = post;
                voteEntity.voter = newVote.voter;
                voteEntity.value = newVote.value;

                orm.em.persistAndFlush(voteEntity);

                return voteEntity;
            }
        } else {
            return undefined;
        }
    },

    async voteComment(newVote: VoteInput) {
        const orm = await getOrm();

        const comment = await CommentService.findById(newVote.resourceId);
        if (comment) {
            const voteEntity = await orm.em.findOne(CommentVote, { comment: newVote.resourceId, voter: newVote.voter });
            
            // check if vote entity already exists in database
            if (voteEntity) {
                // if so, we need to update the vote entity's value
                comment.votes += newVote.value - voteEntity.value;

                voteEntity.value = newVote.value;

                orm.em.flush();
    
                return voteEntity;
            } else {
                // otherwise we create a new vote entity and persist it
                comment.votes += newVote.value;

                const voteEntity = new CommentVote();   
                voteEntity.comment = comment;
                voteEntity.voter = newVote.voter;
                voteEntity.value = newVote.value;

                orm.em.persistAndFlush(voteEntity);

                return voteEntity;
            }
        } else {
            return undefined;
        }
    },

    async findPostVotes(postId: string, voter: User) {

    },

    async findCommentVotes() {

    }
}

export default VoteService;