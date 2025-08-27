import React, { useState, useEffect } from "react";
import CurrencyCard from "./CurrencyCard";
const Card = () => {
  return (
    <div className="cardConatiner">
      <h1 className="header">Currency Converter</h1>
      <CurrencyCard />
    </div>
  );
};

export default Card;
