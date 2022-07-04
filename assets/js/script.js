
 
    // format the Open Call api url
    // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip=54848&appid=3e89c17611e41ba25f1b674bd5f9012d";
    // fetch("https://api.openweathermap.org/data/2.5/weather?zip=54848&appid=3e89c17611e41ba25f1b674bd5f9012d")

    var inputForm = document.querySelector("#user-form");
    var dailyForecast = document.querySelector('ul'); // sample from activity 6
    var fetchButton = document.getElementById('fetch-button');
    var inputContainerEl = document.querySelector("#input-container");
    var cityInputEl = document.querySelector("#city");
    var username = cityInputEl.value.trim();

   
    inputForm.addEventListener("submit", formSubmitHandler);

    var formSubmitHandler = function(event) {
        // prevent page from refreshing
        event.preventDefault();       
    }      

    console.log(formSubmitHandler);
    
 //var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=54848&appid=3e89c17611e41ba25f1b674bd5f9012d'; //this url works
      //var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=Chicago&limit=5&appid=3e89c17611e41ba25f1b674bd5f9012d' // this url works
      

    function getApi() {
      
     var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=" + city +"&appid=3e89c17611e41ba25f1b674bd5f9012d'
     fetchButton.addEventListener('click', getApi);
      fetch(requestUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          for (var i = 0; i < data.length; i++) {
            var dayOne = document.createElement('li');
            dayOne.textContent = data[i].html_url;
            dailyForecast.appendChild(dayOne);   // sample from activity 6
          }
        });
    }
    getApi();
  
  
    console.log(getApi);


     var getWeather = function (cityID) {
      var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=3e89c17611e41ba25f1b674bd5f9012d" + cityID;
      
      var displayRepos = function (repos, searchTerm) {
        // check if api returned any repos
    if (repos.length === 0) {
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
          }}
          .catch(function(error) {
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
          }}}
      
      console.log(getWeather);
      
  
  getWeather();

//test out lines 103-...

for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
  
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
  
        // append to container
        repoEl.appendChild(titleEl);
        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // clear old content
      repoContainerEl.textContent = "";
      repoSearchTerm.textContent = searchTerm;

      // check if current repo has issues or not
      if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML =
          "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
      } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
      }

      // append to container
      repoEl.appendChild(statusEl);
      // append container to the dom
      repoContainerEl.appendChild(repoEl);
    }
    console.log(repos);
    console.log(searchTerm);
  

//        //fetch("https://api.openweathermap.org/data/2.5/weather?zip=54848&appid=3e89c17611e41ba25f1b674bd5f9012d");
//         //make a request to the url
//         // fetch(apiUrl).then(function (response) {
//         //     response.json().then(function (data) {
//         //         console.log(data);
//         //     });
//         // }}
       

//   //     var response = fetch("https://api.openweathermap.org/data/2.5/weather?zip=54848&appid=3e89c17611e41ba25f1b674bd5f9012d").then(function (response) {
// //         response.json().then(function (data) {
// //             console.log(data);
// //         });
// //     });

//     // getWeather: (ev) => {
//     //     //use city name to fetch the weather
//     //     let city = document.getElementById('city').value;
//     //     let key = '3e89c17611e41ba25f1b674bd5f9012d';
//     //     let lang = 'en';
//     //     let units = 'metric';
//     //     let url = "http://api.openweathermap.org/data/2.5/onecall?q=${city_name}&appid=${key}&units=${units}&lang=${lang}";
       
        
//     // // //fetch the weather
//     //     fetch(url)
//     //       .then((resp) => {
//     //         if (!resp.ok) throw new Error(resp.statusText);
//     //         return resp.json();
//     //       })
//     //       .then((data) => {
//     //         app.showForecast(data);
//     //       })
//     //       .catch(console.err);
//     //   }
//     //   
//     //   fetch();
