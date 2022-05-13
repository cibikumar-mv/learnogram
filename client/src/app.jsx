import React from "react";
import Auth from "./components/Auth/Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import CreatePost from "./components/Posts/CreatePost/CreatePost";
import Profile from "./components/Profile/Profile";
import ShowPost from "./components/Posts/ShowPost/ShowPost";
import Details from "./components/Auth/Details"; 
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/auth" exact element={<Auth />} />
          <Route path="/createPost" exact element={<CreatePost />} />
          <Route path="/profile/:username" exact element={<Profile />} />
          <Route path="/post/:id" exact element={<ShowPost />} />
          <Route path="/details" exact element={<Details />} />
          <Route path="/forgotPass" exact element={<ForgotPassword />} />
          <Route path="/resetPass/:userID/:token" exact element={<ResetPassword />} />

        </Routes>
    </BrowserRouter>
  );
};

export default App;
