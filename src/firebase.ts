import { albumType, cardType, fileType, userType } from './types';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/database';

export async function uploadImage(file: fileType, tags: string[], user: userType, anon: boolean) {
  let lastCardId: number = 0;
  let imageURL: string = '';

  // get last id card

  const getLastCardId = await firebase.firestore().collection('cards').orderBy('id', 'desc').limit(1).get();

  getLastCardId.forEach((doc) => {
    lastCardId = doc.data().id;
    lastCardId += 1;
  });

  // store file

  const storageRef = firebase.storage().ref();
  const cardRef = storageRef.child(tags[0] + '/' + file.name + '_' + lastCardId + '.webp');

  const metadata = {
    contentType: file.type
  };

  await cardRef.putString(file.source, 'data_url', metadata);
  imageURL = await storageRef.child(tags[0] + '/' + file.name + '_' + lastCardId + '.webp').getDownloadURL();

  // check if album is exist

  tags.forEach(async (tag) => {
    const getAlbumList = await firebase.firestore().collection('albums').doc(tag).get();

    const newCount: number = Number(getAlbumList?.data()?.count) + 1;
    if (!getAlbumList.exists) {
      await firebase
        .firestore()
        .collection('albums')
        .doc(tag)
        .set({
          id: new Date().getTime(),
          count: 1,
          image: imageURL,
          name: tag,
          cardsId: [lastCardId]
        } as albumType);
    } else {
      const newCardsId: number[] = getAlbumList.data()?.cardsId;
      newCardsId.push(lastCardId);
      await firebase
        .firestore()
        .collection('albums')
        .doc(tag)
        .update({ count: newCount, cardsId: newCardsId, image: imageURL } as albumType);
    }
  });

  const getMetadata = await storageRef.child(tags[0] + '/' + file.name + '_' + lastCardId + '.webp').getMetadata();

  let anonUser = anon
    ? {
        userName: 'Anon',
        userPhoto: 'Anon'
      }
    : {
        userName: user.displayName || 'Unknown',
        userPhoto: user.photoURL || ''
      };

  // create document

  await firebase
    .firestore()
    .collection('cards')
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
      userUID: user.uid
    } as cardType);

  // // add if to user cards id

  let newCardsId = user.cardsID;
  newCardsId.push(lastCardId);

  await firebase.firestore().collection('users').doc(user.uid).update({ cardsID: newCardsId });

  window.location.pathname = '/card/' + lastCardId;
}

export async function getLoginUser(user: userType) {
  if (user !== null) {
    const getUser = await firebase.firestore().collection('users').doc(user.uid);
    const userInfo = await getUser.get();
    if (userInfo.exists) {
      const userData = userInfo.data() as userType;

      if (user.photoURL !== userData.photoURL || user.displayName !== userData.displayName) {
        await firebase.firestore().collection('users').doc(user.uid).update({
          displayName: user.displayName,
          photoURL: user.photoURL
        });
      }
      return {
        banned: userData.banned,
        cardsID: userData.cardsID,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid
      } as userType;
    } else {
      await firebase.firestore().collection('users').doc(user.uid).set({
        banned: false,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        cardsID: []
      });

      return {
        banned: false,
        cardsID: [],
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid
      } as userType;
    }
  } else {
    return {
      banned: false,
      cardsID: [],
      displayName: undefined,
      photoURL: undefined,
      uid: undefined
    } as userType;
  }
}

export async function getAlbums(limit: number, start: number | string) {
  const albums: albumType[] = [];

  const getAlbums = await firebase
    .firestore()
    .collection('albums')
    .orderBy('id', 'desc')
    .startAfter(start)
    .limit(10)
    .get();

  getAlbums.forEach((album) => {
    const AlbumInfo = album.data() as albumType;

    albums.push({
      count: AlbumInfo.count,
      image: AlbumInfo.image,
      name: AlbumInfo.name,
      id: AlbumInfo.id
    } as albumType);
  });

  return albums;
}

export async function getAlbum(album: string) {
  const getCards = await firebase.firestore().collection('albums').where('id', '==', Number(album)).get();

  const cardInfo: albumType = getCards.docs[0].data() as albumType;

  return cardInfo.cardsId;
}

export async function getAlbumName(album: string) {
  const getCards = await firebase.firestore().collection('albums').where('id', '==', Number(album)).get();

  const cardInfo: albumType = getCards.docs[0].data() as albumType;

  return cardInfo.name;
}

export async function getCards(queryId: number[]) {
  const cards: cardType[] = [];
  if (queryId.length === 0) {
    return [];
  }

  const query = queryId.filter((id) => {
    return id !== undefined;
  });

  const getArrayCards = await firebase.firestore().collection('cards').where('id', 'in', query).get();

  getArrayCards.forEach((card) => {
    const cardInfo = card.data() as cardType;
    cards.push(cardInfo);
  });

  const sortedCards = cards.sort((a, b) => {
    return a.id - b.id;
  });

  return sortedCards.reverse();
}

export async function getCard(id: string) {
  let card: cardType = {} as cardType;

  const getCard = await firebase.firestore().collection('cards').doc(id).get();

  const cardInfo = getCard.data() as cardType;

  card = cardInfo;
  
  return card;
}

export async function getUser(userCard: string) {
  const user: userType = {} as userType;

  const getUser = await firebase.firestore().collection('users').doc(userCard).get();

  const userInfo = getUser.data() as userType;
  user.displayName = userInfo.displayName;
  user.photoURL = userInfo.photoURL;
  user.uid = userInfo.uid;

  return user;
}

export async function getAllCards(limit: number, start: number | string) {
  const cards: cardType[] = [];

  const getDoc = await firebase.firestore().collection('cards').orderBy('id', 'desc').startAfter(start).limit(10).get();

  getDoc.forEach((card) => {
    const cardData: cardType = card.data() as cardType;
    cards.push(cardData);
  });

  return cards;
}

export async function getAlbumsBySearch(queryId: string) {
  if (queryId === undefined) {
    return [] as albumType[];
  }
  const getAlbums = await firebase
    .firestore()
    .collection('albums')
    .where('name', '>=', queryId)
    .where('name', '<=', queryId + '\uF7FF')
    .get();

  if (getAlbums.size === 0) {
    return [] as albumType[];
  }
  const albums: albumType[] = [];

  getAlbums.forEach((doc) => {
    const dataInfo = doc.data() as albumType;
    albums.push(dataInfo);
  });

  return albums;
}

export async function getCardsBySearch(queryTags: string[], start: number | string, limit: number) {
  const cards: cardType[] = [];
  console.log(queryTags);

  if (queryTags.length === 0) {
    return [] as cardType[];
  }

  const getCards = await firebase
    .firestore()
    .collection('cards')
    .where('infoTags', 'array-contains-any', queryTags.slice(0, 10))
    .orderBy('id', 'desc')
    .startAfter(start)
    .limit(10)
    .get();

  if (getCards.size === 0) {
    return [] as cardType[];
  }

  getCards.forEach((doc) => {
    const cardInfo = doc.data() as cardType;
    console.log(doc.data());

    cards.push(cardInfo);
  });

  const sortedCards = cards.sort((a, b) => {
    return a.id - b.id;
  });

  return sortedCards.reverse();
}
