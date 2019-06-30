import { WikiApp } from './wiki';

(async () => {
  const app = new WikiApp();

  try {
    const refreshButton: HTMLButtonElement = document.querySelector('.refresh');

    refreshButton.addEventListener('click', event => {
      event.preventDefault();
      app.renderList();
      app.state.newLocationsAvailable = false;
      refreshButton.classList.remove('refresh--visible');
    });

    app.watchPosition();
  } catch (e) {
    console.error(e.toString());
  }
})();
