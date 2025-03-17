const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let books = []; 
let booksIdCounter = 1;

app.get("/books", (req, res) => {
    res.json(books);
});

app.get("/whoami", (req, res) => {
   const studentInfo = {
    studentNumber: '2602420'
   };
   res.json(studentInfo);
});

app.get("/books/:id", (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Not found" });
    res.json(book);
});

app.post("/books", (req, res) => {
    const { author, publicationYear } = req.body;
    if (!author || !publicationYear) return res.status(400).json({ message: "Bad Request" });
    
    const newBook = { id: booksIdCounter++, author, publicationYear, specifications: {} };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Bad Request" });
    
    const { author, publicationYear } = req.body;
    if (author) book.author = author;
    if (publicationYear) book.publicationYear = publicationYear;
    
    res.json(book);
});

app.delete("/books/:id", (req, res) => {
    const index = books.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Not found" });
    
    books.splice(index, 1);
    res.status(204).send();
});

app.post("/books/:id/details", (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Not found" });
    
    const { author, genre, publicationYear } = req.body;
    book.details = { author, genre, publicationYear };
    
    res.json(book);
});

app.delete("/books/:id/details/:detailId", (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Not found" });
    
    book.details = {};
    res.json(book);
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
