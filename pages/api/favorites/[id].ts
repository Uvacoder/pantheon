import FavoriteService from "../../../database/services/favorite";
import { getUser } from "../../../utils/session";
import { NextApiRequest, NextApiResponse } from "../../../utils/types/next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string; // post id
    if (typeof id !== "string") {
        res.status(400).end();
        return;
    }

    const { user, err } = await getUser(req);
    if (!user) {
        res.status(401).json({ msg: err });
        return;
    }

    switch (req.method) {
        case "DELETE": {
            const favorite = FavoriteService.delete(id, user);
            res.json({ favorite: favorite });
            return;
        }
        default: {
            res.status(405).end();
            return;
        }
    }
}

export default handler;