import './style.css';
import { clearLibraryContainer } from './utils/clearLibraryContainer';
import { addBook, removeBook, getState, deleteLibrary } from './state/storage';
import { toggleIsRead } from './utils/toggleIsRead';
import { renderBookCard } from './components/renderBookCard';
import { renderNewBookModal } from './components/renderNewBookModal';
import { populateLibrary } from './utils/populateLibrary';

function closeModal() {
  const modal = document.getElementById('modal-wrapper');
  modal.remove();
}

function onModalClose() {
  closeModal();
}

function removeBookClickEvent(event) {
  const bookId = event.target.parentNode.getAttribute('data-book-id');
  removeBook({ bookIdToRemove: bookId });
  event.target.parentNode.remove();
}

function renderBookCards() {
  const { books } = getState();

  books.forEach((book) => {
    renderBookCard({ book, toggleIsRead, removeBookClickEvent });
  });
}

function updateBookItems() {
  clearLibraryContainer();
  renderBookCards();
}

function onNewBookModalSubmit({ title, author, pages, isRead }) {
  addBook({ title, author, pages, isRead });
  updateBookItems();
}

document.getElementById('add-book-button').addEventListener('click', () => {
  renderNewBookModal({ onNewBookModalSubmit, onNewBookModalClose: onModalClose });
});

document.getElementById('delete-library-button').addEventListener('click', () => {
  deleteLibrary();
  updateBookItems();
});

document.getElementById('populate-library-button').addEventListener('click', () => {
  populateLibrary();
  updateBookItems();
});

function onInit() {
  updateBookItems();
}

onInit();
