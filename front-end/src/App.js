import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import AboutUs from "./Components/AboutUs/AboutUs";
import Services from "./Components/Services/Services";
import Register from "./Components/Register/Register";
import Footer from "./Components/Footer/Footer";
import BackendEngineer from "./Components/BackendEngineer/BackendEngineer";
import LogisticsCoordinator from "./Components/LogisticsCoordinator/LogisticsCoordinator";
import WarehouseManager from "./Components/WarehouseManager/WarehouseManager";
import SupplyChainAnalyst from "./Components/SupplyChainAnalyst/SupplyChainAnalyst";
import TwoFA from "./Components/TwoFA/2FA";

//todo dej vse component v en file in samo to importaj ds bo malo krajsa koda za ves ta import

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/aboutus" element={<AboutUs></AboutUs>}></Route>
          <Route path="/services" element={<Services></Services>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route
            path="/openPositions/backendEngineer"
            element={<BackendEngineer></BackendEngineer>}
          ></Route>
          <Route
            path="/openPositions/LogisticsCoordinator"
            element={<LogisticsCoordinator></LogisticsCoordinator>}
          ></Route>
          <Route
            path="/openPositions/WarehouseManager"
            element={<WarehouseManager></WarehouseManager>}
          ></Route>
          <Route
            path="/openPositions/SupplyChainAnalyst"
            element={<SupplyChainAnalyst></SupplyChainAnalyst>}
          ></Route>
          <Route path="/confirmation" element={<TwoFA></TwoFA>}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
