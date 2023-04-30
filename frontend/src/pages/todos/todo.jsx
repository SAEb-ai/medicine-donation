import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./todo.css";

export default function Todos(props) {
  const [passwordShown, setPasswordShown] = useState(false);
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const [info, setInfo] = useState({
    perform: "",
    institution: "",
  });

  const history = useHistory();
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setInfo({ ...info, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { perform } = info;
    const res = await fetch("https://medicine-donation-backend.onrender.com/todo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        perform,
      }),
    });
    console.log(res.status);

    setShow(false);
    if (perform === "Donate") history.push("/create");
    else history.push("/borrow");
    return res;
  };

  return (
    <>
      <div className="form-container">
        <form className="center" Smethod="POST">
          <h1 className="decorate-heading">Please fill in more details</h1>
          <div className="form-input">
            <i class="fas fa-filter i-before"></i>
            <select className="form-input-tag" name="perform" onChange={handleInputs}>
              <option selected disabled hidden>
                What do you want to do?
              </option>
              <option value="Donate">Donate</option>
              <option value="Borrow">Borrow</option>
            </select>
          </div>

          <div className="form-input">
            <input
              type="Submit"
              id="submit"
              name="SignUp"
              className="form-sign-in-button"
              value="Submit"
              onClick={postData}
            />
          </div>
        </form>
      </div>
    </>
  );
}
