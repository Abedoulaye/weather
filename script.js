// weather API https://api.open-meteo.com/v1/forecast
// geocoding api https://geocoding-api.open-meteo.com/v1/search

const cityName = "New York"
const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=5&language=en&format=json`;

const cityInput = document.getElementById("city-input")
const searchBtn = document.getElementById("search-btn")
async function geoCode() {
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
        const bestMatch = data.results[0]
        console.log(bestMatch)

        return data.results ? data.results[0]: null
    } catch(error) {
        console.log("Something went wrong", error)
        return null  
    }
}

geoCode()