var inputForm = document.querySelector("#input-form");
var dailyForecast = document.querySelector('ul'); // sample from activity 6
var fetchButton = document.getElementById('fetch-button');
var inputContainerEl = document.querySelector("#input-container");
var cityInputEl = document.querySelector("#city");
var apiKey = "3e89c17611e41ba25f1b674bd5f9012d";

localStorage.setItem("test1", "test2");
let val = localStorage.getItem("test1")
//console.log(val);

inputForm.addEventListener("submit", formSubmitHandler);

var formSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();
    getWeather();
}
console.log(formSubmitHandler);

var getWeather = function () {

    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&units=imperial&appid=" + apiKey;
    
    fetch(requestUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                // pass response data to dom function
                console.log(data);
            });
        } else {
            alert("There was a problem with your request!");
        }
    })
    getWeather();

    
    console.log(getWeather);




    let apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appID=' + '3e89c17611e41ba25f1b674bd5f9012d';
    console.log(getWeather);
    console.dir(cityID);
    fetch(apiUrl);

    var displayinputs = function (inputs, searchTerm) {
        // check if api returned any inputs
        if (inputs.length === 0) {
            inputContainerEl.textContent = "No repositories found.";
            return;
        }
        fetch(apiUrl).then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    // pass response data to dom function
                    displayIssues(data);
                });
            } else {
                alert("There was a problem with your request!");
            }
        }
            .catch(function (error) {
                // Notice this `.catch()` getting chained onto the end of the `.then()` method
                alert("Unable to connect to GitHub");
            }));
        if (response.ok) {
            response.json().then(function (data) {
                displayIssues(data);

                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    console.log("displayWarning(cityID)");
                }
            });
        }
    }
}


