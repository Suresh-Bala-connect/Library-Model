const express=require('express')
const dotenv=require('dotenv')
dotenv.config();
const cors=require('cors')

const app=express()
app.use(express.json())

app.use(cors())

const DB=require('./db');
DB();

const book_Controller=require('./controller/bookController')
const catagory_Controller=require('./controller/catagoryController')
const stock_Controller=require('./controller/stockController')
const borrow_Controller=require('./controller/borrowController')

app.get('/test', (req, res) => {
    res.send("Test route");
});

app.post('/bookCreate',book_Controller.create_book)
app.post('/catagoryCreate',catagory_Controller.create_catagory)
app.post('/updateStock',stock_Controller.update_stock)
app.post('/borrowCreate',borrow_Controller.create_borrow)

app.get('/getAllStock',stock_Controller.getStock);
app.get('/getStockById/:bookId',stock_Controller.getStockByBookId);
app.get('/allCatagory',catagory_Controller.getCatagory)
app.get('/getBook',book_Controller.getAllbook)
app.get('/getAllbooks',book_Controller.get_all_book)
app.get('/getAllborrow',borrow_Controller.getAllBorrowList)
app.put('/deleteBorrow/:id',borrow_Controller.returnBook)
app.put('/updateBookdata/:id',book_Controller.updateBook)
app.delete('/deleteBook/:id',book_Controller.deleteBooklist)

const PORT=process.env.PORT || 5019;

app.listen(PORT,()=>{
    console.log("Server by Created")
})
