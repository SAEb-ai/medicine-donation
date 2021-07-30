import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from './modals/sign-up-modal/sign-up-modal.jsx';
import SignIn from './modals/sign-in-modal/sign-in-modal.jsx';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
function App() {
  return (
    <>
      <div className="App">
        <Router>
         <Navbar />
          <Switch>
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/sign-in" component={SignIn} />          
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
