class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author= author;
        this.isbn = isbn;
    }
}

class UI {

    //All the add, delete operations happen on the prototype
    
    //Add book to List
    addBookToList(book){
        //console.log(book);
        //Get the form element
        const list = document.getElementById('book-list');    
        const row = document.createElement('tr');
        //console.log(row);

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a id="delete_record" class="btn text-danger btn-transparent pt-0" href="#">X</a></td>`;
        list.appendChild(row);
    }

    showAlert(message, alertClass){
        //Get the book form dom element
        const formEle = document.getElementById('book-form');
        //Create the iv element for alert box
        const createDiv = document.createElement('div');
        //add class list
        createDiv.className = `alert ${alertClass}`;
        //set the text message
        createDiv.innerHTML = message;
        //Get the container dom element
        const parentEle = document.querySelector('.container');
        //Insert alert box right before form element
        parentEle.insertBefore(createDiv, formEle);
        //Set time out after 3 seconds
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 5000)
    }

    deleteBookRecord(e){
        if(e.target.id === 'delete_record'){
            //console.log("Yes");
            e.target.parentNode.parentNode.remove();
            Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
        }
    }

    //Clear Fields
    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

//Local Storage Class
class Storage {
    static getBooks(){
        let books; 
        if(localStorage.getItem('books') === null){
            books = []; 
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks(){
        const books = Storage.getBooks();

        books.forEach(book => {
            //console.log(book);
            const ui = new UI();
            ui.addBookToList(book);
        });
    }
    static addBook(book){
        const books = Storage.getBooks();
        //console.log(books);
        books.push(book);
        //console.log(JSON.stringify(books));
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = Storage.getBooks();
        const newBooks = Object.values(books).filter(book => {
            return book.isbn != isbn;
        });
        localStorage.setItem('books', JSON.stringify(newBooks));
    }
}

//Event Listeners

//Event listener for add book
document.getElementById('book-form').addEventListener('submit', function(evente){
    //console.log("test");
    //Get form values
    const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);
    Storage.addBook(book);

    //Instantiate a UI
    const ui = new UI();
    //console.log(ui);

    //Validate
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields', 'alert-danger')
    } else {
        //UI Add book to List
        ui.addBookToList(book);
        //UI Clear fields
        ui.clearFields();
        //UI show alert box
        ui.showAlert('Successfully Added!', 'alert-success'); 
    }
    event.preventDefault();
});

//Event listener for delete book from the list
document.querySelector('#book-list').addEventListener('click',function(event){
    //console.log(event.target);
    
    //Instantiate a UI
    const ui = new UI();
    ui.deleteBookRecord(event);
    ui.showAlert('Book removed!', 'alert-info');
    event.preventDefault();
});

//DOM Load event
document.addEventListener('DOMContentLoaded', Storage.displayBooks());