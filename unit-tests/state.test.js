import { deleteLibrary, addBook, toggleIsBookRead, removeBook } from '../src/state/storage';
import { populateLibrary } from '../src/utils/populateLibrary';

let mockStorage = {};

// The mocking of the Storage object is taken from the online blog https://bholmes.dev/blog/mocking-browser-apis-fetch-localstorage-dates-the-easy-way-with-jest/

beforeAll(() => {
  global.Storage.prototype.setItem = jest.fn((key, value) => {
    mockStorage[key] = value;
  });
  global.Storage.prototype.getItem = jest.fn((key) => mockStorage[key]);
});

beforeEach(() => {
  populateLibrary();
  mockStorage = {};
});

afterEach(() => {
  deleteLibrary();
});

afterAll(() => {
  global.Storage.prototype.setItem.mockReset();
  global.Storage.prototype.getItem.mockReset();
});

test('Can add book to library', () => {
  expect(
    addBook({ title: 'Semiosis', author: 'Sue Burke', pages: '333', isRead: false, id: 9575 }),
  ).toEqual({
    books: [
      {
        title: 'The Secret History',
        author: 'Donna Tartt',
        pages: '551',
        isRead: true,
        id: 2026,
      },
      {
        title: 'The Little Friend',
        author: 'Donna Tartt',
        pages: '643',
        isRead: false,
        id: 9535,
      },
      { title: 'The Goldfinch', author: 'Donna Tartt', pages: '1006', isRead: true, id: 6452 },
      { title: 'Semiosis', author: 'Sue Burke', pages: '333', isRead: false, id: 9575 },
    ],
  });
});

test('Can toggle whether a book is read or not', () => {
  expect(toggleIsBookRead({ bookId: 9535, isRead: true })).toEqual({
    books: [
      {
        title: 'The Secret History',
        author: 'Donna Tartt',
        pages: '551',
        isRead: true,
        id: 2026,
      },
      {
        title: 'The Little Friend',
        author: 'Donna Tartt',
        pages: '643',
        isRead: true,
        id: 9535,
      },
      { title: 'The Goldfinch', author: 'Donna Tartt', pages: '1006', isRead: true, id: 6452 },
    ],
  });
});

test('Can remove a book based on id', () => {
  expect(removeBook({ bookIdToRemove: 6452 })).toEqual({
    books: [
      {
        title: 'The Secret History',
        author: 'Donna Tartt',
        pages: '551',
        isRead: true,
        id: 2026,
      },
      {
        title: 'The Little Friend',
        author: 'Donna Tartt',
        pages: '643',
        isRead: false,
        id: 9535,
      },
    ],
  });
});

test('Can delete library', () => {
  expect(deleteLibrary()).toEqual({
    books: [],
  });
});
