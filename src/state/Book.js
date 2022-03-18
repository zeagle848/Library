function generateID() {
  return Math.floor(Math.random() * 10000 + 1).toString();
}

export function Book({ title, author, pages, isRead }) {
  return {
    id: generateID(),
    title,
    author,
    pages,
    isRead,
  };
}
