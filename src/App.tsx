import React from "react";
import logo from "./logo.svg";
import "./App.css";
import RootStore from "./stores/RootStore";
import RootApi from "./apis/RootApi";
import AppContext from "./app-context";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/main/MainPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { getCookie } from "./utils/Cookie";
import PasswordResetPage from "./pages/resetpw/PasswordResetPage";

const store = new RootStore();
const api = new RootApi(store);

const App = () => {
  const navigate = useNavigate();

  return (
    <AppContext.Provider value={{ store, api }}>
      {/* {getCookie('accessToken') ? (
                <Navigate replace to="/" />
            ) : (
                <Navigate replace to="/login" />
            )} */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/resetpw" element={<PasswordResetPage />} />
        {/* <Route path="/signup" element={<SignUpPage/>}/> */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
