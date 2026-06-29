# Weather App
[Live Demo](https://abedoulaye.github.io/weather-)

A simple weather application that fetches real-time weather data using the Open-Meteo API.

## Features

- Search for any city worldwide
- Displays current temperature, humidity, wind speed, and feels-like temperature
- Dynamic weather icons based on temperature
- Responsive design for mobile and desktop

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- [Open-Meteo Weather API](https://open-meteo.com/)
- [Open-Meteo Geocoding API](https://open-meteo.com/)

## How It Works

1. Enter a city name in the search box
2. The app uses the Geocoding API to convert the city name to coordinates
3. Those coordinates are used to fetch weather data from the Weather API
4. Results are displayed with temperature, humidity, wind speed, and more

## Setup

1. Clone this repository
2. Open `index.html` in your browser (or use Live Server in VS Code)
3. Start searching for cities!

No API keys or dependencies required.

## File Structure
weather-app/
├── index.html
├── styles.css
└── script.js

text

## APIs Used

- **Geocoding:** `https://geocoding-api.open-meteo.com/v1/search`
- **Weather:** `https://api.open-meteo.com/v1/forecast`

## License

Free to use and modify.