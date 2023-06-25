interface ISession {
  name: string;
  expires: number;
}

const setSessionName = (name: string, clear?: boolean) => {
  const expiresOn = new Date();
  expiresOn.setSeconds(expiresOn.getSeconds() + 3600);
  console.log(expiresOn);
  const session = JSON.stringify({
    name: name,
    expires: clear ? 0 : expiresOn.getTime(),
  });
  sessionStorage.setItem("currentFetchSession", session);
};

const getSessionName = (): null | string => {
  const sessionJSON = sessionStorage.getItem("currentFetchSession");
  const currentTime = new Date().getTime();
  if (!sessionJSON) return null;
  const session: ISession = JSON.parse(sessionJSON);
  if (session.expires < currentTime) {
    return null;
  }
  return session.name;
};

export { setSessionName, getSessionName };
