import { del, head, put } from "@vercel/blob";

export async function deleteFile(url: string) {
  const file = await getFile(url);

  if (file) await del(url);
}

export async function getFile(url: string) {
  try {
    const file = await head(url);

    return file;
  } catch (error) {
    return undefined;
  }
}

export async function uploadFile(fileName: string, file: File) {
  const res = await put(fileName, file, {
    access: "public",
  });

  return res;
}

export const MAX_UPLOAD_IMAGE_SIZE = 1024 * 1024 * 5;
