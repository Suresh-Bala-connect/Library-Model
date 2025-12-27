import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Book_list.css";
import Add_Book from "./Add_Book";
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom";
function Book_List() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();


  const getAllBooks = async () => {
    try {
      const result = await axios.get("http://localhost:5019/getAllbooks");
      if (result.data.success) {
        console.log(result.data.data);

        setBooks(result.data.data);
      }
    } catch (err) {
      console.log("Error from Get All Books:", err);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  async function bookDelete(id) {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return; 
    }
    try {
      const result = await axios.delete(`http://localhost:5019/deleteBook/${id}`)
      // console.log("84884",id)
      console.log("---",result);
      
      if (result.data.success) {
        console.log("Delete success");
        getAllBooks();
        // setBooks(books.filter(book => book._id !== id));
      }
    }
    catch (err) {
      console.log("Err Form Delete Function")
    }
  }
  return (
    <div className="book-list-container">
      <h2>Full Book List</h2>

      {books.length === 0 ? (
        <p>Loading books...</p>
      ) : (
        <table className="book-table">
          <thead>
            <tr>
              <th>SL No</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Category</th>
              <th>Year</th>
              <th>Language</th>
              <th>Stock</th>
              <th>Aviable Stock</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.catagory?.name || "N/A"}</td>
                <td>{book.publishedYear}</td>
                <td>{book.language}</td>
                <td>{book.stock?.totalCopies}</td>
                <td>{book.stock?.availableCopies}</td>
                <td><button onClick={() => navigate("/add_Book", { state: { book } })}>Edit</button></td>
                <td><button onClick={() => bookDelete(book._id)}>Delete</button></td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Book_List;
