import { toggleIsBookRead } from '../state/storage';

export function toggleIsRead(event) {
  const isRead = event.target.checked;
  const bookId = event.target.getAttribute('data-book-id');
  toggleIsBookRead({ bookId, isRead });
}
