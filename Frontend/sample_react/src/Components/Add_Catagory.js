import React from "react";
import { useState } from "react";
import './Add_catagory.css';
import axios from "axios";

function Add_Catagory() {

    const [getCatagoryname, setCatagoryname] = useState();
    const [getDecname, setDecname] = useState();
    const [getCatagorylist, setCatagorylist] = useState([]);

    const catagoryItem = {
        name: getCatagoryname,
        des: getDecname
    }

    function addCatagory() {
        setCatagorylist([...getCatagorylist, catagoryItem])
        createCatagory();
        setCatagoryname("");
        setDecname("")
    }

    const createCatagory = async () => {
        try {
            const bookResult = await axios.post('https://library-model-backend.onrender.com/catagoryCreate', catagoryItem);
            console.log("Book Created")
            if (bookResult.data.success) {
                alert("Catageory Created")
            }
            else {
                alert("Catageory Failed");
            }
        }
        catch (err) {
            console.log("Error Come From Catageory Create")
        }
    }
    return (
        <div>
            <div className="container">
                <h2>Add Category</h2>
                <div className="book_name">
                    <input
                        type="text"
                        placeholder="Enter the Book Catagory Name"
                        value={getCatagoryname}
                        onChange={(e) => setCatagoryname(e.target.value)}
                    />
                </div>
                <div className="book_author">
                    <input
                        type="text"
                        placeholder="Enter the Book Catagory Descriptions"
                        value={getDecname}
                        onChange={(e) => setDecname(e.target.value)}
                    />
                </div>
                <button type="button" onClick={addCatagory}>Add Category List</button>
            </div>

        </div>
    )
}
export default Add_Catagory;