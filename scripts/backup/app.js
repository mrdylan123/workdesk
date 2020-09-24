'use strict';

const workdeskApp = {
    loggedInUser,
    events: {},
};


/**
 * Renders the event data into the agenda.
 *
 * @param {Element} div The div element to update.
 * @param {Object} data Event data to update the element with.
 */
function renderAgenda(div, data) {
    if (!data) {
        // There's no data, skip the update.
        return;
    }

    // Create div
    var div = document.createElement("div");
    div.style.width = "100px";
    div.style.height = "100px";
    div.style.background = "red";
    div.style.color = "white";
    div.innerHTML = "Hello";

    document.getElementById("day1").appendChild(div);

    // Render the event data into the agenda.
    // card.querySelector('.description').textContent = data.currently.summary;
    // const forecastFrom = luxon.DateTime
    //     .fromSeconds(data.currently.time)
    //     .setZone(data.timezone)
    //     .toFormat('DDDD t');
    // card.querySelector('.date').textContent = forecastFrom;
    // card.querySelector('.current .icon')
    //     .className = `icon ${data.currently.icon}`;
    // card.querySelector('.current .temperature .value')
    //     .textContent = Math.round(data.currently.temperature);
    // card.querySelector('.current .humidity .value')
    //     .textContent = Math.round(data.currently.humidity * 100);
    // card.querySelector('.current .wind .value')
    //     .textContent = Math.round(data.currently.windSpeed);
    // card.querySelector('.current .wind .direction')
    //     .textContent = Math.round(data.currently.windBearing);
    // const sunrise = luxon.DateTime
    //     .fromSeconds(data.daily.data[0].sunriseTime)
    //     .setZone(data.timezone)
    //     .toFormat('t');
    // card.querySelector('.current .sunrise .value').textContent = sunrise;
    // const sunset = luxon.DateTime
    //     .fromSeconds(data.daily.data[0].sunsetTime)
    //     .setZone(data.timezone)
    //     .toFormat('t');
    // card.querySelector('.current .sunset .value').textContent = sunset;


// /**
//  * Gets the latest event data from the network.
//  *
//  * @param {string} coords Location object to.
//  * @return {Object} The weather forecast, if the request fails, return null.
//  */
// function getForecastFromNetwork(coords) {
//   return fetch(`/forecast/${coords}`)
//       .then((response) => {
//         return response.json();
//       })
//       .catch(() => {
//         return null;
//       });
// }

/**
 * Get's the cached forecast data from the caches object.
 *
 * @param {string} coords Location object to.
 * @return {Object} The weather forecast, if the request fails, return null.
 */
// function getForecastFromCache(coords) {
//   // CODELAB: Add code to get weather forecast from the caches object.
//   if (!('caches' in window)) {
//     return null;
//   }
//   const url = `${window.location.origin}/forecast/${coords}`;
//   return caches.match(url)
//       .then((response) => {
//         if (response) {
//           return response.json();
//         }
//         return null;
//       })
//       .catch((err) => {
//         console.error('Error getting data from cache', err);
//         return null;
//       });
// }

/**
 * Get's the HTML element for the weather forecast, or clones the template
 * and adds it to the DOM if we're adding a new item.
 *
 * @param {Object} location Location object
 * @return {Element} The element for the weather forecast.
 */
function getForecastCard(location) {
  const id = location.geo;
  const card = document.getElementById(id);
  if (card) {
    return card;
  }
  const newCard = document.getElementById('weather-template').cloneNode(true);
  newCard.querySelector('.location').textContent = location.label;
  newCard.setAttribute('id', id);
  newCard.querySelector('.remove-city')
      .addEventListener('click', removeLocation);
  document.querySelector('main').appendChild(newCard);
  newCard.removeAttribute('hidden');
  return newCard;
}

/**
 * Gets the latest weather forecast data and updates each card with the
 * new data.
 */
function updateData() {
  Object.keys(weatherApp.selectedLocations).forEach((key) => {
    const location = weatherApp.selectedLocations[key];
    const card = getForecastCard(location);
    // CODELAB: Add code to call getForecastFromCache
    getForecastFromCache(location.geo)
    .then((forecast) => {
      renderForecast(card, forecast);
    });
    // Get the forecast data from the network.
    getForecastFromNetwork(location.geo)
        .then((forecast) => {
          renderForecast(card, forecast);
        });
  });
}

/**
 * Saves the list of locations.
 *
 * @param {Object} locations The list of locations to save.
 */
function saveLocationList(locations) {
  const data = JSON.stringify(locations);
  localStorage.setItem('locationList', data);
}

/**
 * Loads the list of saved location.
 *
 * @return {Array}
 */
function loadLocationList() {
  let locations = localStorage.getItem('locationList');
  if (locations) {
    try {
      locations = JSON.parse(locations);
    } catch (ex) {
      locations = {};
    }
  }
  if (!locations || Object.keys(locations).length === 0) {
    const key = '40.7720232,-73.9732319';
    locations = {};
    locations[key] = {label: 'New York City', geo: '40.7720232,-73.9732319'};
  }
  return locations;
}

/**
 * Initialize the app, gets the list of locations from local storage, then
 * renders the initial data.
 */
function init() {
  // Get the location list, and update the UI.
  weatherApp.selectedLocations = loadLocationList();
  updateData();

  // Set up the event handlers for all of the buttons.
  document.getElementById('butRefresh').addEventListener('click', updateData);
  document.getElementById('butAdd').addEventListener('click', toggleAddDialog);
  document.getElementById('butDialogCancel')
      .addEventListener('click', toggleAddDialog);
  document.getElementById('butDialogAdd')
      .addEventListener('click', addLocation);
}

init();
