import { NextApiRequest, NextApiResponse } from "../../../utils/types/next";
import { cookie } from "../../../utils/server/middleware/cookie";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const id = req.query.id as string;
    // if (typeof id !== "string") {
    //     res.status(400).end();
    //     return;
    // }

    // if (!req.dbConnection) {
    //     res.status(500).end();
    //     return;
    // }

    // if(req.method === "GET") {
    //     const bucket = getBucket(req.dbConnection);

    //     const mongoId = new mongoDb.ObjectId(id);
    //     const downloadStream = bucket.openDownloadStream(mongoId);

    //     res.setHeader("Content-Type", "image/jpeg");

    //     downloadStream.on("data", (chunk) => {
    //         res.write(chunk);
    //     });

    //     downloadStream.on("end", () => {
    //         res.end();
    //     });

    //     downloadStream.on("error", () => {
    //         res.status(404).json({ err: "Can't find image" });
    //     });
    // } else {
    //     res.status(405).end();
    // }
    // UNSUPPORTED
    res.status(500).end();
    return;
}

export const config = {
    api: {
        externalResolver: true
    }
};

export default cookie(handler);
