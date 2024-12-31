// const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const BASE_URL = "https://v6.exchangerate-api.com/v6/91b2f98b07a07b68ab97b7f4/latest";
const API_KEY = "91b2f98b07a07b68ab97b7f4";
// for (code in countryList) {
//     console.log(code, countryList[code]);
// }

// at the end

window.addEventListener("load", ()=>{
    updateExchangeRate();
})


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else  if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.appendChild(newOption);
    }

    select.addEventListener("change", (evt) => {
        updatedFlag(evt.target);
    });
}

const updatedFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
    // let fromCurrency = dropdowns[0].value;
    // let toCurrency = dropdowns[1].value;
    
});

const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal ==="" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();

    const exRate = data.conversion_rates[toCurr.value];
    const totalExRate = (amtVal * exRate.toFixed(3));
    msg.innerText = `${amtVal} ${fromCurr.value} = ${totalExRate} ${toCurr.value}`;

    console.log(totalExRate);

}

