import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

const Footer = () => {
  return (
    <Box>
      <h1 style={{
        color: "green",
        textAlign: "center",
        marginTop: "-50px"
      }}>
        Helpers: Place to make helping more easy
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#">Aim</FooterLink>
            <FooterLink href="#">Vision</FooterLink>
            <FooterLink href="#">Testimonials</FooterLink>
          </Column>
          
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">contact.helpers@gmail.com</FooterLink>

          </Column>
          
          <Column>
            <Heading>Location</Heading>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.965790425966!2d82.96509271501303!3d25.37246298381495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2d3d10b3197d%3A0xe420318b5a237b3a!2sNirmal%20Bharati%20School%20of%20Child%20Education!5e0!3m2!1sen!2sin!4v1630753779425!5m2!1sen!2sin" width="200" height="300" allowfullscreen="" loading="lazy"></iframe>

          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;