export function renderBookCard({ book, toggleIsRead, removeBookClickEvent }) {
  // CREATE ROOT ELEMENTS
  const cardContainer = document.querySelector('#cards-container');
  const fragment = document.createDocumentFragment();

  const cardElement = document.createElement('div');
  cardElement.setAttribute('class', 'card-element');
  cardElement.setAttribute('data-book-id', `${book.id}`);

  // CREATE REMOVE BOOK ELEMENT

  const deleteBookButton = document.createElement('p');
  deleteBookButton.setAttribute('class', 'delete-book');
  deleteBookButton.textContent = 'X';
  deleteBookButton.addEventListener('click', removeBookClickEvent);

  cardElement.addEventListener('mouseover', () => {
    deleteBookButton.classList.add('delete-book-visible');
  });

  cardElement.addEventListener('mouseout', () => {
    deleteBookButton.classList.remove('delete-book-visible');
  });

  cardElement.append(deleteBookButton);

  // CREATE CARD HEADER ELEMENTS

  const cardHeader = document.createElement('div');
  cardHeader.setAttribute('class', 'card-header');
  cardElement.append(cardHeader);

  const cardTitle = document.createElement('span');
  cardTitle.setAttribute('class', 'card-content');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = `${book.title}`;
  cardHeader.append(cardTitle);

  const cardBy = document.createElement('span');
  cardBy.setAttribute('class', 'by-element');
  cardBy.textContent = 'by';
  cardHeader.append(cardBy);

  const cardAuthor = document.createElement('span');
  cardAuthor.setAttribute('class', 'card-content');
  cardAuthor.classList.add('card-author');
  cardAuthor.textContent = `${book.author}`;
  cardHeader.append(cardAuthor);

  // CREATE CARD FOOTER ELEMENTS

  const cardFooter = document.createElement('div');
  cardFooter.setAttribute('class', 'card-footer');
  cardElement.append(cardFooter);

  const cardPages = document.createElement('span');
  cardPages.setAttribute('class', 'card-content, card-pages');
  cardPages.classList.add('card-pages');
  cardPages.textContent = `${book.pages} pages`;
  cardFooter.append(cardPages);

  const cardReadBookSpan = document.createElement('span');
  cardReadBookSpan.setAttribute('class', 'card-read-book-span');
  cardReadBookSpan.textContent = 'Have you read this book?';
  cardFooter.append(cardReadBookSpan);

  const cardReadBookCheckbox = document.createElement('input');
  cardReadBookCheckbox.setAttribute('type', 'checkbox');
  cardReadBookCheckbox.setAttribute('data-book-id', `${book.id}`);
  cardReadBookCheckbox.setAttribute('class', 'card-read-book-checkbox');
  cardReadBookCheckbox.classList.add('card-checkbox');
  cardReadBookCheckbox.checked = book.isRead;
  cardReadBookCheckbox.addEventListener('click', toggleIsRead);
  cardReadBookSpan.append(cardReadBookCheckbox);

  // APPEND TO ROOT ELEMENTS

  fragment.append(cardElement);
  cardContainer.append(fragment);
}
