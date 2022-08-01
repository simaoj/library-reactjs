import React from "react";
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './context/AuthProvider';

import Main from "./components/layout/Main";

import Login from './views/Login';
import Logout from './views/Logout';
import Books from './views/Books';
import CreateBook from './views/CreateBook';
import ViewBook from './views/ViewBook';

const RouteList = () => {
  const loggedIn = (localStorage.getItem('token')) ? true : false;
  return (
    <Router>
      <Routes>
        <Route element={<Main />}>
          <Route path="/books" element={<Books />} />
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/books/:id" element={<ViewBook />} />
        </Route>
        <Route path="/" element={loggedIn ? <Navigate to="/books" /> : <Navigate to="/login" />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router >
  )
}

export default RouteList;