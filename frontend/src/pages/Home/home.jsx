import './home.css';
import { Carousel } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

import test from "../../images/test.jpeg";
export default function Home() {
    return (
        <>
            <div className="ar">
                <div className="grid-1">
                    <div className="am">

                        <Card >
                            <Card.Img variant="top" src={test} />
                            <Card.Body>
                                <Card.Title className="gh">Founder ~ Mr. Md Shahbaz Alam</Card.Title>
                                <Card.Text className="hj">
                                    A good student is who shares his knowledge with others too.
                                </Card.Text>
                                <Button variant="primary">Know More</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                
            </div>

        </>
    )
}