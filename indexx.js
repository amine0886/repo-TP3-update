
const Joi = require('joi');
const express = require('express');
const app = express();
const books = require('./db.json');
const bodyParser = require('body-parser');
const apiRouter = require('apiRouiter').router;


// Middleware
app.use(express.json())

// configuration body parser
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());



app.get('/', (req, res)=> {
    res.send('hello world')
});

app.get('/api/books', (req,res) => {
    res.status(200).json(books)
})


app.get('/api/books', (req,res) => {
    res.send(books);
});

app.post('/api/books', (req,res) => {
    const { error} = validateBook(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }


    const book = {
        id:books.length + 1,
        title: req.body.title,
        isbn:req.body.isbn,
        pageCount: req.body.pageCount
    };
    books.push(book);
    res.send(book);
});

app.put('/api/courses/:id', (req, res)=> {
    // loockup
    // if note return 404
    const book = books.find(c => c.id === parseInt(req.params.id));
    if(!book) res.status(404).send('The books with given ID was note found');
    
   
    // validation
    // if invalide return 400-bad request
    const { error} = validateBook(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    // update course
    book.title = req.body.title;
    book.isbn = req.body.isbn;
    book.pageCount = req.body.pageCount;
    // return the updates course
    res.send(book);
    });
    function validateBook(book){
        const schema ={
            title: Joi.string().min(3).required(),
            isbn: Joi.string().min(3).required(),
            pageCount: Joi.string().min(3).required()
        };
        
        return Joi.validate(book, schema);
    }
    

app.get('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if(!book) res.status(404).send('The books with given ID was note found');
    res.send(book);
    
});


server.use('api',apiRouter);


/*
app.post('/books', (req,res) => {

app.listen(8080, () => {
    console.log("Serveur à l'écoute")


})*/
const port = process.env.PORT || 8080;
app.listen(8080, () => console.log("listening on port ${PORT}..."))


