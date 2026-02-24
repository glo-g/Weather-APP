// API Configuration
const API_KEY = '4818e7b398bb9748ab1cfa12390a87c7'; 
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Get DOM elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const weatherIcon = document.getElementById('weatherIcon');

// Mock weather data for fallback and initialization
const weatherData = {
    london: {
        city: 'London',
        temp: 15,
        description: 'partly cloudy',
        humidity: 60,
        windSpeed: 10,
        icon: '⛅'
    }
};

// Function to get weather icon based on weather condition
function getWeatherIcon(weatherMain, weatherDescription) {
    const weatherCondition = weatherMain.toLowerCase();
    const desc = weatherDescription.toLowerCase();

    if (weatherCondition.includes('clear')) return '☀️';
    if (weatherCondition.includes('cloud')) return desc.includes('few') ? '⛅' : '☁️';
    if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) return '🌧️';
    if (weatherCondition.includes('snow')) return '❄️';
    if (weatherCondition.includes('thunder')) return '⛈️';
    if (weatherCondition.includes('mist') || weatherCondition.includes('fog')) return '🌫️';

    return '🌤️'; // Default icon
}

// Function to fetch weather data from API
async function fetchWeatherFromAPI(city) {
    try {
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return {
            city: data.name,
            temp: Math.round(data.main.temp),
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed * 3.6),
            icon: getWeatherIcon(data.weather[0].main, data.weather[0].description)
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

// Function to update weather display
function updateWeatherDisplay(data) {
    cityName.textContent = data.city;
    temp.textContent = data.temp;
    description.textContent = data.description;
    humidity.textContent = data.humidity + '%';
    windSpeed.textContent = data.windSpeed + ' km/h';
    weatherIcon.textContent = data.icon;
}

// Function to generate random weather data (fallback)
function generateRandomWeather(cityName) {
    const conditions = [
        { description: 'sunny', icon: '☀️' },
        { description: 'cloudy', icon: '☁️' },
        { description: 'rainy', icon: '🌧️' },
        { description: 'partly cloudy', icon: '⛅' },
        { description: 'snowy', icon: '❄️' }
    ];

    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];

    return {
        city: cityName.charAt(0).toUpperCase() + cityName.slice(1),
        temp: Math.floor(Math.random() * 35) + 5,
        description: randomCondition.description,
        humidity: Math.floor(Math.random() * 60) + 30,
        windSpeed: Math.floor(Math.random() * 25) + 5,
        icon: randomCondition.icon
    };
}

// Function to search weather
async function searchWeather() {
    const city = cityInput.value.toLowerCase().trim();

    if (!city) {
        alert('Please enter a city name!');
        return;
    }

    searchBtn.textContent = 'Loading...';
    searchBtn.disabled = true;

    try {
        const apiData = await fetchWeatherFromAPI(city);
        updateWeatherDisplay(apiData);
    } catch (error) {
        console.error('API failed, using fallback data:', error);

        if (weatherData[city]) {
            updateWeatherDisplay(weatherData[city]);
        } else {
            const randomWeather = generateRandomWeather(city);
            updateWeatherDisplay(randomWeather);
        }
    } finally {
        cityInput.value = '';
        searchBtn.textContent = 'Get Weather';
        searchBtn.disabled = false;
    }
}

// Event listeners
searchBtn.addEventListener('click', searchWeather);

cityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// Initialize with default weather (London)
updateWeatherDisplay(weatherData['london']);
