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
  return `${day} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = "49a1a3338e40b2eecfbaf314e5ta48oe";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let bgImage = document.querySelector(".transparent-box");

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  bgImage.style.backgroundImage = `${
    customWeatherData[response.data.condition.icon].backgroundImage
  }`;

  getForecast(response.data.coordinates);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
      <img
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
        alt=""
        width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temp-max">${Math.round(
          forecastDay.temperature.maximum
        )}°C/</span>
        <span class="weather-forecast-temp-min">${Math.round(
          forecastDay.temperature.minimum
        )}°C</span>
      </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function search(city) {
  let apiKey = "49a1a3338e40b2eecfbaf314e5ta48oe";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Amsterdam");

let customWeatherData = {
  "clear-sky-day": {
    backgroundImage: "url(src/img-background/clear-sky-day.jpg)",
  },
  "clear-sky-night": {
    backgroundImage: "url(src/img-background/clear-sky-night.jpg)",
  },
  "few-clouds-day": {
    backgroundImage: "url(src/img-background/few-clouds-day.jpg)",
  },
  "few-clouds-night": {
    backgroundImage: "url(src/img-background/few-clouds-night.jpg)",
  },
  "scattered-clouds-day": {
    backgroundImage: "url(src/img-background/scattered-clouds-day.jpg)",
  },
  "scattered-clouds-night": {
    backgroundImage: "url(src/img-background/scattered-clouds-night.jpg)",
  },
  "broken-clouds-day": {
    backgroundImage: "url(src/img-background/broken-clouds-day.jpg)",
  },
  "broken-clouds-night": {
    backgroundImage: "url(src/img-background/broken-clouds-night.jpg)",
  },
  "shower-rain-day": {
    backgroundImage: "url(src/img-background/shower-rain-day.jpg)",
  },
  "shower-rain-night": {
    backgroundImage: "url(src/img-background/shower-rain-night.jpg)",
  },
  "rain-day": {
    backgroundImage: "url(src/img-background/rain-day.jpg)",
  },
  "rain-night": {
    backgroundImage: "url(src/img-background/rain-night.jpg)",
  },
  "thunderstorm-day": {
    backgroundImage: "url(src/img-background/thunderstorm-day.jpg)",
  },
  "thunderstorm-night": {
    backgroundImage: "url(src/img-background/thunderstorm-night.jpg)",
  },
  "snow-day": {
    backgroundImage: "url(src/img-background/snow-day.jpg)",
  },
  "snow-night": {
    backgroundImage: "url(src/img-background/snow-night.jpg)",
  },
  "mist-day": {
    backgroundImage: "url(src/img-background/mist-day.jpg)",
  },
  "mist-night": {
    backgroundImage: "url(src/img-background/mist-night.jpg)",
  },
  default: {
    iconClass: "fa-question",
    spotifyId: "5YMXGBD6vcYP7IolemyLtK?utm_source=generator",
    trackDescription: "Here's a weird song for weird days:",
    backgroundImage: "url(src/img-background/01d.jpg)",
  },
};
