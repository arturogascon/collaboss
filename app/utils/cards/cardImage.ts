import fs from "node:fs";
import slugify from "slugify";

export async function saveCardImage(image: File): Promise<string> {
  if (image.size === 0) {
    return "";
  }

  let [fileName, extension] = image.name.split(".");
  fileName = `${slugify(fileName)}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  return `/images/${fileName}`;
}
