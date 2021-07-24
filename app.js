//Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author= author;
    this.isbn = isbn;
}

//UI Constructor
function UI(){}

//All the add, delete operations happen on the prototype
//Add book to List
UI.prototype.addBookToList = function(book){
    //console.log(book);
    //Get the form element
    const list = document.getElementById('book-list');    
    const row = document.createElement('tr');
    //console.log(row);

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a id="delete_record" class="btn text-danger btn-transparent" href="#">X</a></td>`;
    list.appendChild(row);
}

//Delete Book from Table
UI.prototype.deleteRecord = function(e){
    if(e.target.id === 'delete_record'){
        //console.log("Yes");
        e.target.parentNode.parentNode.remove();
    }
};

//Clear Fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//UI show Alert Box
UI.prototype.showAlert = function(message, alertClass){
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

//Event Listeners
//Event listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
    //console.log("test");
    //Get form values
    const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);

    //Instantiate a UI
    const ui = new UI();

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
    e.preventDefault();
});

//Event listener for delete book from the list
document.querySelector('#book-list').addEventListener('click',function(e){
    //console.log(e.target);
    
    //Instantiate a UI
    const ui = new UI();
    ui.deleteRecord(e);
    ui.showAlert('Book removed!', 'alert-info');
    e.preventDefault();
});
