import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ArticlePage from "./components/ArticlePage";
import RedirectPage from "./components/RedirectPage";
import "./App.css";
import Layout from "./components/Layout";

function App() {
  return (
    <Router
      basename={
        process.env.NODE_ENV === "development" ? "" : process.env.PUBLIC_URL
      }
    >
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="*" element={<RedirectPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
