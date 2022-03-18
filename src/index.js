import './style.css';
import { clearLibraryContainer } from './utils/clearLibraryContainer';
import { addBook, removeBook, getState, deleteLibrary } from './state/storage';
import { toggleIsRead } from './utils/toggleIsRead';
import { renderBookCard } from './components/renderBookCard';
import { renderNewBookModal } from './components/renderNewBookModal';

// CLOSE MODAL FUNCTION

function closeModal() {
  const modal = document.getElementById('modal-wrapper');
  console.log(modal);
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
  addBook({ title: 'The Secret History', author: 'Donna Tartt', pages: '551', isRead: true });
  addBook({ title: 'The Little Friend', author: 'Donna Tartt', pages: '643', isRead: false });
  addBook({ title: 'The Goldfinch', author: 'Donna Tartt', pages: '1006', isRead: true });

  updateBookItems();
});

function onInit() {
  updateBookItems();
}

onInit();
