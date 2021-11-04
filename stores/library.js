export class Library {
    #retrieveLibrary() {
        try {
            return JSON.parse(sessionStorage.getItem('my_library'));
        } catch (error) {
            console.error(error);
        }
    }

    constructor() {
        this.libraryArray = this.#retrieveLibrary() || [];
    }

    getLibrary() {
        return this.libraryArray;
    }

    Book(title, author, pages, isRead, id) {
        return { title, author, pages, isRead, id };
    }

    #storeLibrary() {
        sessionStorage.setItem('my_library', JSON.stringify(this.libraryArray));
    }

    addBook(title, author, pages, isRead, id) {
        this.libraryArray.push({ title, author, pages, isRead, id });
        this.#storeLibrary();
    }

    removeBook(bookID) {
        for (let i = 0; i < this.libraryArray.length; i++) {
            if (this.libraryArray[i].id === bookID) {
                this.libraryArray.splice(i, 1);
            }
        }
        this.#storeLibrary();
    }

    toggleIsRead(checkBox, bookID) {
        checkBox.addEventListener('change', () => {
            for (let i = 0; i < this.libraryArray.length; i++) {
                if (this.libraryArray[i].id === bookID) {
                    this.libraryArray[i].isRead = checkBox.checked;
                    this.#storeLibrary();
                }
            }
        });
    }

    deleteLibrary() {
        this.libraryArray = [];
        this.#storeLibrary();
    }
}
