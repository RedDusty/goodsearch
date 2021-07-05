import { albumType, cardType, fileType, userType } from "./types";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

export async function uploadImage(
  album: string = "unknown",
  file: fileType,
  tags: string[],
  user: userType
) {
  let lastId: number = 0;
  let imageURL: string = "";

  const getLastId = await firebase
    .firestore()
    .collection(album)
    .orderBy("id", "desc")
    .limit(1)
    .get();

  getLastId.forEach((doc) => {
    lastId = doc.data().id;
  });

  const storageRef = firebase.storage().ref();
  const cardRef = storageRef.child(album + "/" + (lastId + 1) + file.name);

  const metadata = {
    contentType: file.type,
  };

  await cardRef.putString(file.source, "data_url", metadata);
  imageURL = await storageRef
    .child(album + "/" + (lastId + 1) + file.name)
    .getDownloadURL();

  const getAlbumList = await firebase
    .firestore()
    .collection("albums")
    .doc(album)
    .get();
  const newCount: number = Number(getAlbumList?.data()?.count) + 1;
  if (!getAlbumList.exists) {
    await firebase
      .firestore()
      .collection("albums")
      .doc(album)
      .set({
        count: 1,
        image: imageURL,
        name: album,
      } as albumType);
  } else {
    await firebase
      .firestore()
      .collection("albums")
      .doc(album)
      .update({ count: newCount } as albumType);
  }

  const getMetadata = await storageRef
    .child(album + "/" + (lastId + 1) + file.name)
    .getMetadata();

  await firebase
    .firestore()
    .collection(album)
    .doc(String(lastId + 1))
    .set({
      fileName: file.name,
      fileSize: getMetadata.size || 0,
      fileType: file.type,
      fileURL: imageURL,
      id: lastId + 1,
      infoTags: tags,
      infoTime: new Date().getTime(),
      userName: user.displayName || "Unknown",
      userPhoto: user.photoURL || "",
      userUID: user.uid,
    } as cardType);

  let newCardsId = user.cardsID;
  newCardsId.push(lastId + 1);

  await firebase
    .firestore()
    .collection("users")
    .doc(user.uid)
    .update({ cardsID: newCardsId });
}

export async function getLoginUser(user: userType) {
  if (user !== null) {
    const getUser = await firebase
      .firestore()
      .collection("users")
      .doc(user.uid);
    const userInfo = await getUser.get();
    if (userInfo.exists) {
      const userData = userInfo.data() as userType;

      if (
        user.photoURL !== userData.photoURL ||
        user.displayName !== userData.displayName
      ) {
        await firebase.firestore().collection("users").doc(user.uid).update({
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }
      return {
        banned: userData.banned,
        cardsID: userData.cardsID,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      } as userType;
    } else {
      await firebase.firestore().collection("users").doc(user.uid).set({
        banned: false,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        cardId: [],
      });

      return {
        banned: false,
        cardsID: [],
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      } as userType;
    }
  } else {
    return {
      banned: false,
      cardsID: [],
      displayName: undefined,
      photoURL: undefined,
      uid: undefined,
    } as userType;
  }
}
