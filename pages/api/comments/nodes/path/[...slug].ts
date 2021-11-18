import CommentService from "../../../../../database/services/comment";
import { NextApiRequest, NextApiResponse } from "../../../../../utils/types/next";
import { cookie } from "../../../../../utils/server/middleware/cookie";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET": {
            const slug = req.query.slug as string[];

            for (const element of slug) {
                if (typeof element !== "string") {
                    res.status(400).end();
                    return;
                }
            }

            const comments = await CommentService.findTreeByPath(slug);
            res.json(comments);
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
