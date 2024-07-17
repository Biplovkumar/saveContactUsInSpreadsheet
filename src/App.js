import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//@ts-ignore
import ContactUs from "./screen/Contactus";
//@ts-ignore
import Detail from "./screen/Detail";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactUs />} />
        <Route path="/Detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
