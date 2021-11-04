import { closeForm, clearLibrary } from './utils/functions.js';
import {
    getLibrary,
    addBook,
    removeBook,
    toggleIsRead,
    deleteLibrary,
    Book,
} from './stores/library.js';

const body = document.getElementsByClassName('body')[0];
const formWrapper = document.getElementById('form-wrapper');

populateLibrary(getLibrary());

function generateID() {
    return Math.floor(Math.random() * 10000 + 1);
}

function openForm() {
    formWrapper.classList.add('form-wrapper-visible');
    body.classList.add('body-no-scroll');
}

function addEventForDelete(deleteButton, bookID) {
    const removeSelectedBook = () => {
        removeBook(bookID);
        // deleteButton.removeEventListener('click', removeSelectedBook);
        deleteButton.parentElement.remove();
    };
    deleteButton.addEventListener('click', removeSelectedBook);
}

function createCard(title, author, pages, isRead, bookID) {
    const cardContainer = document.querySelector('#cards-container');
    const fragment = document.createDocumentFragment();

    const cardElement = document.createElement('div');
    cardElement.setAttribute('class', 'card-element');
    cardElement.setAttribute('data-book-id', `${bookID}`);

    const deleteBookButton = document.createElement('p');
    deleteBookButton.setAttribute('class', 'delete-book');
    deleteBookButton.textContent = 'X';
    addEventForDelete(deleteBookButton, bookID);

    cardElement.addEventListener('mouseover', () => {
        deleteBookButton.classList.add('delete-book-visible');
    });

    cardElement.addEventListener('mouseout', () => {
        deleteBookButton.classList.remove('delete-book-visible');
    });

    cardElement.append(deleteBookButton);

    const cardHeader = document.createElement('div');
    cardHeader.setAttribute('class', 'card-header');
    cardElement.append(cardHeader);

    const cardTitle = document.createElement('span');
    cardTitle.setAttribute('class', 'card-content');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = `${title}`;
    cardHeader.append(cardTitle);

    const cardBy = document.createElement('span');
    cardBy.setAttribute('class', 'by-element');
    cardBy.textContent = 'by';
    cardHeader.append(cardBy);

    const cardAuthor = document.createElement('span');
    cardAuthor.setAttribute('class', 'card-content');
    cardAuthor.classList.add('card-author');
    cardAuthor.textContent = `${author}`;
    cardHeader.append(cardAuthor);

    const cardFooter = document.createElement('div');
    cardFooter.setAttribute('class', 'card-footer');
    cardElement.append(cardFooter);

    const cardPages = document.createElement('span');
    cardPages.setAttribute('class', 'card-content, card-pages');
    cardPages.classList.add('card-pages');
    cardPages.textContent = `${pages} pages`;
    cardFooter.append(cardPages);

    const cardReadBookSpan = document.createElement('span');
    cardReadBookSpan.setAttribute('class', 'card-read-book-span');
    cardReadBookSpan.textContent = 'Have you read this book?';
    cardFooter.append(cardReadBookSpan);

    const cardReadBookCheckbox = document.createElement('input');
    cardReadBookCheckbox.setAttribute('type', 'checkbox');
    cardReadBookCheckbox.setAttribute('class', 'card-read-book-checkbox');
    cardReadBookCheckbox.classList.add('card-checkbox');
    cardReadBookCheckbox.checked = isRead;
    toggleIsRead(cardReadBookCheckbox, bookID);
    cardReadBookSpan.append(cardReadBookCheckbox);

    fragment.append(cardElement);
    cardContainer.append(fragment);
}

function populateLibrary(library) {
    clearLibrary();
    library.forEach((book) => {
        createCard(book.title, book.author, book.pages, book.isRead, book.id);
    });
}

function saveBook() {
    const titleElement = document.querySelector('#title-input');
    const authorElement = document.querySelector('#author-input');
    const pagesElement = document.querySelector('#pages-input');
    const isReadElement = document.querySelector('#read-book-checkbox');

    const title = titleElement.value.trim();
    const author = authorElement.value.trim();
    const pages = pagesElement.value.trim();
    const isRead = isReadElement.checked;
    const bookID = generateID();

    if (title === '' || author === '' || pages === '' || pagesElement.patternMismatch === true) {
        return;
    } else {
        addBook(title, author, pages, isRead, bookID);
        createCard(title, author, pages, isRead, bookID);
        closeForm();
    }
}

formWrapper.addEventListener('click', (event) => {
    if (event.target === formWrapper) {
        closeForm();
    }
});

document.getElementById('cancel-input').addEventListener('click', closeForm);

document.getElementById('add-book-button').addEventListener('click', openForm);

document.getElementById('refresh-library-button').addEventListener('click', () => {
    populateLibrary(getLibrary());
});

document.getElementById('delete-library-button').addEventListener('click', () => {
    deleteLibrary();
    populateLibrary(getLibrary());
});

document.getElementById('populate-library-button').addEventListener('click', () => {
    const testData = [
        Book('The Secret History', 'Donna Tartt', '551', true, generateID()),
        Book('The Little Friend', 'Donna Tartt', '643', false, generateID()),
        Book('The Goldfinch', 'Donna Tartt', '1006', true, generateID()),
    ];
    testData.forEach(({ title, author, pages, isRead, id }) => {
        addBook(title, author, pages, isRead, id);
        createCard(title, author, pages, isRead, id);
    });
});

window.saveBook = saveBook;
