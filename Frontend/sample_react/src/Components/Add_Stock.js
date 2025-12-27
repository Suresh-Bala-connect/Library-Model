import React, { useEffect, useState } from "react";
import './Add_stock.css';
import axios from "axios";

function Add_Stock() {

    const [getStockqty, setStockqty] = useState("");
    const [getBookid, setBookid] = useState("")
    const [getAllbooks, setAllbooks] = useState([])

    const getAllbooklist = async () => {
        try {
            const bookResult = await axios.get("http://localhost:5019/getBook");
            if (bookResult.data.success) {
                setAllbooks(bookResult.data.data)
            }
        }
        catch (err) {
            console.log("Error come From Get Get All Books List")
        }
    }

    useEffect(() => {
        getAllbooklist();
    }, [])

    const stockItem = {
        book: getBookid,
        totalCopies: Number(getStockqty),
        availableCopies: Number(getStockqty)
    };


    function addStock() {
        updateStock();
        console.log(stockItem)
    }

    const updateStock = async () => {
        try {
            const result = await axios.post('http://localhost:5019/updateStock', stockItem);
            console.log(result)
            if (result.data.success) {
                alert("Stock Created")
            }
            else {
                alert(" Stock Updated Failed");
            }
        }
        catch {
            console.log("Error Come From Stock Create")
        }
    }

    return (
        <div className="container">
            <h2>Add Stock</h2>

            <select value={getBookid} onChange={(e) => setBookid(e.target.value)} >

                <option value="">Select Book Name</option>
                {
                    getAllbooks.map((book) => (
                        <option key={book._id} value={book._id}>
                            {book.title}
                        </option>
                    ))

                }

            </select>

            <div className="book_name">
                <input
                    type="number"
                    placeholder="Enter the Book Stock Qty"
                    value={getStockqty}
                    onChange={(e) => setStockqty(e.target.value)}
                />
            </div>

            <button type="button" onClick={addStock}>Add Stock</button>

        </div>
    );
}

export default Add_Stock;
