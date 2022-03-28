import { addBook } from '../state/storage';

export function populateLibrary() {
  addBook({
    title: 'The Secret History',
    author: 'Donna Tartt',
    pages: '551',
    isRead: true,
    id: 2026,
  });
  addBook({
    title: 'The Little Friend',
    author: 'Donna Tartt',
    pages: '643',
    isRead: false,
    id: 9535,
  });
  addBook({ title: 'The Goldfinch', author: 'Donna Tartt', pages: '1006', isRead: true, id: 6452 });
}
