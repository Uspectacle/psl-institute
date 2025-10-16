import styles from "./Header.module.css";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="PSL Institute Logo"
          className={styles.logo}
          width={120}
          height={120}
        />
        <div className={styles.title}>
          <h1>PSL Institute</h1>
          <p className={styles.subtitle}>
            Academic papers without peer-review but with love
          </p>
        </div>
      </Link>
    </header>
  );
};

export default Header;
