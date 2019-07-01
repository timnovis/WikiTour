import { SearchResult } from '../../definitions/Wikipedia';

export class WikiApp {
  public state: {
    geoId: number;
    locations: Array<SearchResult>;
    position: Position;
    newLocationsAvailable: boolean;
  };

  constructor() {
    this.state = {
      geoId: 0,
      locations: [],
      position: null,
      newLocationsAvailable: false,
    };
  }

  private async fetchLocationsList({ coords }: Position) {
    if (this.state.locations.length === 0) {
      // First time loading
      document.querySelector('.loading').classList.add('loading--visible');
    }

    const request = await fetch(`/landmarks?lat=${coords.latitude}&lng=${coords.longitude}`);

    const locations: Array<SearchResult> = await request.json();

    document.querySelector('.loading').classList.remove('loading--visible');

    return locations;
  }

  private async updateLocationList(locations: Array<SearchResult>) {
    this.state.locations = [...locations];
  }

  private renderListItem({ title, pageid, dist }) {
    const locationItemTemplate: HTMLScriptElement = document.querySelector('#locationItemTemplate');

    return locationItemTemplate.innerHTML
      .trim()
      .replace('{{url}}', pageid)
      .replace('{{title}}', title)
      .replace('{{distance}}', String(dist));
  }

  public renderList() {
    const locationList: HTMLUListElement = document.querySelector('ul.locations');

    locationList.innerHTML = null;

    for (const location of this.state.locations) {
      const listEl: HTMLLIElement = document.createElement('li');

      locationList.appendChild(listEl).innerHTML = this.renderListItem(location);

      listEl.classList.add('locations__item');
    }
  }

  public watchPosition() {
    const refreshButton: HTMLButtonElement = document.querySelector('.refresh');

    this.state.geoId = navigator.geolocation.watchPosition(async position => {
      const locations = await this.fetchLocationsList(position);

      if (this.state.position !== null) {
        if (locations.length > 0 && this.state.locations[0].pageid !== locations[0].pageid) {
          this.updateLocationList(locations);
          this.state.newLocationsAvailable = true;
          refreshButton.classList.add('refresh--visible');
        }
      } else {
        this.updateLocationList(locations);
        this.renderList();
      }

      this.state.position = position;
    });
  }
}
