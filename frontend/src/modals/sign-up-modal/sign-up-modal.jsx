import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./sign-up-modal.css";

export default function SignUp(props) {

    const [passwordShown, setPasswordShown] = useState(false);
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    const [user, setUser] = useState({
        name: '', email: '', phone: '', password: ''
    });
    const history = useHistory();
    let name,value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value});
    };

    const postData = async (e) => {
        e.preventDefault();
        const { name, email, phone, password } = user;
        const res = await fetch("/sign-up", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, password
            })
        });
        console.log(res.status);
        if(res.status===422 || !res) {
            alert("Invalid Registration");
            return res;
        }
        else {
            alert("Successful Registration");
            setShow(false);
            history.push("/");
            return res;
        }
    }



    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <div className="form-container">
                    <form method="POST">
                        <h1 className="decorate-heading">SignUp to Helpers</h1>
                        <div className="form-input">
                            <i className="fas fa-user undefined i-before"></i>
                            <input type="text" id="text" name="name" value={user.name} className="form-input-tag" placeholder="Enter your Name" onChange={handleInputs} required />
                        </div>

                        <div className="form-input">
                            <i className="far fa-envelope i-before"></i>
                            <input type="email" id="email" name="email" value={user.email} className="form-input-tag" placeholder="Enter your email" onChange={handleInputs} required />
                        </div>

                        <div className="form-input">
                            <i className="fas fa-phone-alt i-before"></i>
                            <input type="tel" id="phone" name="phone" value={user.phone} className="form-input-tag" placeholder="Enter your Phone Number" onChange= {handleInputs} required />
                        </div>

                        <div className="form-input">
                            <i className="fas fa-lock i-before"></i>
                            <input type={passwordShown ? "text" : "password"} id="password" name="password" value={user.password} className="form-input-tag" placeholder="Enter your password" onChange={handleInputs} required />
                            <i className={passwordShown ? "fa fa-eye i-after" : "fas fa-eye-slash i-after"} onClick={() => { setPasswordShown((passwordShown ? false : true)) }}></i>
                        </div>

                        <div className="form-input">
                            <input type="Submit" id="submit" name="SignUp" className="form-sign-in-button" value="SignUp" onClick={postData} />
                        </div>


                    </form>
                </div>
            </Modal>
        </>
    );
}
