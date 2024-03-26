const addBtn = document.querySelector('#add-btn');
const dialog = document.querySelector("dialog");
const totalBooks = document.querySelector('.total-books');
const cancelBtn = document.querySelector('.cancel');
const bookContainer = document.querySelector('.books-container');
const addBookCard = document.querySelector('#add-book');
const form = document.querySelector('#form');
const input = document.querySelectorAll("input");
const submitBtn = document.querySelector('.submit');

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    createCard(); // Re-render the cards after removing the book
}


function addBook() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#is-read').checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    createCard();
}

function createCard() {
    const libraryEl = document.createElement("div");
    let titleEl = document.createElement("div");
    let authorEl = document.createElement("div");
    let pagesEl = document.createElement("div");
    let readBtn = document.createElement('button');
    readBtn.classList.add('read-btn');
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    libraryEl.classList.add('card');
    libraryEl.innerHTML = '';

    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        titleEl.innerHTML = `<p>Title: "${book.title}"</p>`;
        authorEl.innerHTML = `<p>by ${book.author}</p>`;
        pagesEl.innerHTML = `<p>Pages: ${book.pages}</p>`
        readBtn.innerHTML = `${book.read ? "Read" : "Not Read Yet"}`;
        removeBtn.innerHTML = `Remove`;

        libraryEl.appendChild(titleEl);
        libraryEl.appendChild(authorEl);
        libraryEl.appendChild(pagesEl);
        libraryEl.appendChild(readBtn);
        libraryEl.appendChild(removeBtn);

        // readBtn.setAttribute('onclick', 'toggleRead()');
        removeBtn.addEventListener('click', () => {
            removeBook(i);
        });
        addBookCard.before(libraryEl);
    }
}


input.forEach(e => {
    e.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitBtn.click();
        }
    });
});

cancelBtn.addEventListener('click', () => {
    form.reset();
    dialog.close();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBook();
    form.reset();
    dialog.close();
})

addBookCard.addEventListener('click', () => {
    dialog.showModal();
});

addBtn.addEventListener('click', () => {
    totalBooks.textContent = `Total Books: ${countBook}`;
    dialog.showModal();
});


