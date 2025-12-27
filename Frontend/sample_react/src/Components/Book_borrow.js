import React, { useEffect, useState } from "react";
import axios from "axios";
import './Book_borrow.css';

function Book_borrow() {
    const [borrowName, setBorrowname] = useState("")
    const [borrowPhone, setBorrowphone] = useState("")
    const [getBooks, setBooks] = useState([]);
    const [bookList, setBooklist] = useState()
    
    const getAllBook = async () => {
        try {
            const result = await axios.get("https://library-model-backend.onrender.com/getAllbooks");
            if (result.data.success) {
                setBooks(result.data.data);
            }
            else {
                console.log("No valid data found from server");
            }
        }
        catch (err) {
            console.log("Error from Get All Books:", err);
        }
    }

    useEffect(() => {
        getAllBook();
    }, []);

    async function addBorrow() {
        console.log("Borrow Name:", borrowName);
        console.log("Phone:", borrowPhone);
        console.log("Selected Book ID:", bookList);
        borrowCreate()
        setBorrowname("")
        setBorrowphone("")
        setBooks("")
    }
    const borrowItem = {
        borrowName: borrowName,
        borrowPhonenumber: borrowPhone,
        book:bookList,
        borrowDate: Date.now(),
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
    }

    const borrowCreate = async () => {
        try {
            const createResult = await axios.post('https://library-model-backend.onrender.com/borrowCreate', borrowItem);
            if (createResult.data.success) {
                alert("List Updated")
            }
            else {
                alert("Updated Failed");
            }
        }
        catch (err) {
            console.log("Error Come From Borrow Create")
        }
    }
    return (
        <div>
            <div className="borrowContainer">
                <h2>Book Borrow</h2>
                <input type="text"
                    placeholder="Enter The Borrow Name"
                    value={borrowName}
                    onChange={(e) => setBorrowname(e.target.value)}></input>
                <input type="number"
                    placeholder="Enter Phoen Number"
                    value={borrowPhone}
                    onChange={(e) => setBorrowphone(e.target.value)}></input>

                <div className="bookList">
                    <select value={bookList} onChange={(e) => setBooklist(e.target.value)}>
                        <option value="">-- Choose a Book --</option>
                        {getBooks && getBooks.length > 0 ? (
                            getBooks.map((book, index) => (
                                <option key={book._id} value={book._id}>
                                    {book.title}
                                </option>
                            ))
                        ) : (
                            <option disabled>No Book Record</option>
                        )}
                    </select>
                </div>
                <button onClick={addBorrow}>Add Borrow Person</button>
            </div>
        </div>
    )
}
export default Book_borrow;