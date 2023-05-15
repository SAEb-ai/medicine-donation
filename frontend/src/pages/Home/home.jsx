import { Carousel } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

import test from "../../images/test.webp";
import "./home.css";

import Footer from "../../components/Footer/footer";
export default function Home() {
  return (
    <>
      <div className="content container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="overview overview-light">
              <div>
                <h1 className="postion-h1">Medicine Donation</h1>
                <div className="dash dash-light"></div>
                <p className="postion-h1">
                  The Medicine Donation project is an initiative aimed at providing access to
                  medication to those who cannot afford it.
                </p>
              </div>
              <img src={test} alt="HITK Tech Community Official Logo" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
