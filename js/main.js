class Book{
       constructor(title,author,icbn) {

         this.title=title;
         this.author=author;
         this.icbn=icbn;
       }


}


class Store{

  static getBooks(){
    let books;


    if(localStorage.getItem('book')==null){
      books=[];
    }
    else{
      books=JSON.parse(localStorage.getItem('books'))
    }

    return books;

  }
  static  addBooks(book){
        const books=Store.getBooks();
        books.push(book);
    localStorage.setItem('books',JSON.stringify(books))
  }
  static removeBooks(Icbn){

    const books=Store.getBooks();

    books.forEach((book,index)=>{
      if(book.Icbn==Icbn){
        book.splice(index,1)

      }
    })


    localStorage.setItem('books',JSON.stringify(books))
  }

}
class Ui{


  static display() {
    let Books=Store.getBooks();
    const StoreBook = [

      {
        title: "Misir Ali",
        author: "Humayun Ahmed",
        icbn: 554
      },
      {
        title: "Himu",
        author: "Humayun Ahmed",
        icbn: 54
      }
    ];


    // let Books = StoreBook;
  console.log(Books);
    Books.forEach((book)=> Ui.AddBooks(book))
  }
    static  AddBooks(book){
     const list =document.querySelector("#Book-List");
     const row=document.createElement("tr")

      row.innerHTML=`
             <td>${book.title}</td>
             <td>${book.author}</td>
             <td>${book.icbn}</td>
              <td ><a href="#" class="btn btn-danger delete">X</a></td>`
      list.appendChild(row)


    }

    static ClearFilled(){

      let title=document.getElementById('BookName').value='';
      let author=document.getElementById('aName').value='';
      let Icbn=document.getElementById('Icbn').value='';
    }
     static Delete(el){
    if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove();
    }

     }


}


document.addEventListener('DOMContentLoaded',Ui.display)



document.querySelector('#Form').addEventListener('submit',(e)=>{
   e.preventDefault();
  let title=document.getElementById('BookName').value;
  let author=document.getElementById('aName').value;
  let Icbn=document.getElementById('Icbn').value;



if(title===''||author===''||Icbn===''){

  alert("Fill All field");

}
else{
  const book = new Book(title,author,Icbn);
  console.log(book);

  Ui.AddBooks(book);

  Store.addBooks(book);
  Ui.ClearFilled();}

})


document.getElementById('Book-List').addEventListener('click',function (e){
  // e.preventDefault();
  console.log(e.target);
 Ui.Delete(e.target);
 Store.removeBooks(e.target.parentElement.previousElementSibling.textContent)
})

