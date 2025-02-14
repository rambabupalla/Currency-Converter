const countryList = {
  AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM", ANG: "AN",
  AOA: "AO", ARS: "AR", AUD: "AU", AZN: "AZ", BAM: "BA", BBD: "BB",
  BDT: "BD", BGN: "BG", BHD: "BH", BIF: "BI", BMD: "BM", BND: "BN",
  BOB: "BO", BRL: "BR", BSD: "BS", CAD: "CA", CHF: "CH", CNY: "CN",
  COP: "CO", CRC: "CR", CZK: "CZ", DKK: "DK", DOP: "DO", DZD: "DZ",
  EGP: "EG", EUR: "EU", GBP: "GB", GEL: "GE", GHS: "GH", HKD: "HK",
  HUF: "HU", IDR: "ID", ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR",
  ISK: "IS", JPY: "JP", KES: "KE", KRW: "KR", KWD: "KW", KZT: "KZ",
  LBP: "LB", LKR: "LK", MAD: "MA", MYR: "MY", MXN: "MX", NGN: "NG",
  NOK: "NO", NPR: "NP", NZD: "NZ", OMR: "OM", PAB: "PA", PEN: "PE",
  PHP: "PH", PKR: "PK", PLN: "PL", QAR: "QA", RON: "RO", RSD: "RS",
  RUB: "RU", SAR: "SA", SEK: "SE", SGD: "SG", THB: "TH", TND: "TN",
  TRY: "TR", TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US",
  UYU: "UY", VND: "VN", YER: "YE", ZAR: "ZA", ZMW: "ZM"
};

const fromDropdown = document.getElementById("fromcur");
const toDropdown = document.getElementById("tocur");

function populateDropdown(dropdown) {
  dropdown.innerHTML = "";
  for (let currency in countryList) {
    let option = document.createElement("option");
    option.value = currency;
    option.textContent = currency;
    dropdown.appendChild(option);
  }
}
populateDropdown(fromDropdown);
populateDropdown(toDropdown);


const url = "https://api.exchangerate-api.com/v4/latest/";

document.getElementById("swapBtn").addEventListener("click", function () {
  let fromCurr = document.getElementById("fromcur");
  let toCurr = document.getElementById("tocur");

  // Swap values
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;
});



document.getElementById("btn").addEventListener("click", async function () {
    
    let amount = document.getElementById("amt").value;
    let fromcurr = document.getElementById("fromcur").value;
    let tocurr = document.getElementById("tocur").value;
    let resulttext = document.getElementById("res");
    if(amount === "" || amount<0){
        resulttext.innerHTML = "Please enter a valid amount!";
        return;
    }
    try {
        let response = await fetch(`${url}${fromcurr.toUpperCase()}`);
        let data = await response.json();
        let exchangerate = data.rates[tocurr];
    

        if(!exchangerate){
            resulttext.innerHTML = "Invalid currency conversion!";
            return;
        }

        let convertedAmount = (amount*exchangerate).toFixed(3);
        resulttext.innerHTML = `${amount} ${fromcurr} in ${tocurr} is ${convertedAmount}`;
    }
        catch (error) {

            resulttext.innerHTML = "Error fetching exchange rates!";

        }
});
