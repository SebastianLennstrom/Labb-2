'use strict';

let bookList = [];

window.addEventListener('load', () => {
  getAll().then((apiBooks) => (bookList = apiBooks));
  
});


searchField.addEventListener('keyup', (e) =>
  renderBookList(
    bookList.filter(({ title, author }) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  )
);

function renderBookList(bookList) {
  const existingElement = document.querySelector('.book-list');

  const root = document.getElementById('root');

  existingElement && root.removeChild(existingElement);
  bookList.length > 0 && searchField.value && root.insertAdjacentHTML('beforeend', BookList(bookList));
  let book = document.querySelectorAll(".book-list__item");
  book.forEach(i => {
    i.addEventListener("mouseenter", () => {
      root.insertAdjacentHTML("beforeend", BookListInfo(getBookId(i.getAttribute("id"))));
      console.log(i)
    i.addEventListener("mouseleave", () =>{
      document.querySelector(".book-list__info").remove() ;
    })
  })
} )  


}

function getBookId(id){
  for (let i = 0; i < bookList.length; i++) {
    if(bookList[i].id == id){
    console.log(i)
    return bookList[i]
    }
  }
}




/*
function renderBookInfo(bookList) {
  const existingElement = document.querySelector('.book-list__info');

  const root = document.getElementById('root');

  existingElement && root.removeChild(existingElement);
  bookList.length > root.insertAdjacentHTML('beforeend', BookListInfo(bookList));
}*/








