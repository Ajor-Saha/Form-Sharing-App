import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import CreateForm from "./pages/CreateForm";
import FormsPage from "./pages/FormsPage";
import FormPageById from "./pages/FromsPageById";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="form/:formId" element={<FormPageById />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createForm" element={<CreateForm />} />
          <Route path="/getallForms" element={<FormsPage />} />

          {/* <Route path='/forms/' element={< />} /> */}
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
