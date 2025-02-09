import React from "react";
import Navbar from "./components/Navbar";
import MenuPreConsultation from "./components/MenuPreConsultation";
import Hero from "./components/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewForm from "./components/ViewForm";

const App = () => {
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen  relative">
        {/* Background Image */}
        <img
          src="/Vector.png"
          alt="Background"
          className="absolute top-0 left-0 w-full h-auto object-cover -z-10 overflow-hidden"
        />
        <Navbar />
        <MenuPreConsultation />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/view-form/:id" element={<ViewForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
