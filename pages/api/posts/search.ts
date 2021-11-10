import { NextApiRequest, NextApiResponse } from "../../../utils/types/next";
import { query, ValidationChain } from "express-validator";
import { cookie } from "../../../utils/middleware/cookie";
import { validate } from "../../../utils/validation";
import PostService from "../../../database/services/post";

const findFilter: ValidationChain[] = [
    query("poster")
        .optional()
        .isString(),
    query("category")
        .optional()
        .isString(),
    query("date")
        .optional()
        .isString()
        .isDate(),
    query("sort")
        .isString()
        .isIn(["new", "top"]),
    query("skip").isInt(),
    query("limit").isInt({ max: 100 })
];

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET": {
            const err = await validate(req, findFilter);
            if (err) {
                res.status(400).json(err);
                return;
            }

            const dateStr = req.query.date as string | undefined;
            // format: yyyy-mm-dd
            const date = dateStr ? new Date(dateStr) : undefined;
            // last case check to make sure date is 100% valid
            if(date && date.toString() === "Invalid Date") {
                res.status(400).json({ msg: "Invalid Date" })
            }

            const filter = {
                poster: req.query.poster as string | undefined,
                category: req.query.category as string | undefined,
                sort: req.query.sort as "new" | "top",
                skip: Number(req.query.skip),
                limit: Number(req.query.limit),
                date
            };

            const posts = await PostService.findByFilter(filter);
            res.json({ posts: posts });
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
