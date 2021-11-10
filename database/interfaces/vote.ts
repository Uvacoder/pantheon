import { User } from "../entities/user";

export interface VoteInput {
    resourceId: string;
    voter: User;
    value: -1 | 0 | 1;
}