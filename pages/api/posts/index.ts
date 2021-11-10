import { NextApiRequest, NextApiResponse } from "../../../utils/types/next";
import PostService from "../../../database/services/post";
import { body, ValidationChain } from "express-validator";
import { categories, MAX_POST_LEN, MAX_TITLE_LEN } from "../../../database/global";
import { CreateBody } from "../../../api/interfaces/post";
import { cookie } from "../../../utils/middleware/cookie";
import { validateBody } from "../../../utils/validation";
import { getUser } from "../../../utils/session";

const create: ValidationChain[] = [
    body("title")
        .isString()
        .isLength({ min: 5, max: MAX_TITLE_LEN })
        .escape(),
    body("category")
        .isString()
        .isIn(categories),
    body("content")
        .isString()
        .isLength({ max: MAX_POST_LEN })
        .escape(),
    body("images")
        .optional()
        .isArray(),
    body("images.*")
        .optional()
        .isString()
];

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "POST": {
            const { body, errors } = await validateBody<CreateBody>(req, create);
            if (!body) {
                res.status(400).json({ errors: errors });
                return;
            }

            const { user, err } = await getUser(req);
            if (!user) {
                res.status(401).json({ msg: err });
                return;
            }

            const id = await PostService.create(body, user);
            res.json({ id: id });
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
