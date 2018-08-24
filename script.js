const loc = document.getElementById("location");
const temNum = document.getElementById("temperature-num");
const temScale = document.getElementById("temperature-scale");
const weatherCon = document.getElementById("weather-condition");
const weatherIcon = document.getElementById("weather-icon");



//Getting User Locations//


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  } else {
    loc.innerHTML = "Geolocation is not supported by this browser.";
  }
}


//Weather API Link//

function getWeather(lat, long) {
  const root = "https://fcc-weather-api.glitch.me/api/current?";
  fetch(`${root}lat=${lat}&lon=${long}`, { method: "get" })
    .then(resp => resp.json())
    .then(data => {
      updateDataToUI(data.name, data.weather, data.main.temp);
    })
    .catch(function(err) {
      console.error(err);
    });
}

function updateDataToUI(location, weather, temp) {
  weatherIcon.innerHTML = `<img src="${weather[0].icon}" />`;
  weatherCon.innerHTML = weather[0].main;
  loc.innerHTML = location;
  temNum.innerHTML = `${temp}`;
}

window.onload = function() {
  getLocation();
};

function celsiusToFarenheit(celsius) {
  return celsius * 9 / 5 + 32;
}

function farenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toggleTemp() {
  if (temScale.innerHTML === "Celsius") {
    temNum.innerHTML = celsiusToFarenheit(temNum.innerHTML).toFixed(2);
    temScale.innerHTML = "Farenheit";
  } else if (temScale.innerHTML === 'Farenheit') {
    temNum.innerHTML = farenheitToCelsius(temNum.innerHTML).toFixed(2);
    temScale.innerHTML = "Celsius";
  }
}

temScale.addEventListener("click", toggleScale);

