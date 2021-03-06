export type cardType = {
  fileName: string;
  fileSize: number;
  fileType: string;
  fileURL: string;
  id: number;
  infoTags: Array<string>;
  infoTime: number;
  userName: string;
  userPhoto: string;
  userUID: string;
};

export type fileType = {
  height: number;
  width: number;
  lastModified: number;
  name: string;
  size: number;
  source: string;
  type: string;
};

export type userType = {
  displayName: string | undefined;
  photoURL: string | undefined;
  uid: string | undefined;
  disName: string | undefined;
  disTag: string | undefined;
  banned: boolean;
  cardsID: number[];
  cardsIDFav: number[];
};

export type albumType = {
  name: string;
  count: number;
  image?: string;
  id: number;
  cardsId: number[];
};

export type cardTypeShort = {
  id: number;
  fileURL: string;
};

export type tagsType = {
  [key: string]: tagType[];
};

export type tagType = string;

export type querySearchType = {
  id: number;
  name: string;
  count: number;
};

export type tipsType = {
  start: boolean;
  upload: boolean;
  uTags: boolean;
  uName: boolean;
  zoomImage: boolean;
};
