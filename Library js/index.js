//Book Class : Rrpresents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class : Handle Tasks
class UI {
    static displayBooks() {
        const StoredBooks = [{
                title: "Book One",
                author: "John Doe",
                isbn: "23545",
            },
            {
                title: "Book Two",
                author: "Amy Lara",
                isbn: "23545",
            },
        ];
        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>      
        
        `;

        list.appendChild(row);
    }

    static showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);
        //removes after 3 seconds
        setTimeout(() => document.querySelector(".alert").remove(), 3000);
    }

    static clearField() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }
    static deleteBook(el) {
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    }
}

// Store Class: Handle Storage

//Events: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Events : Add a book

document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    //Get the forms Value

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    if (title === "" || author === "" || isbn === "") {
        UI.showAlert("please fill all forms", "danger");
    } else {
        //Instatiate book
        const book = new Book(title, author, isbn);

        //add book to List
        UI.addBookToList(book);
        UI.showAlert("Book have been added", "success");

        //clear fields

        UI.clearField();
    }
});

//Events: Remove a book

document.querySelector("#book-list").addEventListener("click", (e) => {
    UI.deleteBook(e.target);
    UI.showAlert("Book have been deleted", "info");
});