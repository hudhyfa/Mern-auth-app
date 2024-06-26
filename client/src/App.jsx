import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import UserDetails from "./pages/UserDetails";
import AdminPrivateRoute from "./components/AdminPrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* User routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />

        {/* Admin routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-user-details/:id" element={<UserDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
