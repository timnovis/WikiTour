export interface SearchResult {
  pageid: number;
  ns: number;
  title: string;
  lat: number;
  lon: number;
  dist: number;
  primary: string;
}

export interface Extract {
  pageid: number;
  ns: number;
  title: string;
  extract: string;
}
