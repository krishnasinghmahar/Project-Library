class LibraryApp {
    constructor() {
        this.addBtn = document.querySelector('#add-btn');
        this.dialog = document.querySelector("dialog");
        this.totalBooks = document.querySelector('.total-books');
        this.cancelBtn = document.querySelector('.cancel');
        this.bookContainer = document.querySelector('.books-container');
        this.addBookCard = document.querySelector('#add-book');
        this.form = document.querySelector('#form');
        this.input = document.querySelectorAll("input");
        this.submitBtn = document.querySelector('.submit');
        this.myLibrary = [];

        this.addBtn.addEventListener('click', () => this.showAddBookDialog());
        this.addBookCard.addEventListener('click', () => this.showAddBookDialog());
        this.cancelBtn.addEventListener('click', () => this.closeDialog());
        this.form.addEventListener('submit', (e) => this.addBook(e));
        this.input.forEach(e => {
            e.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.submitBtn.click();
                }
            });
        });

        this.renderBooks();
    }

    showAddBookDialog() {
        this.dialog.showModal();
    }

    closeDialog() {
        this.form.reset();
        this.dialog.close();
    }

    addBook(e) {
        e.preventDefault();
        const title = this.form.querySelector('#title').value;
        const author = this.form.querySelector('#author').value;
        const pages = this.form.querySelector('#pages').value;
        const read = this.form.querySelector('#is-read').checked;
        const newBook = new Book(title, author, pages, read);
        this.myLibrary.push(newBook);
        this.renderBooks();
        this.form.reset();
        this.dialog.close();
    }

    removeBook(index) {
        if (index >= 0 && index < this.myLibrary.length) {
            this.myLibrary.splice(index, 1);
            this.renderBooks();
        }
    }

    toggleReadStatus(index) {
        if (index >= 0 && index < this.myLibrary.length) {
            this.myLibrary[index].read = !this.myLibrary[index].read;
            this.renderBooks();
        }
    }

    toggleReadStatus(index) {
        if (index >= 0 && index < this.myLibrary.length) {
            this.myLibrary[index].read = !this.myLibrary[index].read;
            this.renderBooks();
            // Change background color of "Read" button based on read status
            const readBtns = document.querySelectorAll('.read-btn');
            readBtns[index].style.backgroundColor = this.myLibrary[index].read ? 'lightgreen' : 'lightcoral';
        }
    }


    renderBooks() {
        this.bookContainer.innerHTML = '';
        this.myLibrary.forEach((book, index) => {
            const libraryEl = document.createElement("div");
            libraryEl.classList.add('card');

            const titleEl = document.createElement("div");
            titleEl.innerHTML = `<p>Title: "${book.title}"</p>`;

            const authorEl = document.createElement("div");
            authorEl.innerHTML = `<p>by ${book.author}</p>`;

            const pagesEl = document.createElement("div");
            pagesEl.innerHTML = `<p>Pages: ${book.pages}</p>`;

            const readBtn = document.createElement('button');
            readBtn.classList.add('read-btn');
            readBtn.innerHTML = `${book.read ? "Read" : "Not Read Yet"}`;
            readBtn.addEventListener('click', () => this.toggleReadStatus(index));

            const removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-btn');
            removeBtn.innerHTML = `Remove`;
            removeBtn.addEventListener('click', () => this.removeBook(index));

            libraryEl.appendChild(titleEl);
            libraryEl.appendChild(authorEl);
            libraryEl.appendChild(pagesEl);
            libraryEl.appendChild(readBtn);
            libraryEl.appendChild(removeBtn);

            this.bookContainer.appendChild(libraryEl);
        });
    }
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

new LibraryApp();
