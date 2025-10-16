import React from "react";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.about_section}>
        Welcome to the PSL Institute&apos;s private publications platform.
        <br />
        This space is dedicated to sharing the work, insights, and dubious
        scientific reflections of our group of friends.
      </p>
      <Image
        src="/blazon.png"
        alt="PSL Institute Blazon"
        className={styles.blazon}
        width={300}
        height={300}
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
