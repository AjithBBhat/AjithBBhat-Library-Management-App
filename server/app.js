const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

let books =[
    {
        bookName: "Rudest Book Ever",
        bookAuthor: "Shwetabh Gangwar",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    },
    {
        bookName: "Do Epic Shit",
        bookAuthor: "Ankur Wariko",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    }
]
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get all books
app.get('/', (req, res) => res.send(books))
//Add book route
app.post('/',(req,res)=>{
    const newBook = {
        bookName: req.body.bookName,
        bookAuthor: req.body.bookAuthor,
        bookPages: req.body.bookPages,
        bookPrice: req.body.bookPrice,
        bookState: req.body.bookState
    }
    books.push(newBook)
    res.send(books)
})

// Issue Book Route
app.post('/issueBook',(req,res)=>{
    const issueBook =  req.body.bookName
    books.forEach(book => {
        if(book.bookName===issueBook){
            book.bookState = "Issued"
        }
    });
    res.send(books)
})
// Return Book Route
app.post('/returnBook',(req,res)=>{
    const returnBook =  req.body.bookName
    books.forEach(book => {
        if(book.bookName===returnBook){
            book.bookState = "Returned"
        }
    });
    res.send(books)
})
// Delete Book Route
app.post("/delete", (req, res) => {
    const requestedBookName = req.body.bookName;
    books = books.filter(book => book.bookName !== requestedBookName);
    res.send(books)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))