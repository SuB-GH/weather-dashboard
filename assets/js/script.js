//const dayjs = require('dayjs');
// look at 6.3.5: Convert Fetched Data into DOM Elements to grab city data and put it in the html
var origText = document.querySelector("#city-text");
var inputForm = document.querySelector("#input-form"); // input form that accepts a city selected by the user
var dailyForecast = document.querySelector("daily-forecast"); // sample from activity 6
var fetchButton = document.getElementById("fetch-button");
var inputContainerEl = document.querySelector("#input-container");

var humidityContainerEl = document.querySelector("#humidity-container");
var windContainerEl = document.querySelector("#wind-container");
var hourlyWeatherEl = document.querySelector(".hourly-weather");
var weatherList = document.getElementById("#temperature-container")
//var weatherList = document.querySelector(".list-group-item")

var cityInputEl = document.querySelector("#city"); // references input form that accepts a city selected by the user
var citySearchHistoryCont = document.querySelector("#search-history");



// var currentDate = moment().format('L');
// $("#current-date").text("(" + currentDate + ")");


var apiKey = "3e89c17611e41ba25f1b674bd5f9012d";
var currentForecast;
var citySearchHistory = JSON.parse(localStorage.getItem("city")) || [];


function renderCitySearchHistory() {
    citySearchHistoryCont.innerHTML = '';

    // $(`#citySearchHistoryCont`).empty();
    
    // this creates the city search history buttons and renders them to the html page
    for (var i = citySearchHistory.length - 1; i >= 0; i--) {
        var newCityBtn = document.createElement('button');
        newCityBtn.setAttribute('type', 'button');
        // newCityBtn.setAttribute('aria-controls', 'current forecast');
        // newCityBtn.classList.add('history-btn', 'btn-history');
        newCityBtn.setAttribute('data-search', citySearchHistory[i]);
        newCityBtn.textContent = citySearchHistory[i];
        citySearchHistoryCont.appendChild(newCityBtn);
        newCityBtn.addEventListener("click", citySearchHistory);
    }


}



