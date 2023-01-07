function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours} ${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  cityElement.innerHMTL = response.data.city;
  descriptionElement.innerHMTL = response.data.condition.description;
  temperatureElement.innerHMTL = Math.round(response.data.temperature.current);
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  console.log(response.data.temperature.current);
  console.log(response.data.time);
}

let apiKey = "49a1a3338e40b2eecfbaf314e5ta48oe";
let city = "Paris";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

https: console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
