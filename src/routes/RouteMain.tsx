import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppContext from "../app-context";
import HomePage from "../pages/HomePage";
import RootStore from "../stores/RootStore";
import RootApi from "../apis/RootApi";
import Blog from "../pages/blogTest/Blog";
import ProductCreate from "../pages/ProductCreate";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import { getCookie } from "../utils/Cookie";

const store = new RootStore();
const api = new RootApi(store);

const RouteMain = () => {
  // if(cookie is empty) redirect to loginpage;

  return (
    <AppContext.Provider value={{ store, api }}>
      {getCookie("accessToken") ? (
        <Navigate replace to="/" />
      ) : (
        <Navigate replace to="/login" />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/product/create" element={<ProductCreate />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </AppContext.Provider>
  );
};

export default RouteMain;
