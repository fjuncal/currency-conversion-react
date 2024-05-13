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

  return (
    <div className="converter">
      <h2>Conversor de Moedas</h2>
      <input type="number" placeholder="Digite o valor..." />
      <span>Selecione as moedas</span>
      <select>
        <option value="BRL">BRL</option>
      </select>
      <span>para</span>
      <select>
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
