import React from 'react';
import logo from './logo.svg';
import './App.css';
import RootStore from './stores/RootStore';
import RootApi from './apis/RootApi';
import AppContext from './app-context';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Blog from './pages/blogTest/Blog';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const store = new RootStore();
const api = new RootApi(store);

const App = () => {
  return (
    <AppContext.Provider value={{store, api}}>
            {window.localStorage.getItem("token") ? <Navigate replace to="/"/> : <Navigate replace to="/login"/>}
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/blog" element={<Blog/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="*" element={<Navigate replace to="/"/>}/>
            </Routes>
        </AppContext.Provider>
  );
}

export default App;
