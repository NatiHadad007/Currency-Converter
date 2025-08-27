import React, { useState, useContext } from "react";
import { Context } from "../Context/ContextData";
import currencySymbols from "../currency-data/currencySymbols.json";
import currencyToFlag from "../currency-data/currencyToFlag";
import { MdSwapVerticalCircle } from "react-icons/md";

const CurrencySelect = () => {
  const { amount, currncyFetchData } = useContext(Context);

  const [amountValue, setAmountValue] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const handleSelectFrom = (code) => {
    setFromCurrency(code);
    setOpenFrom(false);
  };

  const handleSelectTo = (code) => {
    setToCurrency(code);
    setOpenTo(false);
  };

  const submitConver = () => {
    currncyFetchData(fromCurrency, toCurrency, amountValue);
  };

  const swapHandler = () => {
    const prevFrom = fromCurrency;
    const prevAmount = amountValue;

    setFromCurrency(toCurrency);
    setToCurrency(prevFrom);

    // swap values
    if (amount?.convertedValue) {
      setAmountValue(amount.convertedValue);
    }

    currncyFetchData(
      toCurrency,
      prevFrom,
      amount?.convertedValue || prevAmount
    );
  };

  return (
    <div className="currencyContainer">
      <div className="currencyWrapper">
        <p className="amountTtile">Amount</p>
        <div className="currency-dropdown">
          <div
            className="selected-option"
            onClick={() => setOpenFrom((prev) => !prev)} // <-- use openFrom here
          >
            {currencyToFlag[fromCurrency] ? (
              <img
                src={`https://flagcdn.com/w20/${currencyToFlag[fromCurrency]}.png`}
                alt={fromCurrency}
              />
            ) : (
              ""
            )}
            <span className="currencyText">{fromCurrency}</span>
          </div>

          {openFrom && (
            <div className="options">
              {Object.keys(currencySymbols).map((code) => (
                <div
                  key={code}
                  className="option"
                  onClick={() => handleSelectFrom(code)}
                >
                  {currencyToFlag[code] ? (
                    <img
                      src={`https://flagcdn.com/w20/${currencyToFlag[code]}.png`}
                      alt={code}
                    />
                  ) : (
                    ""
                  )}
                  <span className="currencyText">{code}</span>
                </div>
              ))}
            </div>
          )}
          <input
            className="amountInpout"
            type="number"
            name=""
            id="amountInputId"
            value={amountValue}
            onChange={(e) => setAmountValue(e.target.value)}
          />
        </div>
      </div>
      <MdSwapVerticalCircle onClick={swapHandler} />
      <div className="currencyWrapper">
        <p className="amountTtile">Converted Amount</p>
        <div className="currency-dropdown">
          <div
            className="selected-option"
            onClick={() => setOpenTo((prev) => !prev)}
          >
            {currencyToFlag[toCurrency] ? (
              <img
                src={`https://flagcdn.com/w20/${currencyToFlag[toCurrency]}.png`}
                alt={toCurrency}
              />
            ) : (
              ""
            )}
            <span className="currencyText">{toCurrency}</span>
          </div>

          {openTo && (
            <div className="options">
              {Object.keys(currencySymbols).map((code) => (
                <div
                  key={code}
                  className="option"
                  onClick={() => handleSelectTo(code)}
                >
                  {currencyToFlag[code] ? (
                    <img
                      src={`https://flagcdn.com/w20/${currencyToFlag[code]}.png`}
                      alt={code}
                    />
                  ) : (
                    ""
                  )}
                  <span className="currencyText">{code}</span>
                </div>
              ))}
            </div>
          )}
          <input
            className="amountInpout"
            type="number"
            name=""
            id="amountConvertedInputId"
            value={amount.convertedValue || ""}
            disabled
          />
        </div>
      </div>
      <button onClick={submitConver}>Convert</button>
    </div>
  );
};

export default CurrencySelect;
