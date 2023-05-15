import { Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { ListGroupItem } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./create.css";
import pic from "../../images/1.png";
import axios from "axios";
import shadows from "@material-ui/core/styles/shadows";

export default function Create(props) {
  const [test, setTest] = useState([]);
  const callCreatePage = async () => {
    try {
      const res = await fetch("https://medicine-donation-backend.onrender.com/create", {
        method: "GET",
        headers: {
          Acccept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data.lBooks);
      setTest([data.lBooks]);
      if (res.status != 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/sign-in");
    }
  };
  useEffect(() => {
    callCreatePage();
  }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [file, setFile] = useState({
  //     image: null
  // });
  const [items, setItems] = useState([]);
  // const [file, setFile] = useState([]);

  //   // On file select (from the pop up)
  //   onFileChange = event => {

  //     // Update the state
  //     this.setState({ selectedFile: event.target.files[0] });

  //   }

  const [user, setUser] = useState({
    lbook: "",
    ltime: "",
    image: "",
  });
  const history = useHistory();
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handlePhoto = (e) => {
    name = e.target.name;
    value = e.target.files[0];
    const file_size = e.target.files[0].size;
    const file_size_in_kb = Math.round(file_size / 1024);
    // The size of the file.
    if (file_size_in_kb >= 150) {
      alert("File too Big, please select a file less than 4mb");
    } else if (file_size_in_kb < 20) {
      alert("File too small, please select a file greater than 2mb");
    } else {
      setUser({ ...user, image: e.target.files[0] });
    }
  };
  const postData = async (e) => {
    e.preventDefault();
    const { lbook, ltime, image } = user;
    const formData = new FormData();
    // setFile(image);
    setItems([...items, user]);
    // console.log(file);
    formData.append("myFile", image);
    formData.append("lbook", lbook);
    formData.append("ltime", ltime);
    const res = await fetch("https://medicine-donation-backend.onrender.com/create", {
      method: "POST",
      body: formData,
    });

    callCreatePage();

    // console.log(res.status);
    // if (res.status === 422 || !res) {
    if (!res) {
      alert("Invalid Registration");

      return res;
    } else {
      alert("Successful Registration");
      setShow(false);

      return res;
    }
  };

  return (
    <>
      <Button className="place-button" variant="success" onClick={handleShow}>
        Create
      </Button>
      <Modal show={show} onHide={handleClose}>
        <div className="form-container">
          <form method="POST" encType="multipart/form-data">
            <h1 className="decorate-heading">Details of the medicine</h1>
            <div className="form-input">
              <i className="fas fa-book i-before"></i>
              <input
                type="text"
                id="text"
                name="lbook"
                value={user.lbook}
                className="form-input-tag"
                placeholder="Enter the Medicine's Name"
                onChange={handleInputs}
                required
              />
            </div>

            <div className="form-input">
              <i className="far fa-clock i-before"></i>
              <input
                type="email"
                id="time"
                name="ltime"
                value={user.ltime}
                className="form-input-tag"
                placeholder="Enter the expiry date of the medicine"
                onChange={handleInputs}
                required
              />
            </div>

            <div className="form-input">
              <h5>Paste the image of the medicine</h5>
              <input type="file" name="image" onChange={handlePhoto} />
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
      </Modal>
      <div className="flex">
        {test.map((ele) => {
          return ele.map((element, ind) => {
            console.log(element.lbook);
            const data = element.image.data;
            return (
              <Card
                style={{ width: "18rem", height: "fit-content" }}
                className="mar-style"
                key={ind}
              >
                <Card.Img variant="top" src={`data:image/jpeg;base64,${data}`} />
                <Card.Body className="second-style">
                  <Card.Title>Medicine's Name: {element.lbook} </Card.Title>
                  <Card.Title>Expiry date of medicine: {element.ltime} </Card.Title>
                </Card.Body>
              </Card>
            );
          });
        })}
      </div>
    </>
  );
}
