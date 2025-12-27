import React from "react";
// import React, { useEffect, useState } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./Borrow.css";
// const [editBorrow,setEditborrow]=useState()

function Borrow_Book_list() {

    const [getBorrowBooks, setBorrowBook] = useState([]);

    const getAllBorrowBooks = async () => {
        try {
            const result = await axios.get("http://localhost:5019/getAllborrow");
            if (result.data.success) {
                console.log(result.data.data);

                setBorrowBook(result.data.data);
            }
        } catch (err) {
            console.log(" Error from Get All Books:", err);
        }
    };


    useEffect(() => {
        getAllBorrowBooks();
    }, []);

    async function handleReturn(borrow){
        console.log(borrow._id)
        const id = borrow._id;

        const conformDelete=window.confirm("Are U sure this Delete");
        if(!conformDelete)
            return
        try{            
            const result=await axios.put(`http://localhost:5019/deleteBorrow/${id}`,{book: borrow.book})
            console.log(result.data)
            if(result.data.success){
                alert("Done Delete Request")
                getAllBorrowBooks()
            }
        }
        catch(err){
            console.log(" Error deleting borrow:", err);
        }
    }
    function handleUpdate(){
        // <Book_borrow/>
        // alert("hI")
        console.log("Ho")
        // setEditborrow(person)
    }
    return (
        <div className="book-list-container">
            <h2>Borrow Book List</h2>

            {getBorrowBooks.length === 0 ? (
                <p>Loading books...</p>
            ) : (
                <table className="book-table">
                    <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Borrow Name</th>
                            <th>Borrow Phone Number</th>
                            <th>Book Name</th>
                            <th>Book Author</th>
                            <th>Borrow Name</th>
                            <th>Due Data</th>
                            <th>Fine Amount</th>
                            <th>Update </th>
                            <th>Return </th>

                        </tr>
                    </thead>
                    <tbody>
                        {getBorrowBooks.map((person, index) => (
                            <tr key={person._id}>
                                <td>{index + 1}</td>
                                <td>{person.borrowName}</td>
                                <td>{person.borrowPhonenumber}</td>
                                <td>{person.book?.title || "No Title"}</td>
                                <td>{person.book?.author || "No Author"}</td>
                                <td>
                                    {new Date(person.borrowDate).toLocaleDateString("en-GB")}
                                </td>
                                <td>{new Date(person.dueDate).toLocaleDateString("en-GB")}</td>
                                <td>{person.fineAmount ?? "0"}</td>
                                <td><button onClick={()=>handleUpdate()}>Update </button></td>
                                 <td><button onClick={()=>handleReturn(person)}>Return </button></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
export default Borrow_Book_list;