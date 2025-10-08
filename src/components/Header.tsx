import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header" onClick={() => navigate("/")}>
      <img
        src={`${process.env.PUBLIC_URL}/logo.svg`}
        alt="PSL Institute Logo"
        className="logo"
      />
      <div className="title">
        <h1>PSL Institute</h1>
        <p className="subtitle">
          Academic papers without peer-review but with love
        </p>
      </div>
    </header>
  );
};

export default Header;
