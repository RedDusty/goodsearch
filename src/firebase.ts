import {
  albumType,
  cardType,
  cardTypeShort,
  fileType,
  userType,
} from "./types";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

export async function uploadImage(
  album: string = "unknown",
  file: fileType,
  tags: string[],
  user: userType,
  anon: boolean
) {
  let lastCardId: number = 0;
  let imageURL: string = "";

  const getLastCardId = await firebase
    .firestore()
    .collection("cards")
    .orderBy("id", "desc")
    .limit(1)
    .get();

  getLastCardId.forEach((doc) => {
    lastCardId = doc.data().id;
    lastCardId += 1;
  });

  const storageRef = firebase.storage().ref();
  const cardRef = storageRef.child(
    album + "/" + file.name + "_" + lastCardId + ".webp"
  );

  const metadata = {
    contentType: file.type,
  };

  await cardRef.putString(file.source, "data_url", metadata);
  imageURL = await storageRef
    .child(album + "/" + file.name + "_" + lastCardId + ".webp")
    .getDownloadURL();

  const getAlbumList = await firebase
    .firestore()
    .collection("albums")
    .doc(album)
    .get();
  const newCount: number = Number(getAlbumList?.data()?.count) + 1;
  if (!getAlbumList.exists) {
    let lastAlbumId: number = 0;

    const getLastAlbumId = await firebase
      .firestore()
      .collection("albums")
      .orderBy("id", "desc")
      .limit(1)
      .get();

    getLastAlbumId.forEach((doc) => {
      lastAlbumId = doc.data().id;
      lastAlbumId += 1;
    });

    await firebase
      .firestore()
      .collection("albums")
      .doc(album)
      .set({
        id: lastAlbumId,
        count: 1,
        image: imageURL,
        name: album,
        cardsId: [lastCardId],
      } as albumType);
  } else {
    const newCardsId: number[] = getAlbumList.data()?.cardsId;
    newCardsId.push(lastCardId);
    await firebase
      .firestore()
      .collection("albums")
      .doc(album)
      .update({ count: newCount, cardsId: newCardsId } as albumType);
  }

  const getMetadata = await storageRef
    .child(album + "/" + file.name + "_" + lastCardId + ".webp")
    .getMetadata();

  let anonUser = anon
    ? {
        userName: "Anon",
        userPhoto: "Anon",
      }
    : {
        userName: user.displayName || "Unknown",
        userPhoto: user.photoURL || "",
      };

  await firebase
    .firestore()
    .collection("cards")
    .doc(String(lastCardId))
    .set({
      fileName: file.name,
      fileSize: getMetadata.size || 0,
      fileType: file.type,
      fileURL: imageURL,
      id: lastCardId,
      infoTags: tags,
      infoTime: new Date().getTime(),
      userName: anonUser.userName,
      userPhoto: anonUser.userPhoto,
      userUID: user.uid,
      album: album,
    } as cardType);

  console.log(user);

  let newCardsId = user.cardsID;
  newCardsId.push(lastCardId);

  await firebase
    .firestore()
    .collection("users")
    .doc(user.uid)
    .update({ cardsID: newCardsId });

  window.location.pathname = "/card/" + lastCardId;
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
        cardsID: [],
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

export async function getAlbums(limit: number, start: number) {
  const albums: albumType[] = [];

  const getAlbums = await firebase
    .firestore()
    .collection("albums")
    .orderBy("id", "asc")
    .limit(10)
    .startAt(start)
    .get();

  getAlbums.forEach((album) => {
    const AlbumInfo = album.data() as albumType;

    albums.push({
      count: AlbumInfo.count,
      image: AlbumInfo.image,
      name: AlbumInfo.name,
    } as albumType);
  });

  return albums;
}

export async function getCards(limit: number, start: number, album: string) {
  const cards: cardTypeShort[] = [];

  const getCards = await firebase
    .firestore()
    .collection("cards")
    .where("album", "==", album)
    .orderBy("id", "asc")
    .limit(10)
    .startAt(start)
    .get();

  getCards.forEach((card) => {
    const CardInfo = card.data() as cardTypeShort;

    cards.push({
      fileURL: CardInfo.fileURL,
      id: CardInfo.id,
    } as cardTypeShort);
  });

  return cards;
}

export async function getCard(id: string) {
  let card: cardType = {} as cardType;

  const getCard = await firebase.firestore().collection("cards").doc(id).get();

  const cardInfo = getCard.data() as cardType;

  card = cardInfo;

  return card;
}

export async function getUser(userCard: string) {
  const user: userType = {} as userType;

  const getUser = await firebase
    .firestore()
    .collection("users")
    .doc(userCard)
    .get();

  const userInfo = getUser.data() as userType;
  user.displayName = userInfo.displayName;
  user.photoURL = userInfo.photoURL;
  user.uid = userInfo.uid;

  return user;
}
