export type cardType = {
  fileName: string;
  fileSize: number;
  fileType: string;
  fileURL: string;
  id: number;
  infoTags: Array<string>;
  infoTime: number;
};

export type fileType = {
    height: number;
    width: number;
    lastModified: number;
    name: string;
    size: number;
    source: string;
    type: string;
}