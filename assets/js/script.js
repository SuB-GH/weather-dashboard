var inputForm = document.querySelector("#input-form");
var dailyForecast = document.querySelector("ul"); // sample from activity 6
var fetchButton = document.getElementById("fetch-button");
var inputContainerEl = document.querySelector("#input-container");
var hourlyWeatherEl = document.querySelector(".hourly-weather");
var cityInputEl = document.querySelector("#city");
var apiKey = "3e89c17611e41ba25f1b674bd5f9012d";
var currentForecast;



localStorage.setItem("city", "data");
let val = localStorage.getItem("city")
console.log(val);

inputForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formSubmitHandler();
});

var formSubmitHandler = function () {
    // prevent page from refreshing
    //console.log(event);
    cityInput(cityInputEl.value);
}
console.log(inputForm);


var getForecastData = function (lat, lon) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=3e89c17611e41ba25f1b674bd5f9012d";

    fetch(requestUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                // pass response data to dom function
                console.log(data);

            });
        }
    });
};



//get lat & Lon from city input
var cityInput = function (city) {

    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=3e89c17611e41ba25f1b674bd5f9012d";

    console.log(apiUrl);
    fetch(apiUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                // pass response data to dom function
                console.log(data);

                lat = data[0].lat;
                lon = data[0].lon;
                getForecastData(lat, lon, city);


            });
        }
    })
}

currentForecast = city.current
//current city
var currentCity = document.createElement(city.daily.value)
currentCity.textContent = city;
hourlyWeatherEl.appendChild(currentCity);

var currentHumidity = data.current[0].humidity;
var currentHumidityEl = document.createElement("p");
currentHumidityEl.textContent = "Humidity: " + currentHumidity + "%";
hourlyWeatherEl.appendChild(currentHumidityEl);


