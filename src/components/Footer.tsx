import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="homepage-footer">
      <p className="about-section">
        Welcome to the PSL Institute's private publications platform. This space
        is dedicated to sharing the work, insights, and dubious scientific
        reflections of our group of friends.
      </p>
      <img
        src={`${process.env.PUBLIC_URL}/pslBlazon.png`}
        alt="PSL Institute Blazon"
        className="logo-small"
      />
      <p>© 2021 PSL Institute - All rights reserved</p>
      <a
        href="https://github.com/Uspectacle/psl-institute"
        target="_blank"
        rel="noopener noreferrer"
      >
        But this project is also available on{" "}
        <FontAwesomeIcon icon={faGithub} /> GitHub
      </a>
    </footer>
  );
};

export default Footer;
