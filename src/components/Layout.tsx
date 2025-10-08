import React, { ReactNode } from "react";
import "./Layout.css";
import Footer from "./Footer";
import Header from "./Header";

type Props = { children: ReactNode };

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
