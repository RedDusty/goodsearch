import { Dispatch, SetStateAction } from "react";
import { fileType } from "./types";

function renameFile(file: fileType) {
  const types3 = "xbm tif pjp jpg ico svg png bmp";
  const types4 = "svgz jpeg tiff jfif avif";
  const types5 = "pjpeg";
  let newFileName = file.name;
  let newFileType = file.type;
  if (types3.includes(file.name.slice(-3))) {
    newFileName = file.name.slice(0, -3) + "webp";
    newFileType = "image/webp";
  }
  if (types4.includes(file.name.slice(-4))) {
    newFileName = file.name.slice(0, -4) + "webp";
    newFileType = "image/webp";
  }
  if (types5.includes(file.name.slice(-5))) {
    newFileName = file.name.slice(0, -5) + "webp";
    newFileType = "image/webp";
  }
  Object.assign(file, {
    name: newFileName,
    type: newFileType,
  });
  return file;
}

export function getPreview(
  file: File,
  setPreviewFile: Dispatch<SetStateAction<fileType | undefined>>
) {
  const image: HTMLImageElement = new Image();
  const webpImage: HTMLImageElement = new Image();
  const ctx: HTMLCanvasElement = document.createElement("canvas");
  const reader: FileReader = new FileReader();
  const previewFile: fileType = {
    height: 0,
    width: 0,
    lastModified: file.lastModified,
    name: file.name,
    size: file.size,
    source: "",
    type: file.type,
  };
  reader.onloadend = () => {
    if (file.type.substring(0, 6) === "image/") {
      image.onload = () => {
        ctx.width = image.width;
        ctx.height = image.height;
        ctx.getContext("2d")!.drawImage(image, 0, 0);
        webpImage.src = ctx.toDataURL("image/webp");
        Object.assign(previewFile, {
          size:
            ((webpImage.src.length - "data:image/webp;base64,".length) * 3) / 4,
          source: webpImage.src,
          height: image.height,
          width: image.width,
        });
        setPreviewFile(renameFile(previewFile));
      };
    } else {
      image.onload = () => {
        Object.assign(previewFile, {
          source: reader.result,
          height: image.height,
          width: image.width,
        });
        setPreviewFile(renameFile(previewFile));
      };
    }
    image.src = String(reader.result);
  };
  reader.readAsDataURL(file);
}
