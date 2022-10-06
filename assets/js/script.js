// look at 6.3.5: Convert Fetched Data into DOM Elements to grab city data and put it in the html

var inputForm = document.querySelector("#input-form");
var dailyForecast = document.querySelector("ul"); // sample from activity 6
var fetchButton = document.getElementById("fetch-button");
var inputContainerEl = document.querySelector("#input-container");
var hourlyWeatherEl = document.querySelector(".hourly-weather");
var cityInputEl = document.querySelector("#city");
var apiKey = "3e89c17611e41ba25f1b674bd5f9012d";
var currentForecast;
//cityInputEl = [];

//this will return the value of "key" into local storage
// localStorage.setItem("nameOfKey", "valueOfKey");
// let val = localStorage.getItem("nameOfKey")
// console.log(val);

// input form that accepts a city selected by the user
inputForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formSubmitHandler();
});


var formSubmitHandler = function () {
    // prevent page from refreshing
    //console.log(event);
    cityInput(cityInputEl.value);

    //this will return the value of "key" into local storage
    localStorage.setItem("cityInputEl", JSON.stringify(fetchButton));
    let val = localStorage.getItem("cityInputEl")
    console.log(val); // this console logs the city that the user inputs
}

var getForecastData = function (lat, lon) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=3e89c17611e41ba25f1b674bd5f9012d";

    fetch(requestUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                // pass response data to dom function
                fiveDayForecast(data); // this console logs weather forecast data for the city input by the user

            });
        }
    });
};

var fiveDayForecast = function (data) {
    let fiveDayDisplay = document.createElement('div');
    fiveDayDisplay.setAttribute('id', data);
    //display.appendChild(fiveDayDisplay);
    console.log(data); // "data" is the weather data for the city that was input

    if (data.length === 0) {
        fiveDayContainerEl.textContent = "Test";
        return;
    }

    for (var i = 0; i < data.length; i++) {
        // create a link element to take users to the issue on github
        var fiveDayEl = document.createElement("a");
        fiveDayEl.classList = "list-item flex-row justify-space-between align-center";
        fiveDayEl.setAttribute("href", data[i].html_url);
        fiveDayEl.setAttribute("target", "_blank");

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

//get lat & Lon from city input
var cityInput = function (city) {

    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=3e89c17611e41ba25f1b674bd5f9012d";

    console.log(apiUrl); // this works
    fetch(apiUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                // pass response data to dom function
                console.log(data); //this is the city data (e.g. lat, long, state, etc.)

                lat = data[0].lat;
                lon = data[0].lon;
                getForecastData(lat, lon, city);


            });
        }
    })
}

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


// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city 