// importing necessary modules and components
import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { setClientToken } from "../../spotify";
import Login from "../auth/login";
import Library from "../library/index";
import Player from "../player/index";
import "./home.css";

export default function Home() {
  // state to store the authentication token
  const [token, setToken] = useState("");

  // useEffect hook to handle token retrieval and storage
  useEffect(() => {
    // retrieve token from local storage
    const token = window.localStorage.getItem("token");
    // get the hash from the URL (used for authentication response)
    const hash = window.location.hash;
    window.location.hash = ""; // clearing the hash from the URL
    if(!token && hash){
      // extract token from URL hash and set it in local storage and state
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token); // setting the token iin the spotify client
    } else {
      // set the token from local storage if it exists
      setToken(token);
      setClientToken(token);
    }
  }, []);

  // conditional rendering based on token availability 
  return !token ? (
    <Login /> // show login page if no token
  ) : (
  <Router> 
    <div className="main-body">
      <Sidebar />
    <Routes>
        <Route path="/" element ={<Library />} /> 
        <Route path="/player" element={<Player />} /> 
  </Routes>
    </div>
  </Router>
  );
} 