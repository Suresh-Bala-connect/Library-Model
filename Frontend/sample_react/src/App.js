// import logo from './logo.svg';
// import './App.css';
// import Login_Page from './Components/Login_Page';
// import Add_Book from './Components/Add_Book';
// import Borrow_Book_list from './Components/Borrow_book_list';
// import Add_Catagory from './Components/Add_Catagory';
// import Add_Stock from './Components/Add_Stock';
// import Book_borrow from './Components/Book_borrow';
// import Book_List from './Components/Book_list';

// function App() {
//   return (
//     <div className="App">
//         <Login_Page/>
//         {/* <Add_Book/> */}
//         {/* <Add_Catagory/> */}
//         {/* <Add_Stock/> */}
//         {/* <Book_borrow/> */}
//         {/* <Book_List/> */}
//         {/* <Borrow_Book_list/> */}
//     </div>
//   );
// }

// export default App;
import './App.css';
import Login_Page from './Components/Login_Page';
import Add_Book from './Components/Add_Book';
import Borrow_Book_list from './Components/Borrow_book_list';
import Add_Catagory from './Components/Add_Catagory';
import Add_Stock from './Components/Add_Stock';
import Book_borrow from './Components/Book_borrow';
import Book_List from './Components/Book_list';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Book_page from './Components/Book_page';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default login page */}
        <Route path="/" element={<Login_Page />} />

        {/* After login you can navigate to these pages */}
        <Route path="/add_book" element={<Add_Book />} />
        <Route path="/borrow_list" element={<Borrow_Book_list />} />
        <Route path="/add_catagory" element={<Add_Catagory />} />
        <Route path="/add_stock" element={<Add_Stock />} />
        <Route path="/borrow_book" element={<Book_borrow />} />
        <Route path="/book_list" element={<Book_List />} />
        <Route path="/book_page" element ={<Book_page/>}></Route>
        <Route path="/Login_page" element ={<Login_Page/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
