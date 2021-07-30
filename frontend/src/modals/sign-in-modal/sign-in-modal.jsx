import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./sign-in-modal.css"

export default function SignIn(props) {

    const [show, setShow] = useState(props.open);
    const [passwordShown, setPasswordShown] = useState(false);

    useEffect(() => {
        setShow(props.open);
    }, [props.open]);
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal className="md-round" show={show} onHide={handleClose}>
                <div className="form-container">
                    <form action="/sign-in" metgod="POST">
                        <h1 className="decorate-heading">SignIn to Helpers</h1>
                        <div className="form-input">
                            <i className="far fa-envelope i-before"></i>
                            <input type="email" id="email" name="Email Entered" className="form-input-tag" placeholder="Enter your email" required />
                        </div>

                        <div className="form-input">
                            <i className="fas fa-lock i-before"></i>
                            <input type={passwordShown ? "text" : "password"} id="email" name="Password Entered" className="form-input-tag" placeholder="Enter your password" required />
                            <i className={passwordShown ? "fa fa-eye i-after" : "fas fa-eye-slash i-after"} onClick={() => { setPasswordShown((passwordShown ? false : true)) }}></i>
                        </div>

                        <div className="form-input">
                            <input type="submit" id="signin" name="SignIn" className="form-sign-in-button" value="SignIn" />
                        </div>


                    </form>
                </div>
            </Modal>
        </>
    );
}
