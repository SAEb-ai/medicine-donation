import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
function App() {
  return (
    <>
      <div className="App">
        <Router>
        <Navbar />
        </Router>
      </div>
    </>
  );
}

export default App;
