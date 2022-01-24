// this is writen in the ES6 classes


//Book class
class Book{
    constructor(Name, author, type) {
        this.name = Name;
        this.author = author;
        this.type = type;
    }
}

//Display class
class Display{
    add(book){
        let tableBody = document.getElementById('tableBody');
        let UI_String = `
                <tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                </tr>
        `;
        tableBody.innerHTML += UI_String;
    }
    clear() {
        let Libraryform = document.getElementById('Libraryform');
        Libraryform.reset();
    }
    validate(book) {
        if(book.name.length <2 || book.author.length<2 ){
            return false;
        }
        else{
            return true;
        }
    }
    show(string){
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
        setTimeout(function(){
                message.innerHTML = ''
            },3000
        );
    }

}

let Libraryform = document.getElementById('Libraryform');
Libraryform.addEventListener('submit', LibraryFormSubmit);

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
        display.add(book);
        display.clear();
        display.show('Sucess ._.');
    }
    else{
        //show error
        display.show('Error !!');
        display.clear();
    }
}