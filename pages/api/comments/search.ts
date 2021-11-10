import { NextApiRequest, NextApiResponse } from "../../../utils/types/next";
import { param, ValidationChain } from "express-validator";
import { cookie } from "../../../utils/middleware/cookie";
import { validate } from "../../../utils/validation";
import CommentService from "../../../database/services/comment";

const findFilter: ValidationChain[] = [
    param("commenter")
        .optional()
        .isString(),
    param("sort")
        .isString()
        .isIn(["new", "top"]),
    param("skip").isInt(),
    param("limit").isInt({ max: 100 })
];

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET": {
            const err = await validate(req, findFilter);
            if (err) {
                res.status(400).json(err);
                return;
            }

            const filter = {
                commenter: req.query.commenter as string | undefined,
                sort: req.query.sort as "new" | "top",
                skip: Number(req.query.skip),
                limit: Number(req.query.limit)
            };

            const comments = await CommentService.findByFilter(filter);
            res.json({ comments: comments });
            return;
        }
        default: {
            res.status(405).end();
            return;
        }
    }
}

export const config = {
    api: {
        externalResolver: true
    }
};

export default cookie(handler);