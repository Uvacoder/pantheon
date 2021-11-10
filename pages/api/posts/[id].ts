import { NextApiRequest, NextApiResponse } from "../../../utils/types/next";
import { body, ValidationChain } from "express-validator";
import { UpdateBody } from "../../../api/interfaces/post";
import { cookie } from "../../../utils/middleware/cookie";
import { validateBody } from "../../../utils/validation";
import { getUser } from "../../../utils/session";
import PostService from "../../../database/services/post";

const update: ValidationChain[] = [
    body("update.content")
        .optional()
        .isString()
        .isLength({ max: 10000 })
        .escape(),
    body("update.images")
        .optional()
        .isArray(),
    body("update.images.*")
        .optional()
        .isString()
];

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;
    if (typeof id !== "string") {
        res.status(400).end();
        return;
    }

    switch (req.method) {
        case "GET": {
            const post = await PostService.findById(id);
            res.json(post);
            return;
        }
        case "PUT": {
            const { body, errors } = await validateBody<UpdateBody>(req, update);
            if (!body) {
                res.status(400).json({ errors: errors });
                return;
            }

            const { user, err } = await getUser(req);
            if (!user) {
                res.status(401).json({ msg: err });
                return;
            }

            const post = await PostService.update({ id: id, poster: user }, body.update);
            res.json(post);
            return;
        }
        case "DELETE": {
            const { user, err } = await getUser(req);
            if (!user) {
                res.status(401).json({ msg: err });
                return;
            }

            const post = await PostService.delete({ id: id, poster: user });
            res.json(post);
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
