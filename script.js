// DOM elements
const locationSelect = document.getElementById('district');
const resultSection = document.getElementById('result');
const capeElement = document.getElementById('cape');
const lclElement = document.getElementById('lcl');
const thunderRiskElement = document.getElementById('risk-level');

// Fetch location data (districts)
fetch('districts.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(d => {
      const option = document.createElement('option');
      option.value = JSON.stringify({ lat: d.lat, lon: d.lon });
      option.textContent = d.name;
      locationSelect.appendChild(option);
    });
  })
  .catch(err => console.error('Error loading districts:', err));

// Event listener for location selection
locationSelect.addEventListener('change', (e) => {
  const { lat, lon } = JSON.parse(e.target.value);
  fetchWeatherData(lat, lon);
});

// Function to fetch weather data
function fetchWeatherData(lat, lon) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=cape,lifted_index,convective_inhibition,wind_speed_10m,wind_gusts_10m,wind_direction_10m,temperature_2m,relative_humidity_2m&current_weather=true&timezone=auto`;

  // Fetch data from API
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const cape = data.hourly.cape[0];
      const lcl = data.hourly.lifted_index[0];
      const windSpeed = data.hourly.wind_speed_10m[0];
      const windGusts = data.hourly.wind_gusts_10m[0];
      const windDirection = data.hourly.wind_direction_10m[0];

      // Display data in the HTML
      capeElement.textContent = `CAPE: ${cape} J/kg`;
      lclElement.textContent = `Lifted Index: ${lcl}`;
      thunderRiskElement.textContent = `Thunderstorm Risk: ${calculateThunderRisk(cape, lcl)}`;
      
      resultSection.classList.remove('hidden');
    })
    .catch(err => {
      console.error('Error fetching weather data:', err);
      alert('ডেটা আনতে সমস্যা হয়েছে।');
    });
}

// Function to calculate thunderstorm risk based on CAPE and Lifted Index (LI)
function calculateThunderRisk(cape, lcl) {
  if (cape >= 1000 && lcl <= -5) {
    return 'High Risk';
  } else if (cape >= 500 && lcl <= 0) {
    return 'Moderate Risk';
  } else {
    return 'Low Risk';
  }
}
