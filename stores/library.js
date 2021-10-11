let library = retrieveLibrary() || [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function retrieveLibrary() {
  try {
    return JSON.parse(sessionStorage.getItem("my_library"));
  } catch (error) {
    console.error(error);
  }
}

function storeLibrary() {
  sessionStorage.setItem("my_library", JSON.stringify(library));
}

export function getLibrary() {
  return library;
}

export function addBook(title, author, pages, isRead) {
  library.push(new Book(title, author, pages, isRead));
  storeLibrary();
}

export function removeBook(titleToDelete) {
  for (let i = 0; i < library.length; i++) {
    if (library[i].title === titleToDelete) {
      library.splice(i, 1);
    }
  }
  storeLibrary();
}

export function toggleIsRead(checkbox, titleToToggle) {
  checkbox.addEventListener("change", () => {
    for (let i = 0; i < library.length; i++) {
      if (library[i].title === titleToToggle) {
        library[i].isRead = checkbox.checked;
        storeLibrary();
      }
    }
  });
}

export function deleteLibrary(){
  library = [];
  storeLibrary();
}
//USE A CONSTANT FOR THE SESSION STORAGE KEY
//DO ALL SESSION STORAGE WITHIN THIS FILE
