<<<<<<< HEAD
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
function App() {
  const [hover, setHover] = useState(false);
  return (
    <>
      <div className="App">
        <Router>
        <Navbar />
        </Router>
      </div>
    </>
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
>>>>>>> a6a8bfe57349ed6f20fb708c05ad39884d05c434
  );
}

export default App;
