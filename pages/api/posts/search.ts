import { NextApiRequest, NextApiResponse } from "../../../utils/types/next";
import { query, ValidationChain } from "express-validator";
import { cookie } from "../../../utils/server/middleware/cookie";
import { validate } from "../../../utils/server/validation";
import PostService from "../../../database/services/post";
import { SearchRes } from "../../../api/interfaces/post";
import { ErrorRes } from "../../../api/interfaces/common";
import { ALL_CATEGORY, TimeType } from "../../../database/global";

const findFilter: ValidationChain[] = [
    query("poster")
        .optional()
        .isString(),
    query("category")
        .optional()
        .isString(),
    query("time")
        .optional()
        .isString()
        .isIn(["day", "week", "month", "year", "alltime"]),
    query("sort")
        .isString()
        .isIn(["new", "top"]),
    query("page").isInt()
];

function calculateDate(time: TimeType) {
    const today = new Date();
    console.log(today)
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    switch(time) {
        case "day": {
            const newDate = new Date();
            newDate.setDate(date - 1);
            return newDate;
        }
        case "week": {
            const newDate = new Date();
            newDate.setDate(date - 7);
            return newDate;
        }
        case "month": {
            return new Date(year, month - 1, date);
        }
        case "year": {
            return new Date(year - 1, month, date);
        }
    }
}

async function handler(req: NextApiRequest, res: NextApiResponse<SearchRes | ErrorRes>) {
    switch (req.method) {
        case "GET": {
            const err = await validate(req, findFilter);
            if (err) {
                res.status(400).json({ errors: err });
                return;
            }

            const time = req.query.time as TimeType | undefined;
            const date = time && time !== "alltime" ? calculateDate(time) : undefined;

            let page = Number(req.query.page);
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

            console.log("search");

            const result = await PostService.findByFilter(filter);
            res.json(result);
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
