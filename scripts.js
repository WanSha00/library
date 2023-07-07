let myLibrary = [];
const bookContent = document.querySelector(".book-content");

function Book(title, author, pages, read) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {

        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
}

function addBookToLibrary(title, author, pages, read) {

    let book = new Book(title, author, pages, read);
    myLibrary.push(book);

    displayBooks();
}

const openBtn = document.querySelector(".btn-add");
openBtn.addEventListener("click", () => {

    let formpop = document.querySelector(".popup");
    formpop.classList.toggle("show-pop");
});

const bookForm = document.getElementById("form");
bookForm.addEventListener('submit', (event) => {

    event.preventDefault();

    let bookTitle = bookForm.elements['book-title'];
    let bookAuthor = bookForm.elements['book-author'];
    let bookPages = bookForm.elements['book-pages'];
    let bookStat = bookForm.elements['book-stat'];

    addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookStat.value);

    bookForm.reset();

} );

function displayBooks() {

    let readClass = "read";

    while (bookContent.hasChildNodes()) {
        bookContent.removeChild(bookContent.firstChild);
    }

    for (let i = 0; i < myLibrary.length; i++) {

        let bookCard = document.createElement('div');
        bookCard.classList.add('card');
        bookCard.dataset.index = i;

        let readStat = myLibrary[i].read;
        if (readStat == "r") {
            readStat = "Read";
            readClass = "read";
        } else {
            readStat = "Unread";
            readClass = "unread";
        }

        bookCard.innerHTML =

            `<div class="details">
<div>Title</div>
<div class="book-data">${myLibrary[i].title}</div>
</div>

<div class="details">
<div>Author</div>
<div class="book-data">${myLibrary[i].author}</div>
</div>

<div class="details">
<div>Pages</div>
<div class="book-data">${myLibrary[i].pages}</div>
</div>

<div>
<button class="read-status ${readClass}" data-index="${i}">${readStat}</button>
</div>

<button class="btn-del" data-index="${i}">-</button>`;

        bookContent.appendChild(bookCard);
    }
}

bookContent.addEventListener('click', (e) => {

    if (e.target.classList == 'btn-del') {

        myLibrary.splice(e.target.dataset.index, 1);
        displayBooks();
    }
});

bookContent.addEventListener('click', (e) => {

    if (e.target.classList.contains('read-status')) {

        if (myLibrary[e.target.dataset.index].read == "r") {
            myLibrary[e.target.dataset.index].read = "m";

        } else {
            myLibrary[e.target.dataset.index].read = "r";
        }

        displayBooks();
    }
});









