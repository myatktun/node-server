import { Request, Response } from "express"
import { S3Client, GetObjectCommand, GetObjectCommandInput } from "@aws-sdk/client-s3"

if (!process.env.S3_REGION) {
    throw new Error("Environment variable S3_REGION not set")
}

if (!process.env.S3_BUCKET) {
    throw new Error("Environment variable S3_BUCKET not set")
}

const S3_REGION = process.env.S3_REGION
const S3_BUCKET = process.env.S3_BUCKET

const s3Client = new S3Client({ region: S3_REGION })

const getObject = async (params: GetObjectCommandInput) => {
    try {
        const command = new GetObjectCommand(params)
        const object = await s3Client.send(command)
        return object
    } catch (error) {
        console.log("Error", error)
        return new Error(<string>error)
    }
}

export const getNote = async (req: Request, res: Response): Promise<Response> => {
    const { category, note } = req.params

    const params: GetObjectCommandInput = {
        Bucket: S3_BUCKET,
        Key: `${category}/${note}.md`,
    }

    const object = await getObject(params)
    if (object instanceof Error) {
        return res.status(404).send("Error")
    }

    const data = await object.Body?.transformToString()
    return res.status(200).send({ data: data })
}
