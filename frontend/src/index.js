
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/react-demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
// pages
import AboutUs from "views/examples/AboutUs.js";
import BlogPost from "views/examples/BlogPost.js";
import BlogPosts from "views/examples/BlogPosts.js";
import ContactUs from "views/examples/ContactUs.js";
import Ecommerce from "views/examples/Ecommerce.js";
import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import LoginPage from "views/examples/LoginPage.js";
import NucleoIcons from "views/NucleoIcons.js";
import Presentation from "views/Presentation.js";
import Pricing from "views/examples/Pricing.js";
import ProductPage from "views/examples/ProductPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import Sections from "views/Sections.js";
import SignupPage from "views/examples/SignupPage.js";
import Test from "views/test.js";
import Tool from "views/tool.js";
import Tool_File from "views/tool_file.js";
import Rag from "views/rag.js";
import Test2_pseudo_terminal from "views/test2_pseudo_terminal.js";
import Test3_timestamp from "views/test3_timestamp.js";
// import Wizard from "views/wizard/index.js";
// others

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<Test3_timestamp />} />


      <Route path="/test3_timestamp" element={<Test3_timestamp />} />
      {/* <Route path="/toolfile" element={<Tool_File />} /> */}
      <Route path="/rag" element={<Test3_timestamp />} />


      <Route path="*" element={<Navigate to="/Test3_timestamp" replace />} />

    </Routes>
  </BrowserRouter>
);