function formSubmitHandler(event) {
    event.preventDefault();
    //console.log(cityInputEl.value); // "cityInputEl" is the city that was entered by the user
    var cityName = cityInputEl.value.trim();
    if (cityName) {
        cityInput(cityName);
        inputContainerEl.textContent = '';
        //cityInputEl.value = '';
        origText.innerHTML = cityInputEl.value; // this adds the city to the rendered weather data
        citySearchHistory.push(cityInputEl.value);
        localStorage.setItem('city', JSON.stringify(citySearchHistory));
        renderCitySearchHistory();
        // only add city button if city is not there already
        // if (city.indexOf(citySearchHistory) !== -1) {
        //     return;
        console.log(city);
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

function weatherImg(weatherImage) {
    var iconUrl = `https://openweathermap.org/img/wn/${weatherImage}@2x.png`;
    return iconUrl;
}
//console.log(weatherImage);


var fiveDayForecast = function (data) {
    console.log(data); //five day forecast
    console.log(data.current.temp);
    if (data.length === 0) {
        fiveDayContainerEl.textContent = "Test";
        return;
    }

    var humidityEl = document.createElement('p');

    var currentTemp = data.current.temp; // this grabs the actual current temp for the selected city
    var currentWind = data.current.wind_speed; // this grabs the actual current wind speed for the selected city
    var currentHumidity = data.current.humidity; // this grabs the actual current humidity for the selected city
    var test = data.daily.humidity;

    var weatherTitle = document.getElementById("input-container");
    humidityEl = document.getElementById('humidity-container');
    windEl = document.getElementById('wind-container');

    // this is what renders the current weather data in the html page
    weatherTitle.textContent = `Temperature: ${currentTemp}`;
    windEl.textContent = `Wind Speed: ${currentWind}`;
    humidityEl.textContent = `Humidity: ${currentHumidity}` + '%';

    // currentHumidityEl.textContent = "Humidity: " + currentHumidity + "%";

    var iconImage = weatherImg(data.current.weather[0].icon);
    //var iconUrl = `https://openweathermap.org/img/w/${data.daily[0].icon}.png`;

    //http://openweathermap.org/img/wn/10d@2x.png
    //var dailyIcon = daily.weather[0].description || daily[0].main;


    //var futureForecastString =  moment(data.current.weather[i].dt_txt).format("L")
    //console.log(futureForecastString);

    console.log(currentTemp);
    console.log(currentWind);
    console.log(currentHumidity);

    // weatherIcon.setAttribute('src', iconUrl);
    //  weatherIcon.setAttribute('alt', iconDescription);

    for (var i = 0; i < 5; i++) {

        var dailyTemp = data.daily[i].temp.day; // this grabs the actual current temp for the selected city
        var dailyWind = data.daily[i].wind_speed; // this grabs the actual current wind speed for the selected city
        var dailyHumidity = data.daily[i].humidity; // this grabs the actual current humidity for the selected city
        //weatherIcon = data.current.weather[i].icon;
        
        

        var weatherTitle = document.getElementById("temperature-container-" + i);
        humidityEl = document.getElementById("humidity-container-" + i);
        windEl = document.getElementById("wind-container-" + i);
        //iconUrl = document.getElementById("icon-container-" + i);
        //weatherIcon = document.getElementById("icon-container-" + i);
        var weatherIcon = document.createElement('img'); // 'img' is 
        weatherIcon.setAttribute('src', iconImage);
        console.log(weatherIcon);
        humidityContainerEl.appendChild(weatherIcon); // this attaches the weather icon to the html page

        // this is what renders the current weather data in the html page
        weatherTitle.textContent = `Temperature: ${dailyTemp}`;
        windEl.textContent = `Wind Speed: ${dailyWind}`;
        humidityEl.textContent = `Humidity: ${dailyHumidity}` + '%';
        //iconEl.setAttribute('src', {icon});


        //     var fiveDayEl = document.createElement("a");
        //     fiveDayEl.classList = "list-item flex-row justify-space-between align-center";
        //     fiveDayEl.setAttribute("href", data.daily[i].html_url);
        //     fiveDayEl.setAttribute("target", "_blank");
        //     //console.log(dataVar);

        //     // create span to hold issue title
        //     var titleEl = document.createElement("span");
        //     titleEl.textContent = data.daily[i].uvi;

        //     // append to container
        //     fiveDayEl.appendChild(titleEl);

        //     // create a type element
        //     var typeEl = document.createElement("span");

        //     // check if issue is an actual issue or a pull request
        //     // if (data.daily[i].pull_request) {
        //     //     typeEl.textContent = "(Pull request)";
        //     // } else {
        //     //     typeEl.textContent = "(fiveDay)";
        //     // }

        //     // append to container
        //     fiveDayEl.appendChild(typeEl);
        //     //fiveDayContainerEl.appendChild(fiveDayEl);
        // }

    };

    let fiveDayDisplay = document.querySelector('#five-day-results');

    //randomly testing this DOM element
    var testEl = document.createElement("span");



    // currentForecast = city.current
    // //current city
    // var currentCity = document.createElement("h3")
    // currentCity.textContent = currentCity;
    // hourlyWeatherEl.appendChild(currentCity);


    let main = document.querySelector(".main");
    let p = main.querySelector("p");

    //p.innerHTML = "Hopefully this works!?";

    let ul = document.createElement("ul");
    main.appendChild(ul);
}



// weather.forEach(function() {
//     let li = document.createElement("li");
//     let txt = document.createTextNode();
// });


// var cityInputEl = document.createElement("span");
//        cityInputEl.textContent = array[i].cityInput;


// input form that accepts a city selected by the user
inputForm.addEventListener("submit", formSubmitHandler);