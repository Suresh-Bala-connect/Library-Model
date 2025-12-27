import React, { useState } from "react";
import './Book_page'
import Book_page from "./Book_page";
import img from "./img.png";
import './Login_Page.css';

function Login_Page() {

    const [getValue, setValue] = useState("")
    const [isLogin, setIslogin] = useState(true)

    function handlePin(e) {
        setValue(e.target.value)
    }
    function handlePassword() {
        if (getValue == "1234") {
            alert("Login Sucessfully");
            setIslogin(false)
        }
    }
    return (
        <div>
            {
                isLogin ? (
                    <div>
                        <div className="opt_page">
                            <div className="head_img">
                                <h2>Hi Welcome To Library</h2>
                                <h2>A library is a place where books and knowledge are collected for people to read, learn, and explore.</h2>
                                <img src={img}></img>
                            </div>

                            <div className="input_value">
                                <input type="password"
                                    placeholder="Enter Your 4 Digi Number"
                                    value={getValue}
                                    onChange={handlePin}></input>
                                <button onClick={handlePassword}>Login Page</button>
                            </div>

                        </div>
                    </div>
                ) : (
                    <Book_page />
                )
            }
        </div>
    )
}

export default Login_Page;
