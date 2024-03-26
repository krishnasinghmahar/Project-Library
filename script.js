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
    if (index >= 0 && index < myLibrary.length) {
        myLibrary.splice(index, 1);
        createCard(); // 
    } 
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
    bookContainer.innerHTML = ''; 

    myLibrary.forEach((book, index) => {
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

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.innerHTML = `Remove`;

        removeBtn.addEventListener('click', () => {
            removeBook(index);
        });

        readBtn.addEventListener('click', () => {
            book.read = !book.read;
            readBtn.innerHTML = `${book.read ? "Read" : "Not Read Yet"}`;
        });

        libraryEl.appendChild(titleEl);
        libraryEl.appendChild(authorEl);
        libraryEl.appendChild(pagesEl);
        libraryEl.appendChild(readBtn);
        libraryEl.appendChild(removeBtn);

        bookContainer.appendChild(libraryEl);
    });
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
    dialog.showModal();
});


