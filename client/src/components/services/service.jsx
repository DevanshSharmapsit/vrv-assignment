// eslint-disable-next-line no-unused-vars
import React from "react";
import "./service.css";
import axios from "axios";

const ServicesCard = () => {
  const token = localStorage.getItem("token");

  // Generalized handler for service button clicks
  const handleServiceClick = (serviceEndpoint) => {
    console.log(`Requesting service: ${serviceEndpoint}`);
    if (!token) {
      alert("Token not found. Please log in.");
      return;
    }

    axios
      .get(`http://localhost:3000/${serviceEndpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error(`Error accessing ${serviceEndpoint}:`, error.response?.data || error.message);
        alert(`Error: ${error.response?.data?.message || "Failed to access the service."}`);
      });
  };

  return (
    <div className="card2">
      <h2>Services you can access:</h2>
      <button onClick={() => handleServiceClick("cctv")}>Eagle Eye Monitoring</button>
      <button onClick={() => handleServiceClick("gdeployed")}>Fortress Guard</button>
      <button onClick={() => handleServiceClick("attendence")}>Pulse Tracker</button>
      <button onClick={() => handleServiceClick("activeunits")}>Dynamic Shield</button>
    </div>
  );
};

export default ServicesCard;
