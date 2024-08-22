import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import AWS from "aws-sdk";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const s3 = new AWS.S3();

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = formidable();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing the file:", err);
        return res.status(500).json({ error: "Error parsing the file" });
      }

      console.log("Files received:", files);

      const fileArray = files.file as File[];

      if (!fileArray || fileArray.length === 0) {
        console.error("No valid file uploaded");
        return res.status(400).json({ error: "No valid file uploaded" });
      }

      const file = fileArray[0]; // Az első fájl a tömbből

      try {
        const fileContent = fs.readFileSync(file.filepath);
        const fileName = `images/${uuidv4()}-${file.originalFilename}`;

        const params = {
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: fileName,
          Body: fileContent,
        };

        const data = await s3.upload(params).promise();
        console.log("Upload successful:", data);
        res.status(200).json({ url: data.Location });
      } catch (uploadError) {
        console.error("Error uploading to S3:", uploadError);
        res.status(500).json({ error: "Failed to upload image" });
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
