import React, { ReactNode } from "react";
import styles from "./Layout.module.css";
import Footer from "./Footer";
import Header from "./Header";

type Props = { children: ReactNode };

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
