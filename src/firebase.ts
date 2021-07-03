import { fileType } from "./types";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

try {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
} catch (error) {
  if (!/already exists/.test(error.message)) {
    console.error("Firebase initialization error", error.stack);
  }
}

export const fb = firebase;

export async function uploadImage(
  album: string = "unknown",
  file: fileType,
  tags: string[],
  fb: typeof firebase
) {
  let lastId: number = 0;
  let imageURL: string = "";

  const getLastId = await fb
    .firestore()
    .collection(album)
    .orderBy("id", "desc")
    .limit(1)
    .get();

  getLastId.forEach((doc) => {
    lastId = doc.data().id;
  });

  const storageRef = fb.storage().ref();
  const cardRef = storageRef.child(album + "/" + lastId + file.name);

  const metadata = {
    contentType: file.type,
  };

  await cardRef.putString(file.source, "data_url", metadata);
  imageURL = await storageRef.getDownloadURL();
}
