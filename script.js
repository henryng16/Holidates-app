const API_KEY = "f4be0e0c-fa6e-4083-8e8f-4f3f73f2b3df";

const countryListButton = document.querySelector("#countries-list-btn");
const languageListButton = document.querySelector("#languages-list-btn");
const renderHolidaysButton = document.querySelector("#holidays-btn")
const searchQuery = document.querySelector("#search-query");
const yearQuery = document.querySelector("#year-query");
const monthQuery = document.querySelector("#month-query");
const dayQuery = document.querySelector("#day-query");
const countryQuery = document.querySelector("#country-query");
const languageQuery = document.querySelector("#language-query")
let countryTitle = document.querySelector("#holidays-list").children[0];
let countryListTitle = document.querySelector("#country-list-title");
let languageListTitle = document.querySelector("#language-list-title");

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

// search year month day country language
const getHolidays = async () => {
    try {
        // take value and format value of input boxes
        const search = searchQuery.value;
        const year = (yearQuery.value) ? parseInt(yearQuery.value, 10) : 2023;
        const month = (monthQuery.value) ? parseInt(monthQuery.value, 10) : "";
        const day = (dayQuery.value) ? parseInt(dayQuery.value, 10) : "";
        let country = (countryQuery.value) ? countryQuery.value : "VN";
        const language = (languageQuery.value) ? languageQuery.value : "en";
        
        // change the title name as the country query
        const countryList = await getCountries();
        const countryName = countryList.countries.find((item) => item.code === country);
        countryTitle.textContent = `Holidays of ${countryName.name}`

        // optimize searchQuery for searching holidays across country
        if ((searchQuery.value) && !(countryQuery.value)) {
            country = "";
            countryTitle.textContent = "Search Holiday Across Country";
        };
        
        // fetch holidays data to render next step
        url = `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}&search=${search}&year=${year}&month=${month}&day=${day}&country=${country}&language=${language}`;
        console.log(url);
        data = await fetch(url);
        dataJson = await data.json();
        return dataJson;
    } catch (error) {
        console.log("error: ", error);
    }
}

const renderCountries = async () => {
    try {
        countryListTitle.textContent = "Loading data..."
        const data = await getCountries();
        countryListTitle.textContent = "Country List"
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
        languageListTitle.textContent = "Loading data...";
        const listLanguages = await getLanguages();
        languageListTitle.textContent = "Language List";
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


const renderHolidays = async () => {
    try {
        countryTitle.textContent = "Loading data...";
        const holidaysList = await getHolidays();
        const holidaysListDisplay = document.querySelector("#holidays-list")
        const ulHolidaysListDisplay = holidaysListDisplay.children[1];
        ulHolidaysListDisplay.innerHTML = "";

        holidaysList.holidays.forEach((holiday, index) => {
            x = document.createElement("li")
            x.innerHTML = `<div class="bullet">${index+1}</div>
            <div class="li-wrapper">
              <div class="li-title">${holiday.name}</div>
              <div class="li-text">${holiday.weekday.date.name} - ${holiday.date}</div>
            </div>`
            ulHolidaysListDisplay.appendChild(x);
        })
        
    } catch (error) {
        console.log("error", error)
    }
};

// add EventListener
countryListButton.addEventListener("click",renderCountries);
languageListButton.addEventListener("click", renderLanguages);
renderHolidaysButton.addEventListener("click", renderHolidays);