import { setSessionName } from "./userSession";
import { Dog, SearchQueryParams, SearchResults } from "./types";

const API_URL = "https://frontend-take-home-service.fetch.com";

export const login = async (name: string, email: string) => {
  const url = API_URL + "/auth/login";
  const requestOptions = {
    method: "POST",
    mode: "cors" as RequestMode,
    headers: {
      "Access-Control-Allow-Origin": "localhost:5173",
      "Content-Type": "application/json",
    },
    withCredentials: true,
    credentials: "include" as RequestCredentials,
    body: JSON.stringify({ name: name, email: email }),
  };
  //console.log("name and email:", name, email);
  let response = await fetch(url, requestOptions).then((res) => {
    //console.log(res);
    return res;
  });
  response.status == 200 && setSessionName(name);
  return response.status;
};

export const logout = () => {
  const url = API_URL + "/auth/logout";
  const requestOptions = {
    method: "POST",
    mode: "cors" as RequestMode,
    headers: {
      "Access-Control-Allow-Origin": "localhost:5173",
      "Content-Type": "application/json",
    },
    withCredentials: true,
    credentials: "include" as RequestCredentials,
  };
  fetch(url, requestOptions);
  setSessionName("", true);
};

export const getBreeds = async () => {
  const url = API_URL + "/dogs/breeds";
  const requestOptions = {
    method: "GET",
    mode: "cors" as RequestMode,
    headers: {
      "Access-Control-Allow-Origin": "localhost:5173",
      "Content-Type": "application/json",
    },
    credentials: "include" as RequestCredentials,
    withCredentials: true,
  };
  //console.log("name and email:", name, email);
  let response = await fetch(url, requestOptions);

  if (response.status != 200) {
    window.location.reload();
  }
  //console.log("breeds response: ", response);
  return await response.json();
};

export const searchDogs = async (params: SearchQueryParams) => {
  let url =
    API_URL +
    `/dogs/search?size=18${params.breeds ? "&breeds=" + params.breeds : ""}${
      params.zipCodes ? "&zipCodes=" + params.zipCodes : ""
    }${params.ageMax ? "&ageMax=" + params.ageMax : ""}${
      params.ageMin ? "&ageMin=" + params.ageMin : ""
    }${
      params.sortField
        ? "&sort=" + params.sortField + ":" + (params.sortOrder || "asc")
        : ""
    }`;
  console.log("SEARCH URL:", url);
  const requestOptions = {
    method: "GET",
    mode: "cors" as RequestMode,
    headers: {
      "Access-Control-Allow-Origin": "localhost:5173",
      "Content-Type": "application/json",
    },
    credentials: "include" as RequestCredentials,
    withCredentials: true,
  };
  //console.log("name and email:", name, email);
  let response = await fetch(url, requestOptions);
  if (response.status != 200) {
    //window.location.reload();
    window.alert(`url search error ${url}`);
  }
  const searchDogs: SearchResults = await response.json();
  return searchDogs;
};

export const getDogsByIds = async (ids: string[]) => {
  let url = API_URL + "/dogs";

  const requestOptions = {
    method: "POST",
    mode: "cors" as RequestMode,
    headers: {
      "Access-Control-Allow-Origin": "localhost:5173",
      "Content-Type": "application/json",
    },
    credentials: "include" as RequestCredentials,
    withCredentials: true,
    body: JSON.stringify(ids),
  };
  //console.log("name and email:", name, email);
  let response = await fetch(url, requestOptions);
  if (response.status != 200) {
    window.location.reload();
  }
  const dogs: Dog[] = await response.json();
  return dogs;
};

export const searchDogsByURL = async (newURL: string) => {
  let url = API_URL + newURL;

  const requestOptions = {
    method: "GET",
    mode: "cors" as RequestMode,
    headers: {
      "Access-Control-Allow-Origin": "localhost:5173",
      "Content-Type": "application/json",
    },
    credentials: "include" as RequestCredentials,
    withCredentials: true,
  };
  //console.log("name and email:", name, email);
  let response = await fetch(url, requestOptions);
  const searchDogs: SearchResults = await response.json();
  return searchDogs;
};

export const getDogMatch = async (ids: string[]) => {
  let url = API_URL + "/dogs/match";

  const requestOptions = {
    method: "POST",
    mode: "cors" as RequestMode,
    headers: {
      "Access-Control-Allow-Origin": "localhost:5173",
      "Content-Type": "application/json",
    },
    credentials: "include" as RequestCredentials,
    withCredentials: true,
    body: JSON.stringify(ids),
  };
  //console.log("name and email:", name, email);
  let response = await fetch(url, requestOptions);
  if (response.status != 200) {
    window.location.reload();
  }
  const dogId: { match: string } = await response.json();
  return dogId.match;
};
