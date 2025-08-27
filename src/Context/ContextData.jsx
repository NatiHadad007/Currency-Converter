import React, { useState, createContext } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

export const Context = createContext("");
const ContextData = ({ children }) => {
  const [amount, setAmount] = useState({
    value: 0,
    currency: "USD",
  });

  const currncyFetchData = async (curr, toCurrency, amountValue) => {
    const url = `https://api.currencylayer.com/live?access_key=${apiKey}&source=${curr}&currencies=${toCurrency}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      const quoteKey = Object.keys(result.quotes)[0];
      const rate = result.quotes[quoteKey];

      const converted = Number((rate * amountValue).toFixed(2));

      setAmount({
        value: rate,
        amount: amountValue,
        convertedValue: converted,
        currency: quoteKey.replace(curr, ""),
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Context.Provider value={{ amount, setAmount, currncyFetchData }}>
      {children}
    </Context.Provider>
  );
};

export default ContextData;
