import fetch from 'node-fetch';
import { SearchResult, Extract } from '../definitions/Wikipedia';

export const wiki = {
  /**
   * Retrieves a list of nearby locations based on lat/lng
   * @param lat number
   * @param lng number
   */
  async search(lat: number, lng: number) {
    const request = await fetch(
      `https://en.wikipedia.org/w/api.php?format=json&action=query&list=geosearch&gscoord=${lat}|${lng}&gsradius=3000&gsmaxdim=100000&gslimit=25`,
    );

    const response = await request.json();

    return response.query.geosearch as Array<SearchResult>;
  },

  /**
   * Retrieves an article extract from a pageid
   * @param id number
   */
  async getExtract(id: number) {
    const request = await fetch(
      `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=${id}`,
    );

    const response = await request.json();

    return response.query.pages[id] as Extract;
  },
};
