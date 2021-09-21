let myLibrary = [];

function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
}

const inputForm = document.getElementById("form-container");

document.getElementById("cancel-input").addEventListener("click", () => {
  inputForm.style.visibility = "hidden";

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
  inputForm.style.visibility = "visible";
});

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
    titleElement.value = "";
    authorElement.value = "";
    pagesElement.value = "";
    isReadElement.checked = false;
    inputForm.style.display = "none";
    return false;
  }
}
