let library = retrieveLibrary() || [];

export function Book(title, author, pages, isRead, id) { //Converted to a factory function
  return {title, author, pages, isRead, id};
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

export function addBook(title, author, pages, isRead, id) {
  library.push({title, author, pages, isRead, id});
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
