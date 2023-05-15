import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./sign-in-modal.css";
import Home from "../../pages/Home/home";
import { UserContext } from "../../App";

export default function SignIn(props) {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [show, setShow] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);

  const handleClose = () => {
    history.push("/");
    setShow(false);
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    const res = await fetch("https://medicine-donation-backend.onrender.com/sign-in", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.status === 422 || !res || res.status === 400) {
      alert("Invalid Registration");
      return res;
    } else {
      dispatch({ type: "USER", payload: true });
      setShow(false);
      history.push("/todo");
      return res;
    }
  };
  return (
    <>
      <Home />
      <Modal className="md-round" show={show} onHide={handleClose}>
        <div className="form-container">
          <form action="/sign-in" method="POST">
            <h1 className="decorate-heading">SignIn to Medicine Donation</h1>
            <div className="form-input">
              <i className="far fa-envelope i-before"></i>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input-tag"
                placeholder="Enter your email"
                onChange={handleInputs}
                required
              />
            </div>

            <div className="form-input">
              <i className="fas fa-lock i-before"></i>
              <input
                type={passwordShown ? "text" : "password"}
                id="email"
                name="password"
                className="form-input-tag"
                placeholder="Enter your password"
                onChange={handleInputs}
                required
              />
              <i
                className={passwordShown ? "fa fa-eye i-after" : "fas fa-eye-slash i-after"}
                onClick={() => {
                  setPasswordShown(passwordShown ? false : true);
                }}
              ></i>
            </div>

            <div className="form-input">
              <input
                type="submit"
                id="signin"
                name="SignIn"
                className="form-sign-in-button"
                value="SignIn"
                onClick={postData}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
