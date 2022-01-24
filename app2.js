// this is writen in the ES6 classes with Local storage(me)
//!final Js file

//Book class
class Book{
    constructor(Name, author, type) {
        this.name = Name;
        this.author = author;
        this.type = type;
    }
    SetLocalStorage(book){ //adds the book to local storage
        let data = localStorage.getItem('data');
        var dataObj = [];
        if (data == null) {
            dataObj = [];
        }
        else {
            dataObj = JSON.parse(data);
        }
        dataObj.push(book); //notes obj is array of object
        localStorage.setItem("data", JSON.stringify(dataObj));
    }
}

//Display class
class Display{
    add(){         // display the books into the html
        let data = localStorage.getItem('data');
        var dataObj = [];
        if (data == null) {
            dataObj = [];
        }
        else {
            dataObj = JSON.parse(data);
        }
        let UI_String = "";
        dataObj.forEach(function(element,index){
            UI_String = UI_String + `
            <tr>
                <td>${element.name}</td>
                <td>${element.author}</td>
                <td>${element.type}</td>
                <td><button id="${index}" onclick="deleteData(this.id)" class="btn btn-primary">Delete</button></td>
            </tr>
           `;
        });
        
        let tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = UI_String;
    }
    clear() { //clear the form
        let Libraryform = document.getElementById('Libraryform');
        Libraryform.reset();
    }
    validate(book) { //chech the book 
        if(book.name.length <2 || book.author.length<2 ){
            return false;
        }
        else{
            return true;
        }
    }
    show(string){ //alert message 
        let message = document.getElementById('message');
        if(string == 'Sucess ._.'){
            message.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>${string} Your book is Added !!</strong>
                <button type="button" class="btn-close " data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                        `
        }
        else{
            message.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>${string} Your book is not Added !!</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                        `
        }
        setTimeout(function(){ //timer for alert
                message.innerHTML = ''
            },3000
        );
    }

}

//works on every reload
let display_reload = new Display();
display_reload.add();



//when submit form is clicked book is made and fitted in local storage then validates 
//and displayed form cleared and alert message is diplayed
let AddBook = document.getElementById('AddBook');
AddBook.addEventListener('click', LibraryFormSubmit);

function LibraryFormSubmit(e) {
    e.preventDefault(); // to stop reloading the webpage 
    let Name = document.getElementById('bookName').value;
    let author = document.getElementById('Author').value;
    let type;

    let Friction = document.getElementById('Friction');
    let Programming = document.getElementById('Programming');
    let Cooking = document.getElementById('Cooking');

    if(Friction.checked){
        type = Friction.value;
    }
    else if(Programming.checked){
        type = Programming.value;
    }
    else if(Cooking.checked){
        type = Cooking.value;
    }

    let book = new Book(Name,author,type);
    let display = new Display();

    if(display.validate(book)){
        book.SetLocalStorage(book);
        display.add();
        display.clear();
        display.show('Sucess ._.');
    }
    else{
        display.clear();
        display.show('Error !!');
    }
}


//delete all button 
let del = document.getElementById('del_btn');
del.addEventListener(
    'click',function(){
        localStorage.clear();
        let dis_del = new Display();
        dis_del.add();
    }
);


//delete a book
function deleteData(index){
    let data = localStorage.getItem('data');
    let dataObj = [];
    if (data == null) {
        dataObj = [];
    }
    else {
        dataObj = JSON.parse(data);
    }
    dataObj.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(dataObj));
    let dis_del_book = new Display();
    dis_del_book.add();
}