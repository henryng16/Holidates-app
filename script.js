const API_KEY = "f4be0e0c-fa6e-4083-8e8f-4f3f73f2b3df";

const countryListButton = document.querySelector("#countries-list-btn");
const languageListButton = document.querySelector("#languages-list-btn");


const getCountries = async () => {
    try {
        const url = `https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`
        const data = await fetch(url);
        const dataJson = await data.json();
        return dataJson;
    } catch (error) {
        console.log("error", error)
    }
};

const getLanguages = async () => {
    try {
        const url = `https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`;
        const data = await fetch(url);
        const dataJson = await data.json();
        return dataJson;
    } catch (error) {
        console.log("error", error)
    };
}

const renderCountries = async () => {
    try {
        const data = await getCountries();
        const countryList = document.querySelector("#countries-list");

        // Take out ul element
        const ulCountryList = countryList.children[2];
        ulCountryList.innerHTML = "";

        data.countries.forEach((country, index) => {
            const x = document.createElement("li");
            x.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
            <div class="li-title">${country.name}</div>
            <div class="li-text">${country.code}</div>
            </div>`;
            ulCountryList.appendChild(x);
        })
    } catch (error) {
        console.log("error", error)
    }
};

const renderLanguages = async () => {
    try {
        const listLanguages = await getLanguages();
        const languagesList = document.querySelector("#languages-list");
        const ulLanguagesList = languagesList.children[2];
        ulLanguagesList.innerHTML = "";

        listLanguages.languages.forEach((language, index) => {
            const x = document.createElement("li");
            x.innerHTML = `<div class="bullet">${index+1}</div>
            <div class="li-wrapper">
              <div class="li-title">${language.name}</div>
              <div class="li-text">${language.code}</div>
            </div>`;
            ulLanguagesList.appendChild(x);
        })

    } catch (error) {
        console.log("error", error);
    }
}

countryListButton.addEventListener("click",renderCountries);
languageListButton.addEventListener("click", renderLanguages);
