import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import AboutUs from "./Components/AboutUs/AboutUs";
import Services from "./Components/Services/Services";
import Footer from "./Components/Footer/Footer";
import BackendEngineer from "./Components/BackendEngineer/BackendEngineer";
import LogisticsCoordinator from "./Components/LogisticsCoordinator/LogisticsCoordinator";
import WarehouseManager from "./Components/WarehouseManager/WarehouseManager";
import SupplyChainAnalyst from "./Components/SupplyChainAnalyst/SupplyChainAnalyst";
import TwoFA from "./Components/TwoFA/2FA";
import Register from "./Components/Register/Register";
import SignIn from "./Components/SignUp/SignUp";
import AddContainer from "./Components/AddContainer/AddContainer";
import Collection from "./Components/Collection/Collection";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/addContainer" element={<AddContainer />} />
          <Route path="/collection" element={<Collection />} />
          <Route
            path="/openPositions/backendEngineer"
            element={<BackendEngineer />}
          />
          <Route
            path="/openPositions/LogisticsCoordinator"
            element={<LogisticsCoordinator />}
          />
          <Route
            path="/openPositions/WarehouseManager"
            element={<WarehouseManager />}
          />
          <Route
            path="/openPositions/SupplyChainAnalyst"
            element={<SupplyChainAnalyst />}
          />
          <Route path="/confirmation" element={<TwoFA />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
