// weather API https://api.open-meteo.com/v1/forecast
// geocoding api https://geocoding-api.open-meteo.com/v1/search

const cityInput = document.getElementById("city-input")
const searchBtn = document.getElementById("search-btn")
const city = document.getElementById("city")
const date = document.getElementById("date")

const temperature = document.getElementById("temperature")

const humidity = document.getElementById("humidity")
const wind = document.getElementById("wind")
const feelsLike = document.getElementById("feels-like")
const weatherIcon = document.getElementById("weather-icon")

async function geoCode(cityName) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=5&language=en&format=json`;
    
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
        
        if (!data.results || data.results.length === 0) {
            console.log("City not found")
            return null
        }
        
        const bestMatch = data.results[0]
        console.log("Found:", bestMatch)

        return {
            weatherUrl: `https://api.open-meteo.com/v1/forecast?latitude=${bestMatch.latitude}&longitude=${bestMatch.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&daily=temperature_2m_max,temperature_2m_min&timezone=auto`,
            cityData: bestMatch
        }
    } catch(error) {
        console.log("Something went wrong during geocoding", error)
        return null  
    }
}

async function getWeather(cityName) {
    const output = await geoCode(cityName)
    if (!output){
        alert("City not found, please try again");
        return
    }
    
    const bestMatch = output.cityData
    const weatherUrl = output.weatherUrl
    
    try {
        const res = await fetch(weatherUrl)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
        console.log("Weather data:", data)
        
        city.textContent = `${bestMatch.name}, ${bestMatch.country}`
        date.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
        temperature.textContent = Math.round(data.current.temperature_2m) + "°C"
        feelsLike.textContent = Math.round(data.current.apparent_temperature) + "°C"
        humidity.textContent = data.current.relative_humidity_2m + "%"
        wind.textContent = Math.round(data.current.wind_speed_10m) + " km/h"

        if (data.current.temperature_2m > 25) {
            weatherIcon.textContent = "☀️"
        } else if (data.current.temperature_2m > 15) {
            weatherIcon.textContent = "⛅"
        } else if (data.current.temperature_2m > 5) {
            weatherIcon.textContent = "☁️"
        } else {
            weatherIcon.textContent = "❄️"
        }
    }
    catch(error) {
        console.log("Something went wrong getting weather", error)
        
    }
}

searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value.trim()
    if (cityName) {
        getWeather(cityName)
    }
})


cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const cityName = cityInput.value.trim()
        if (cityName) {
            getWeather(cityName)
        }
    }
})