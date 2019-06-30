import { WikiApp } from './wiki';

(async () => {
  const app = new WikiApp();

  const readButtonEl: HTMLButtonElement = document.querySelector('.read');

  readButtonEl.addEventListener('click', (event: MouseEvent) => {
    event.preventDefault();
    app.read();
  });
})();
