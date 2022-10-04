import React, { useEffect, useRef, useState } from "react";
import CurrInput from "./CurrInput";
import { Container } from "@chakra-ui/react";
import "./styles.css";
const CurrConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(1);
  const [toPrice, setToPrice] = useState(0);
  const exchangeRef = useRef({});

  useEffect(() => {
    fetch("https://cdn.cur.su/api/latest.json")
      .then((res) => res.json())
      .then((json) => {
        exchangeRef.current = json.rates;
        onChangeFromPrice(1);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed fetch");
      });
  }, []);

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);
  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  const onChangeFromPrice = (value) => {
    const price = value / exchangeRef.current[fromCurrency];
    const result = price * exchangeRef.current[toCurrency];
    setToPrice(result.toFixed(2));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result =
      (exchangeRef.current[fromCurrency] / exchangeRef.current[toCurrency]) *
      value;
    setFromPrice(result.toFixed(2));
    setToPrice(value);
  };

  return (
    <div className="converter">
      <CurrInput
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <CurrInput
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
};

export default CurrConverter;
