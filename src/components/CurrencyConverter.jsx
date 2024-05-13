import { useEffect, useState } from "react";
import "./CurrencyConverter.css";
import axios from "axios";

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://v6.exchangerate-api.com/v6/046985a3ef6eab9b9dff313d/latest/USD"
      )
      .then((response) => {
        setRates(response.data.conversion_rates);
      })
      .catch((error) => {
        console.log("OCORREU UM ERRO: ", error);
      });
    console.log(rates.length);
  }, []);

  useEffect(() => {
    if (rates) {
      const rateFrom = rates[fromCurrency] || 0;
      const rateTo = rates[toCurrency] || 0;
      setConvertedAmount(((amount / rateFrom) * rateTo).toFixed(2));
    }
  }, [amount, rates, fromCurrency, toCurrency]);

  if (Object.values(rates).length == 0) {
    return <h1>Carregando...</h1>;
  }
  return (
    <div className="converter">
      <h2>Conversor de Moedas</h2>
      <input
        type="number"
        placeholder="Digite o valor..."
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <span>Selecione as moedas</span>
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {Object.keys(rates).length > 0 ? (
          Object.keys(rates).map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))
        ) : (
          <option>loading...</option>
        )}
      </select>
      <span>para</span>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {Object.keys(rates).length > 0 ? (
          Object.keys(rates).map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))
        ) : (
          <option>loading...</option>
        )}
      </select>
      <h3>
        {convertedAmount} {toCurrency}
      </h3>
      <p>
        {amount} {fromCurrency} valem {convertedAmount} {toCurrency}
      </p>
    </div>
  );
};

export default CurrencyConverter;
