export function clearLibraryContainer() {
  const cardContainer = document.querySelector('#cards-container');
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
}
