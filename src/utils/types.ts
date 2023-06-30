export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface SearchQueryParams {
  breeds?: string;
  zipCodes?: string;
  ageMin?: string;
  ageMax?: string;
  from?: string;
  sortField?: "id" | "name" | "age" | "zip_code" | "breed";
  sortOrder?: "asc" | "desc";
}

export interface SearchResults {
  resultIds: string[];
  total: string;
  next: string;
  prev: string;
}

export interface Match {
  match: string;
}

export type updateFavoriteDogMethod = "add" | "remove";
