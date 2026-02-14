import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./r2.client";

export async function uploadImages(files: File[]) {
  const urls: string[] = [];

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `menu/${Date.now()}-${file.name}`;
    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      }),
    );
    urls.push(`${process.env.R2_PUBLIC_URL}/${fileName}`);
  }

  return urls;
}

export async function uploadSingleImage(
  file: File,
  folder: string,
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${folder}/${Date.now()}-${file.name}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    }),
  );

  return `${process.env.R2_PUBLIC_URL}/${fileName}`;
}
