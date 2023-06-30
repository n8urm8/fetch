import { Dog, ISession, updateFavoriteDogMethod } from "./types";

const setSessionName = (name: string, clear?: boolean) => {
  const expiresOn = new Date();
  expiresOn.setSeconds(expiresOn.getSeconds() + 3600);
  console.log(expiresOn);
  const session = JSON.stringify({
    name: name,
    expires: clear ? 0 : expiresOn.getTime(),
    favoriteDogs: [],
  });
  sessionStorage.setItem("currentFetchSession", session);
};

const getSessionName = () => {
  const sessionJSON = sessionStorage.getItem("currentFetchSession");
  const currentTime = new Date().getTime();
  if (!sessionJSON) return null;
  const session: ISession = JSON.parse(sessionJSON);
  if (session.expires < currentTime) {
    return null;
  }
  return session.name;
};

const getFavoriteDogs = () => {
  const sessionJSON = sessionStorage.getItem("currentFetchSession");
  if (!sessionJSON) return [];
  const session: ISession = JSON.parse(sessionJSON);
  return session.favoriteDogs;
};

const updateFavoriteDogs = (newDog: Dog, method: updateFavoriteDogMethod) => {
  const sessionJSON = sessionStorage.getItem("currentFetchSession");
  const { name, expires, favoriteDogs }: ISession = JSON.parse(sessionJSON!);
  let match = findMatch();

  if (method == "add" && match == false) {
    favoriteDogs.push(newDog);
  } else if (method == "remove" && match !== false) {
    favoriteDogs[match] = favoriteDogs[favoriteDogs.length - 1];
    favoriteDogs.pop();
  }

  const newSession = JSON.stringify({
    name: name,
    expires: expires,
    favoriteDogs: favoriteDogs,
  });
  sessionStorage.setItem("currentFetchSession", newSession);

  function findMatch() {
    for (let i = 0; i < favoriteDogs.length; i++) {
      if (favoriteDogs[i].id === newDog.id) {
        return i;
      }
    }
    return false;
  }

  console.log(favoriteDogs);

  return favoriteDogs;
};

export { setSessionName, getSessionName, getFavoriteDogs, updateFavoriteDogs };
