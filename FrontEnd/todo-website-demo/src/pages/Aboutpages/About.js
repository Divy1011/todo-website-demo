import React, { useEffect } from 'react';
import { FaInstagram, FaFacebookSquare, FaGithub } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./About.css"

const About = () => {
  useEffect(() => {
    document.title = "About"
  }, [])
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>Passionate about creating awesome things!</p>
      <div className="social-icons">
        <a href="https://www.instagram.com/_.divy_patel._" className="mx-5"target="_blank" rel="noopener noreferrer">
          <FaInstagram className="icon instagram" />
        </a>
        <a href="https://www.facebook.com/divy.patel.101" className="mx-5" target="_blank" rel="noopener noreferrer">
          <FaFacebookSquare className="icon facebook" />
        </a>
        <a href="https://www.github.com/Divy1011" className="mx-5" target="_blank" rel="noopener noreferrer">
          <FaGithub className="icon github" />
        </a>
      </div>
    </div>
  );
};

export default About;
