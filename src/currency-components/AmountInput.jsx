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
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleSelectFrom = (code) => {
    setFromCurrency(code);
    setOpenDropdown(null);
  };

  const handleSelectTo = (code) => {
    setToCurrency(code);
    setOpenDropdown(null);
  };

  const submitConver = () => {
    currncyFetchData(fromCurrency, toCurrency, amountValue);
  };

  const swapHandler = () => {
    const prevFrom = fromCurrency;
    const prevAmount = amountValue;

    setFromCurrency(toCurrency);
    setToCurrency(prevFrom);

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
            onClick={() =>
              setOpenDropdown(openDropdown === "from" ? null : "from")
            }
          >
            {currencyToFlag[fromCurrency] && (
              <img
                src={`https://flagcdn.com/w20/${currencyToFlag[fromCurrency]}.png`}
                alt={fromCurrency}
              />
            )}
            <span className="currencyText">{fromCurrency}</span>
          </div>

          {openDropdown === "from" && (
            <div className="options">
              {Object.keys(currencySymbols).map((code) => (
                <div
                  key={code}
                  className="option"
                  onClick={() =>
                    code !== toCurrency ? handleSelectFrom(code) : ""
                  }
                >
                  {currencyToFlag[code] && (
                    <img
                      src={`https://flagcdn.com/w20/${currencyToFlag[code]}.png`}
                      alt={code}
                    />
                  )}
                  <span className="currencyText">{code}</span>
                </div>
              ))}
            </div>
          )}
          <input
            className="amountInpout"
            type="number"
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
            onClick={() => setOpenDropdown(openDropdown === "to" ? null : "to")}
          >
            {currencyToFlag[toCurrency] && (
              <img
                src={`https://flagcdn.com/w20/${currencyToFlag[toCurrency]}.png`}
                alt={toCurrency}
              />
            )}
            <span className="currencyText">{toCurrency}</span>
          </div>

          {openDropdown === "to" && (
            <div className="options">
              {Object.keys(currencySymbols).map((code) => (
                <div
                  key={code}
                  className="option"
                  onClick={() =>
                    code !== fromCurrency ? handleSelectTo(code) : ""
                  }
                >
                  {currencyToFlag[code] && (
                    <img
                      src={`https://flagcdn.com/w20/${currencyToFlag[code]}.png`}
                      alt={code}
                    />
                  )}
                  <span className="currencyText">{code}</span>
                </div>
              ))}
            </div>
          )}
          <input
            className="amountInpout"
            type="number"
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
