import { NextApiRequest, NextApiResponse } from "../../../utils/types/next";
import { query, ValidationChain } from "express-validator";
import { cookie } from "../../../utils/server/middleware/cookie";
import { validate } from "../../../utils/server/validation";
import PostService from "../../../database/services/post";
import { SearchRes } from "../../../api/interfaces/post";
import { ErrorRes } from "../../../api/interfaces/common";
import { ALL_CATEGORY } from "../../../database/global";

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
    query("page").isInt()
];

async function handler(req: NextApiRequest, res: NextApiResponse<SearchRes | ErrorRes>) {
    switch (req.method) {
        case "GET": {
            const err = await validate(req, findFilter);
            if (err) {
                res.status(400).json({ errors: err });
                return;
            }

            const dateStr = req.query.date as string | undefined;
            // format: yyyy-mm-dd
            const date = dateStr ? new Date(dateStr) : undefined;
            // last case check to make sure date is 100% valid
            if(date && date.toString() === "Invalid Date") {
                res.status(400).json({ msg: "Invalid Date" })
            }

            let page = Number(req.query.skip);
            if (page <= 0) {
                page = 1;
            }

            let category = req.query.category as string | undefined;
            if (category === ALL_CATEGORY) {
                category = undefined;
            }

            const filter = {
                poster: req.query.poster as string | undefined,
                sort: req.query.sort as "new" | "top",
                category,
                page,
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
