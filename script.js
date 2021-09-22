let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

const inputForm = document.getElementById("form-container");

function toggleIsRead(checkbox, titleToToggle) {
  checkbox.addEventListener("change", () => {
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].title === titleToToggle) {
        myLibrary[i].isRead = checkbox.checked;
      }
    }
  });
}

function addEventForDelete(deleteButton, titleToDelete) {
  deleteButton.addEventListener("click", () => {
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].title === titleToDelete) {
        myLibrary.splice(i, 1);
      }
    }
    clearLibrary();
    populateLibrary(myLibrary);
  });
}

function createCard(title, author, pages, isRead) {
  const cardContainer = document.querySelector("#cards-container");
  const fragment = document.createDocumentFragment();

  const cardElement = document.createElement("div");
  cardElement.setAttribute("class", "card-element");

  const deleteBookButton = document.createElement("p");
  deleteBookButton.setAttribute("class", "delete-book");
  deleteBookButton.textContent = "X";
  addEventForDelete(deleteBookButton, title);

  cardElement.append(deleteBookButton);

  const cardHeader = document.createElement("div");
  cardHeader.setAttribute("class", "card-header");
  cardElement.append(cardHeader);

  const cardTitle = document.createElement("span");
  cardTitle.setAttribute("class", "card-content");
  cardTitle.textContent = `${title}`;
  cardHeader.append(cardTitle);

  const cardBy = document.createElement("span");
  cardBy.setAttribute("class", "by-element");
  cardBy.textContent = "by";
  cardHeader.append(cardBy);

  const cardAuthor = document.createElement("span");
  cardAuthor.setAttribute("class", "card-content");
  cardAuthor.textContent = `${author}`;
  cardHeader.append(cardAuthor);

  const cardFooter = document.createElement("div");
  cardFooter.setAttribute("class", "card-footer");
  cardElement.append(cardFooter);

  const cardPages = document.createElement("span");
  cardPages.setAttribute("class", "card-content, card-pages");
  cardPages.textContent = `${pages} pages`;
  cardFooter.append(cardPages);

  const cardReadBookSpan = document.createElement("span");
  cardReadBookSpan.setAttribute("class", "card-read-book-span");
  cardReadBookSpan.textContent = "Have you read this book?";
  cardFooter.append(cardReadBookSpan);

  const cardReadBookCheckbox = document.createElement("input");
  cardReadBookCheckbox.setAttribute("type", "checkbox");
  cardReadBookCheckbox.setAttribute("class", "card-read-book-checkbox");
  cardReadBookCheckbox.checked = isRead;
  toggleIsRead(cardReadBookCheckbox, title);
  cardReadBookSpan.append(cardReadBookCheckbox);

  fragment.append(cardElement);
  cardContainer.append(fragment);
}

function clearLibrary() {
  const cardContainer = document.querySelector("#cards-container");
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
}

function populateLibrary(library) {
  library.forEach((book) => {
    createCard(book.title, book.author, book.pages, book.isRead);
  });
}

function submitFunction() {
  const titleElement = document.querySelector("#title-input");
  const authorElement = document.querySelector("#author-input");
  const pagesElement = document.querySelector("#pages-input");
  const isReadElement = document.querySelector("#read-book-checkbox");

  const title = titleElement.value.trim();
  const author = authorElement.value.trim();
  const pages = pagesElement.value.trim();
  const isRead = isReadElement.checked;

  if (
    title === "" ||
    author === "" ||
    pages === "" ||
    pagesElement.patternMismatch === true
  ) {
    console.log("I'm in the if statement");
    return false;
  } else {
    myLibrary.push(new Book(title, author, pages, isRead));
    clearLibrary();
    populateLibrary(myLibrary);
    titleElement.value = "";
    authorElement.value = "";
    pagesElement.value = "";
    isReadElement.checked = false;
    inputForm.style.display = "none";
    return false;
  }
}

document.getElementById("cancel-input").addEventListener("click", () => {
  inputForm.style.display = "none";

  const titleElement = document.querySelector("#title-input");
  const authorElement = document.querySelector("#author-input");
  const pagesElement = document.querySelector("#pages-input");
  const isReadElement = document.querySelector("#read-book-checkbox");

  titleElement.value = "";
  authorElement.value = "";
  pagesElement.value = "";
  isReadElement.checked = false;
});

document.getElementById("add-book-button").addEventListener("click", () => {
  inputForm.style.display = "block";
});

document
  .getElementById("refresh-library-button")
  .addEventListener("click", () => {
    clearLibrary();
    populateLibrary(myLibrary);
  });

document
  .getElementById("populate-library-button")
  .addEventListener("click", () => {
    myLibrary.length = 0;
    myLibrary.push(new Book("The Secret History", "Donna Tartt", "512", true));
    myLibrary.push(new Book("The Little Friend", "Donna Tartt", "232", false));
    myLibrary.push(new Book("The Goldfinch", "Donna Tartt", "872", true));
    populateLibrary(myLibrary);
  });
