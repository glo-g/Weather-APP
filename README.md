# Weather-APP
# 

A simple, responsive weather app built with vanilla  HTML, CSS, and JavaScript. Search any city and get real-time temperature, conditions, humidity, and wind speed via the OpenWeatherMap API — with graceful fallback to mock data if the API is unavailable.

![Weather App preview](weatherapp.jpg)

#Features

- 🔍 Search current weather by city name
- 🌡️ Displays temperature, description, humidity, and wind speed
- 🎨 Dynamic weather icon based on conditions (clear, cloudy, rain, snow, thunderstorm, fog)
- 📱 Responsive layout for mobile and desktop
- 🛟 Fallback to cached/mock data if the API request fails, so the UI never breaks
- ⌨️ Search on button click or Enter key

## Demo

Open `weatherindex.html` in a browser, or see [Getting Started](#getting-started) below to run it locally.

## Tech Stack

- **HTML5** — markup structure (`weatherindex.html`)
- **CSS3** — styling and responsive design (`weather.css`)
- **JavaScript (ES6+)** — API calls, DOM manipulation, and state (`scriptweath.js`)
- **[OpenWeatherMap API](https://openweathermap.org/current)** — live weather data

## Project Structure

```
Weather-APP/
├── weatherindex.html   # Main HTML page
├── weather.css         # Styles
├── scriptweath.js      # App logic & API calls
├── weatherapp.jpg      # Background image
└── README.md
```

## Getting Started

### Prerequisites

- A modern web browser
- A free [OpenWeatherMap API key](https://home.openweathermap.org/users/sign_up)

### Installation

1. Clone the repo
   ```bash
   git clone git@github.com:glo-g/Weather-APP.git
   cd Weather-APP
   ```




This project currently has no license file. Consider adding one (e.g. MIT) if you intend for others to reuse the code.

## Author

**Glo** — [github.com/glo-g](https://github.com/glo-g)
