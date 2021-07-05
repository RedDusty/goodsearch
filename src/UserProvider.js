import React, { useState, useEffect, createContext } from "react";
import { auth } from "./fbConfig.js";
import { getLoginUser } from "./firebase.ts";

export const UserContext = createContext({
  displayName: undefined,
  photoURL: undefined,
  uid: undefined,
  banned: false,
  cardsID: [],
});
export default (props) => {
  const [user, setUser] = useState({
    displayName: undefined,
    photoURL: undefined,
    uid: undefined,
    banned: false,
    cardsID: [],
  });
  useEffect(() => {
    auth.onAuthStateChanged(async (cloudUser) => {
      const displayName = cloudUser
        ? cloudUser.displayName || undefined
        : undefined;
      const photoURL = cloudUser ? cloudUser.photoURL || undefined : undefined;
      const uid = cloudUser ? cloudUser.uid : undefined;
      const userData = await getLoginUser(cloudUser);
      const banned = userData.banned;
      const cardsID = userData.cardsID;
      setUser({
        displayName,
        photoURL,
        uid,
        banned,
        cardsID,
      });
    });
  }, []);
  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
