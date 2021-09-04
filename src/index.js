function dateInput(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function unitFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = 66;
}

function unitCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = 19;
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function retrievePosition(position) {
  let apiKey = "893886e4043b145eed504f35245dfbcc";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}

function buttonClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = dateInput(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", unitFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", unitCelsius);

let searchButton = document.querySelector("#current-location");
searchButton.addEventListener("click", buttonClick);

searchCity("Amsterdam");
