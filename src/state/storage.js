import { Book } from './Book';
import { getStateFromStorage, setStateToStorage } from '../services/storage';

let state = {
  books: [],
};

function setInitialStateFromStorage() {
  const storedState = getStateFromStorage();
  if (storedState && storedState.books.length !== 0) {
    state = storedState;
  }
}

export function addBook({ title, author, pages, isRead }) {
  state = {
    ...state,
    books: [...state.books, Book({ title, author, pages, isRead })],
  };
  setStateToStorage(state);
  return state;
}

export function toggleIsBookRead({ bookId, isRead }) {
  state = {
    ...state,
    books: state.books.map((book) => {
      if (book.id === bookId) {
        return {
          ...book,
          isRead,
        };
      }
      return book;
    }),
  };
  setStateToStorage(state);
}

export function removeBook({ bookIdToRemove }) {
  state = {
    ...state,
    books: state.books.filter((book) => book.id !== bookIdToRemove),
  };
  setStateToStorage(state);
}

export function getState() {
  return state;
}

export function deleteLibrary() {
  state = {
    books: [],
  };
  setStateToStorage(state);
}

setInitialStateFromStorage();
