import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';
import { FaInstagram, FaFacebookSquare, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-dark">
      <Container>
        <Row>
          <Col>
            <p className="footer-text">© {new Date().getFullYear()} Divy Patel</p>
          </Col>
          <Col className='icons'>
          <a href="https://www.instagram.com/_.divy_patel._" className=""target="_blank" rel="noopener noreferrer">
          <FaInstagram className="icon instagram" />
        </a>
        <a href="https://www.facebook.com/divy.patel.101" className="" target="_blank" rel="noopener noreferrer">
          <FaFacebookSquare className="icon facebook" />
        </a>
        <a href="https://www.github.com/Divy1011" className="" target="_blank" rel="noopener noreferrer">
          <FaGithub className="icon github" />
        </a>
          
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
