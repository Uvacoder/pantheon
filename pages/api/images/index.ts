import { NextApiRequest, NextApiResponse } from "../../../utils/types/next";
import { cookie } from "../../../utils/middleware/cookie";

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        // const bucket = getBucket(req.dbConnection);

        // const form = new multiparty.Form();

        // const ids: string[] = [];

        // form.on("part", (part) => {
        //     if (!part.filename) {
        //         //this part is not a file
        //         part.resume();
        //     }

        //     if (part.filename) {
        //         //this part is a file
        //         const uploadStream = bucket.openUploadStream("file");
        //         const id = uploadStream.id;
        //         ids.push(id.toString());

        //         part.on("data", (chunk) => {
        //             uploadStream.write(chunk);
        //         });

        //         part.on("end", (chunk: any) => {
        //             uploadStream.end(chunk);
        //         });
        //         part.resume();
        //     }

        //     part.on("error", () => {
        //         part.destroy();
        //         form.removeAllListeners();
        //         res.status(500).json({ err: "Can't upload files" });
        //     });
        // });

        // form.on("close", () => {
        //     res.json({ ids: ids });
        // });

        // form.parse(req);

        // UNSUPPORTED
        res.status(500).end();
        return;
    } else {
        res.status(405).end();
    }
}

export const config = {
    api: {
        externalResolver: true,
        bodyParser: false
    }
};

export default cookie(handler);
