import { useEffect, useState } from "react";
import InputBox from "./InputBox";

const Converter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromValue(toValue);
    setToValue(fromValue);
  }

  const fetchCurrencies = async () => {
    const response = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies.json`
    );
    const data = await response.json();
    const currencyArray = [];
    Object.keys(data).forEach((currency) => currencyArray.push(currency));
    setCurrencies(currencyArray);
  };
  useEffect(() => {
    fetchCurrencies();
  }, []);

  const convertCurrency = async () => {
    const response = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${fromCurrency}.json`
    );
    const data = await response.json();
    const calculatedValue = data?.[fromCurrency]?.[toCurrency] * fromValue;
    setToValue(calculatedValue.toFixed(2));
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          width: "30%",
          backgroundColor: "white",
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <InputBox
          label={"From"}
          options={currencies}
          currency={fromCurrency}
          setCurrency={(value) => setFromCurrency(value)}
          setValue={(value) => setFromValue(value)}
          value={fromValue}
        />
        <img onClick={swapCurrency} width={44} height={44} src={require("../assets/png/sort.png")} />
        <InputBox
          label={"To"}
          options={currencies}
          currency={toCurrency}
          setCurrency={(value) => setToCurrency(value)}
          setValue={(value) => setToValue(value)}
          value={toValue}
        />
        <button
          onClick={convertCurrency}
          style={{
            width: "70%",
            marginBottom: 20,
            marginTop: 30,
            height: 60,
            borderRadius: 10,
            fontSize: 18,
            backgroundColor: "black",
            color: "white",
          }}
        >
          Convert
        </button>
      </div>
    </div>
  );
};
export default Converter;
