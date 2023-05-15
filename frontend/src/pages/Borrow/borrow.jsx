import { Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { ListGroupItem } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./borrow.css";
import pic from "../../images/1.png";
import axios from "axios";

export default function Borrow(props) {
  const [test, setTest] = useState([]);

  const history = useHistory();
  const callBorrowPage = async () => {
    try {
      const res = await fetch("https://medicine-donation-backend.onrender.com/borrow", {
        method: "GET",
        headers: {
          Acccept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      setTest([data]);

      console.log(test);
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
    callBorrowPage();
  }, []);
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // // const [file, setFile] = useState({
  // //     image: null
  // // });
  // const [items, setItems] = useState([]);
  // // const [file, setFile] = useState([]);

  // //   // On file select (from the pop up)
  // //   onFileChange = event => {

  // //     // Update the state
  // //     this.setState({ selectedFile: event.target.files[0] });

  // //   }

  // const [user, setUser] = useState({
  //     lbook: '', ltime: '', image: ''
  // });
  // const history = useHistory();
  // let name, value;
  // const handleInputs = (e) => {
  //     name = e.target.name;
  //     value = e.target.value;
  //     setUser({ ...user, [name]: value });
  // };
  // const handlePhoto = (e) => {
  //     name = e.target.name;
  //     value = e.target.files[0];
  //     setUser({ ...user, image: e.target.files[0] });
  // };
  // const postData = async (e) => {
  //     e.preventDefault();
  //     const { lbook, ltime, image } = user;
  //     const formData = new FormData();
  //     // setFile(image);
  //     setItems([...items, user]);
  //     // console.log(file);
  //     formData.append(
  //         "myFile",
  //         image
  //     );
  //     formData.append('lbook', lbook);
  //     formData.append('ltime', ltime);
  //     const res = await fetch("/create", {
  //         method: "POST",
  //         body: formData
  //     });

  //     window.location.reload(false);

  //     // console.log(res.status);
  //     // if (res.status === 422 || !res) {
  //     if (!res) {
  //         alert("Invalid Registration");

  //         return res;
  //     }
  //     else {
  //         alert("Successful Registration");
  //         setShow(false);

  //         return res;
  //     }
  // }

  const borrow = async (el) => {
    console.log(el.lbook);
    const book = el.lbook;
    const time = el.ltime;
    const res = await fetch("https://medicine-donation-backend.onrender.com/delete", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        book,
        time,
      }),
    });

    if (res.status === 201) {
      callBorrowPage();
    }
  };

  return (
    <>
      <div className="flex">
        {test.map((ele) => {
          console.log(ele);
          return ele.map((element, ind) => {
            return element.lBooks.map((el, id) => {
              console.log(el.lbook);
              const data = el.image.data;
              return (
                <Card
                  style={{ width: "18rem", height: "fit-content" }}
                  className="mar-style"
                  key={ind}
                >
                  <Card.Img variant="top" src={`data:image/jpeg;base64,${data}`} />
                  <Card.Body className="second-style">
                    <Card.Title>Medicine's Name: {el.lbook} </Card.Title>
                    <Card.Title>Expiry date of medicine: {el.ltime} </Card.Title>
                    <div
                      className="add"
                      onClick={() => {
                        borrow(el, id);
                      }}
                    >
                      Borrow
                    </div>
                  </Card.Body>
                </Card>
              );
            });
          });
        })}
      </div>
    </>
  );
}
