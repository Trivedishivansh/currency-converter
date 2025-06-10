const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");

const currencyList = ["USD", "EUR", "INR", "GBP", "JPY", "AUD", "CAD", "CNY", "SGD", "BRL"];

currencyList.forEach(curr => {
  const option1 = document.createElement("option");
  option1.value = curr;
  option1.text = curr;

  const option2 = document.createElement("option");
  option2.value = curr;
  option2.text = curr;

  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  if (!amount || amount <= 0) {
    result.innerText = "Please enter a valid amount.";
    return;
  }

  const from = fromCurrency.value;
  const to = toCurrency.value;

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    const rate = data.rates[to];

    const converted = (amount * rate).toFixed(2);
    result.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    result.innerText = "Error fetching exchange rates.";
  }
}
