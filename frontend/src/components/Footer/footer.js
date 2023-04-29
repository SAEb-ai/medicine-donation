import React from "react";
import { Box, Container, Row, Column, FooterLink, Heading } from "./FooterStyles";

const Footer = () => {
  return (
    <Box>
      <h1
        style={{
          color: "green",
          textAlign: "center",
          marginTop: "-50px",
        }}
      >
        Medicine Donation: Healing Lives, One Medicine at a Time
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading>Navigation</Heading>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </Column>

          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="mailto:borrow.helpers@gmail.com?subject=SendMail&body=Description">
              borrow.helpers@gmail.com
            </FooterLink>
          </Column>

          <Column>
            <Heading>Location</Heading>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.88523097629!2d86.9487045149324!3d23.715792184606435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f71f28112dc85f%3A0xc2814fdb4c367784!2sAsansol%20Engineering%20College%20(AEC)!5e0!3m2!1sen!2sin!4v1637507304279!5m2!1sen!2sin"
              width="400"
              height="230"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
