// look at 6.3.5: Convert Fetched Data into DOM Elements to grab city data and put it in the html

var inputForm = document.querySelector("#input-form"); // input form that accepts a city selected by the user
var dailyForecast = document.querySelector("daily-forecast"); // sample from activity 6
var fetchButton = document.getElementById("fetch-button");
var inputContainerEl = document.querySelector("#input-container");
var hourlyWeatherEl = document.querySelector(".hourly-weather");
var cityInputEl = document.querySelector("#city"); // references input form that accepts a city selected by the user
var apiKey = "3e89c17611e41ba25f1b674bd5f9012d";
var currentForecast;

function formSubmitHandler(event) {
    event.preventDefault();
    console.log(cityInputEl.value);
    var cityName = cityInputEl.value.trim();
    if (cityName) {
        cityInput(cityName);

        inputContainerEl.textContent = '';
        cityInputEl.value = '';
    }
}

//get lat & Lon from city input
var cityInput = function (city) {

    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=3e89c17611e41ba25f1b674bd5f9012d";

    console.log(apiUrl); // this works
    fetch(apiUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                // pass response data to dom function
                console.log(data); //this logs the city data (e.g. lat, long, state, etc.)

                lat = data[0].lat;
                lon = data[0].lon;
                getForecastData(lat, lon, city);


            });
        }
    })
}



var getForecastData = function (lat, lon) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=3e89c17611e41ba25f1b674bd5f9012d";

    fetch(requestUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            console.log(requestUrl);
            response.json().then(function (data) {

                // pass response data to dom function
                fiveDayForecast(data); // this console logs weather forecast data for the city input by the user
            });
        }
    });
};

var fiveDayForecast = function (data) {
    console.log(data.current.temp);
    if (data.length === 0) {
        fiveDayContainerEl.textContent = "Test";
        return;
    }
    var currentTemp = data.current.temp;
    var weatherTitle = document.getElementById("subtitle");
    weatherTitle.textContent = `temperature: ${currentTemp}`;

    for (var i = 0; i < data.length; i++) {
        var dataVar = data[i].owner.login + "/" + data[i].name;

        fiveDayContainerEl.textContent = dataVar

        var fiveDayEl = document.createElement("a");
        fiveDayEl.classList = "list-item flex-row justify-space-between align-center";
        fiveDayEl.setAttribute("href", data[i].html_url);
        fiveDayEl.setAttribute("target", "_blank");
        console.log(dataVar);

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = data[i].title;

        // append to container
        fiveDayEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (data[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(fiveDay)";
        }

        // append to container
        fiveDayEl.appendChild(typeEl);
        fiveDayContainerEl.appendChild(fiveDayEl);
    }

};

let fiveDayDisplay = document.querySelector('#five-day-results');

//randomly testing this DOM element
var testEl = document.createElement("span");



// currentForecast = city.current
// //current city
// var currentCity = document.createElement("h3")
// currentCity.textContent = currentCity;
// hourlyWeatherEl.appendChild(currentCity);

// var currentHumidity = data.current[0].humidity;
// var currentHumidityEl = document.createElement("h3");
// currentHumidityEl.textContent = "Humidity: " + currentHumidity + "%";
// hourlyWeatherEl.appendChild(currentHumidityEl);



let main = document.querySelector(".main");
let p = main.querySelector("p");

//p.innerHTML = "Hopefully this works!?";

let ul = document.createElement("ul");
main.appendChild(ul);

// weather.forEach(function() {
//     let li = document.createElement("li");
//     let txt = document.createTextNode();
// });


// var cityInputEl = document.createElement("span");
//        cityInputEl.textContent = array[i].cityInput;


// input form that accepts a city selected by the user
inputForm.addEventListener("submit", formSubmitHandler);