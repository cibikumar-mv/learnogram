import React from "react";
import Auth from "./components/Auth/Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import CreatePost from "./components/Posts/CreatePost/CreatePost";
const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/auth" exact element={<Auth />} />
          <Route path="/createPost" exact element={<CreatePost />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
