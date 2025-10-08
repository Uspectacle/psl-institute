import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RedirectPage.css";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RedirectPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 3 seconds
    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="article-not-found">
      <h1>Article Not Found</h1>
      <Link to="/" className="btn">
        <FontAwesomeIcon icon={faCircleNotch} spin /> Back to Homepage
      </Link>
    </div>
  );
};

export default RedirectPage;
