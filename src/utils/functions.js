const inputForm = document.getElementById("form-wrapper");

export function closeForm() {
  inputForm.classList.remove("form-wrapper-visible");

  const titleElement = document.querySelector("#title-input");
  const authorElement = document.querySelector("#author-input");
  const pagesElement = document.querySelector("#pages-input");
  const isReadElement = document.querySelector("#read-book-checkbox");

  titleElement.value = "";
  authorElement.value = "";
  pagesElement.value = "";
  isReadElement.checked = false;
}

export function clearLibrary() {
  const cardContainer = document.querySelector("#cards-container");
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
}
