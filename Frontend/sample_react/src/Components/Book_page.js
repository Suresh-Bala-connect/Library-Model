import React, { useState } from "react";
import Add_Book from "./Add_Book";
import Book_borrow from "./Book_borrow";
import Book_list from "./Book_list";
import Borrow_Book_list from "./Borrow_book_list";
import Add_Catagory from "./Add_Catagory";
import Add_Stock from "./Add_Stock";
import './Book_page.css';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom"



function Book_page() {

    const [showContent, setContent] = useState("")
     const navigate = useNavigate();


    function addbook() {
        // setLogin(true)
        setContent("add_book")
    }
     function addCatagory() {
        // setLogin(true)
        setContent("add_catagory")
    }
     function addStock() {
        // setLogin(true)
        setContent("add_stock")
    }
    function bookBarrow() {
        // setLogin(false)
        setContent("book_borrow")
    }
    function bookList() {
        // setLogin(false)
        setContent("book_list")
    }
    function barrowBooklist() {
        // setLogin(false)
        setContent("borrow_book_list")
    }

    const logout = () =>{
        navigate('/');
        window.location.reload();
    }

    return (
        <div>
            <h2>A library is a silent ocean of knowledge where every book is a new journey.</h2>
            <div className="opt_btn">
                <div className="btn_one">
                    <button onClick={addbook}>Add Book</button>
                    <button onClick={addCatagory}>Add Category</button>
                    <button onClick={addStock}>Add Stock</button>
                </div>
                <div className="btn_two">
                    <button onClick={bookBarrow}>Borrow  Book</button>
                    <button onClick={bookList}>Book List</button>
                    <button onClick={barrowBooklist}>Book Borrow List</button>
                </div>
            </div>
            <div className="opt_content">
                {showContent === "add_book" && <Add_Book />}
                {showContent === "add_catagory" && <Add_Catagory />}
                {showContent === "add_stock" && <Add_Stock />}
                {showContent === "book_borrow" && <Book_borrow />}
                {showContent === "book_list" && <Book_list />}
                {showContent === "borrow_book_list" && <Borrow_Book_list />}
            </div>
            <div className="logout_btn">
                {/* <button onClick={()=>navigate("/Login_page")}>Log Out</button> */}
                <button onClick={logout}>Log Out</button>
            </div>


        </div>
    )
}
export default Book_page;