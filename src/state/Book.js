function generateID() {
  return Math.floor(Math.random() * 10000 + 1).toString();
}

export function Book({ title, author, pages, isRead, id = generateID() }) {
  return {
    title,
    author,
    pages,
    isRead,
    id,
  };
}
