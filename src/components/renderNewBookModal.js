export function renderNewBookModal({ onNewBookModalSubmit, onNewBookModalClose }) {
  // CREATE ROOT ELEMENTS
  const rootElement = document.getElementById('root');
  const fragment = document.createDocumentFragment();

  const modalWrapper = document.createElement('div');
  modalWrapper.classList.add('modal-wrapper');
  modalWrapper.id = 'modal-wrapper';

  // CREATE MODAL ELEMENTS
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');
  modalContainer.id = 'modal-container';

  const cancelInputElement = document.createElement('p');
  cancelInputElement.classList.add('cancel-input');
  cancelInputElement.id = 'cancel-input';
  cancelInputElement.textContent = 'X';

  modalContainer.append(cancelInputElement);

  // FORM ELEMENTS
  const formElement = document.createElement('form');
  formElement.classList.add('new-book-form');
  formElement.id = 'new-book-form';

  const formHeader = document.createElement('h2');
  formHeader.textContent = 'Tell me about your book';

  formElement.append(formHeader);

  // CREATE TITLE INPUT ELEMENTS
  const titleSpan = document.createElement('span');
  titleSpan.textContent = 'Title:';

  const titleInput = document.createElement('input');
  titleInput.classList.add('book-info-input');
  titleInput.id = 'title-input';
  titleInput.setAttribute('required', 'required');
  titleInput.setAttribute('type', 'text');

  titleSpan.append(titleInput);

  formElement.append(titleSpan);

  // CREATE AUTHOR INPUT ELEMENTS
  const authorSpan = document.createElement('span');
  authorSpan.textContent = 'Author:';

  const authorInput = document.createElement('input');
  authorInput.classList.add('book-info-input');
  authorInput.id = 'author-input';
  authorInput.setAttribute('required', 'required');
  authorInput.setAttribute('type', 'text');

  authorSpan.append(authorInput);

  formElement.append(authorSpan);

  // CREATE NUMBER OF PAGES ELEMENTS
  const pageNumbersSpan = document.createElement('span');
  pageNumbersSpan.textContent = 'Number of pages:';

  const pageNumbersInput = document.createElement('input');
  pageNumbersInput.classList.add('book-info-input');
  pageNumbersInput.id = 'pages-input';
  pageNumbersInput.setAttribute('type', 'text');
  pageNumbersInput.setAttribute('required', 'required');
  pageNumbersInput.setAttribute('pattern', '[0-9]+');
  pageNumbersInput.setAttribute('title', 'Please only enter numbers');

  pageNumbersSpan.append(pageNumbersInput);

  formElement.append(pageNumbersSpan);

  // CREATE READ BOOK ELEMENTS
  const readBookSpan = document.createElement('span');
  readBookSpan.textContent = 'Have you read this book?';
  readBookSpan.classList.add('book-infor-input');
  readBookSpan.classList.add('read-book-span');
  readBookSpan.id = 'read-book-span';

  const readBookLabel = document.createElement('label');
  readBookLabel.classList.add('switch');

  const readBookInput = document.createElement('input');
  readBookInput.id = 'read-book-checkbox';
  readBookInput.setAttribute('type', 'checkbox');

  readBookLabel.append(readBookInput);

  const readBookSlider = document.createElement('span');
  readBookSlider.classList.add('slider');

  readBookLabel.append(readBookSlider);

  readBookSpan.append(readBookLabel);

  formElement.append(readBookSpan);

  // CREATE SUBMIT MODAL BUTTON ELEMENT
  const submitFormButton = document.createElement('button');
  submitFormButton.classList.add('submit-book-button');
  submitFormButton.id = 'submit-book-button';
  submitFormButton.textContent = 'Submit';

  formElement.append(submitFormButton);

  // ATTACH MODAL ELEMENTS TO ROOT ELEMENTS
  modalContainer.append(formElement);

  modalWrapper.append(modalContainer);

  fragment.append(modalWrapper);

  rootElement.append(fragment);

  // CLOSE MODAL FUNCTIONS
  modalWrapper.addEventListener('click', (event) => {
    if (event.target === modalWrapper) {
      onNewBookModalClose();
    }
  });
  cancelInputElement.addEventListener('click', onNewBookModalClose);

  // SUBMIT BUTTON EVENT HANDLER
  submitFormButton.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = pageNumbersInput.value.trim();
    const isRead = readBookInput.checked;

    if (title !== '' && author !== '' && /^\d+$/.test(pages) !== false) {
      onNewBookModalSubmit({ title, author, pages, isRead });
      onNewBookModalClose();
    }
  });
}
