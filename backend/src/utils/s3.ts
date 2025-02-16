import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_CLIENT_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
    },
})

export default s3