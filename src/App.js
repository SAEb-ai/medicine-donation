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
  );
}

export default App;
