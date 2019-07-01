(async () => {
  const readButtonEl: HTMLButtonElement = document.querySelector('.read');

  readButtonEl.addEventListener('click', (event: MouseEvent) => {
    event.preventDefault();

    const article = document.querySelector('.article');

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(new SpeechSynthesisUtterance(article.textContent));
  });
})();
