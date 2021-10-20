let library = retrieveLibrary() || [];

export function Book(title, author, pages, isRead, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = id;
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

export function addBook(title, author, pages, isRead, bookID) {
  library.push(new Book(title, author, pages, isRead, bookID));
  storeLibrary();
}

export function removeBook(bookID) {
  for (let i = 0; i < library.length; i++) {
    if (library[i].id === bookID) {
      library.splice(i, 1);
    }
  }
  storeLibrary();
}

export function toggleIsRead(checkbox, bookID) {
  checkbox.addEventListener("change", () => {
    for (let i = 0; i < library.length; i++) {
      if (library[i].id === bookID) {
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
