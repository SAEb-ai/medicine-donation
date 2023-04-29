import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./modals/sign-up-modal/sign-up-modal.jsx";
import SignIn from "./modals/sign-in-modal/sign-in-modal.jsx";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/home.jsx";
import About from "./pages/About/about.jsx";
import Todo from "./pages/todos/todo.jsx";
import Create from "./pages/Create/create.jsx";
import Borrow from "./pages/Borrow/borrow.jsx";
import Footer from "./components/Footer/footer.js";
import Logout from "./pages/logout/logout.jsx";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "./reducer/reducer.jsx";
export const UserContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <div className="App">
        <Router>
          <UserContext.Provider value={{ state, dispatch }}>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/sign-up" component={SignUp} />
              <Route exact path="/sign-in" component={SignIn} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/todo" component={Todo} />
              <Route exact path="/create" component={Create} />
              <Route exact path="/borrow" component={Borrow} />
            </Switch>
          </UserContext.Provider>
        </Router>
      </div>
    </>
  );
}

export default App;
