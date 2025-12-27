import React, { useEffect, useState } from "react";
import './Add_Book.css';
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom";
// import Book_list from "react-router-dom"

function Add_Book() {
    const navigate = useNavigate();
    const location = useLocation();
    const editMode = location.state?.book

    const [getBookname, setBookname] = useState();
    const [getAuthorname, setAuthorname] = useState();
    const [getBookisbnnumber, setBookisbnnumber] = useState();
    const [getBookpubyear, setBookpubyear] = useState();
    const [getCatagory, setCatagory] = useState();
    const [getCatagorylist, setCatagorylist] = useState([]);
    const [getBooklist, setBooklist] = useState([]);

    const bookItems = {
        title: getBookname,
        author: getAuthorname,
        isbn: getBookisbnnumber,
        publishedYear: getBookpubyear,
        catagory: getCatagory,
    }

    const getAllcatagory = async () => {
        try {
            const result = await axios.get("http://localhost:5019/allCatagory")
            if (result.data.success) {
                setCatagorylist(result.data.data)
            }
        }
        catch (err) {
            console.log("Error come From Get AllCatageory")
        }
    }
    useEffect(() => {
        getAllcatagory();
    }, []);

    function addBooklist() {
        setBooklist([...getBooklist, bookItems])
        setBookname("");
        setAuthorname("");
        setBookpubyear("");
        setBookisbnnumber("")
        console.log(bookItems);
        // createBook();
        if (editMode) {
            updateBook();
        }
        else {
            createBook();
        }
    }

    const createBook = async () => {
        try {
            const bookResult = await axios.post('http://localhost:5019/bookCreate', bookItems);

            if (bookResult.data.success) {
                alert("Book Created")
            }
            else {
                alert("Updated Failed");
            }
        }
        catch (err) {
            console.log("Error Come From Book Create")
        }
    }

    useEffect(() => {
        if (editMode) {
            setBookname(editMode.title);
            setAuthorname(editMode.author)
            setBookisbnnumber(editMode.isbn)
            setBookpubyear(editMode.publishedYear)
            setCatagory(editMode.catagory?._id)
        }
    }, [editMode])

    const updateBook = async () =>  {
        try {
            const result = await axios.put(`http://localhost:5019/UpdateBookdata/${editMode._id}`,
                bookItems
            )
            if (result.data.success) {
                alert("Book Updated");
                navigate("/Book_list");
            }
        }
        catch (err) {
            console.log("Error updating book");
        }
    }
    return (
        <div className="add-book-wrapper">
            <div className="container">
                <h2>Adding Book</h2>
                <button onClick={() => navigate("/book_page")} className="back-btn">
                    ← Back to Book List
                </button>
                <div className="book_name">
                    <input
                        type="text"
                        placeholder="Enter the Book Name"
                        value={getBookname}
                        onChange={(e) => setBookname(e.target.value)}
                    />
                </div>
                <div className="book_author">
                    <input
                        type="text"
                        placeholder="Enter the Book Author"
                        value={getAuthorname}
                        onChange={(e) => setAuthorname(e.target.value)}
                    />
                </div>
                <div className="book_author">
                    <input
                        type="text"
                        placeholder="Enter the Book ISBN Number"
                        value={getBookisbnnumber}
                        onChange={(e) => setBookisbnnumber(e.target.value)}
                    />
                </div>
                <select value={getCatagory} onChange={(e) => setCatagory(e.target.value)}>
                    <option value="">--- Select Catageory</option>
                    {
                        getCatagorylist.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>

                        ))
                    }
                </select>
                <div className="book_pul_year">
                    <input
                        type="number"
                        placeholder="Enter the Book Published Year"
                        value={getBookpubyear}
                        onChange={(e) => setBookpubyear(e.target.value)}
                    />
                </div>
                <button type="button" onClick={addBooklist}>Add Book List</button>
            </div>
        </div>
    );
}

export default Add_Book;