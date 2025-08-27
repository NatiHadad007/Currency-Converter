import React from "react";
import { useState } from "react";
import "./App.css";
import ContextData from "./Context/ContextData";
import Card from "./currency-components/Card";

function App() {
  return (
    <ContextData>
      <div className="card">
        <Card />
      </div>
    </ContextData>
  );
}

export default App;
