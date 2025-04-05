// Add student information dynamically
document.addEventListener('DOMContentLoaded', function() {
    // Replace with your actual student ID and name
    const studentId = "200597146"; 
    const studentName = "Lovepreet Singh Lovepreet Singh";
    
    // Add student info to the page
    document.getElementById('student-info').textContent = `Student ID: ${studentId} | Name: ${studentName}`;
    
    // Set up event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Add click event for search button
    document.getElementById('search-btn').addEventListener('click', function() {
        const city = document.getElementById('city-input').value.trim();
        if (city) {
            getWeatherData(city);
        } else {
            showError("Please enter a city name");
        }
    });
    
    // Add event listener for Enter key in input field
    document.getElementById('city-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const city = document.getElementById('city-input').value.trim();
            if (city) {
                getWeatherData(city);
            } else {
                showError("Please enter a city name");
            }
        }
    });
}

async function getWeatherData(city) {
    // Replace with your actual API key from OpenWeatherMap
    const apiKey = '5cdeed8ca2e02e492f58d55d42a79eeb';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        // Show loading state
        document.getElementById('weather-data').innerHTML = '<p class="loading">Loading weather data...</p>';
        
        // Fetch data from API
        const response = await fetch(apiUrl);
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error(`City not found or API error (${response.status})`);
        }
        
        // Parse JSON response
        const data = await response.json();
        
        // Display weather data
        displayWeatherData(data);
        
    } catch (error) {
        // Display error message
        showError(error.message);
    }
}

function displayWeatherData(data) {
    // Get weather container
    const weatherContainer = document.getElementById('weather-data');
    
    // Format date
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Create HTML for weather data
    const weatherHTML = `
        <div class="weather-card">
            <div class="weather-header">
                <h2>${data.name}, ${data.sys.country}</h2>
                <p class="date">${formattedDate}</p>
            </div>
            
            <div class="weather-main">
                <div class="temperature">
                    <h3>${Math.round(data.main.temp)}°C</h3>
                    <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
                </div>
                
                <div class="weather-icon">
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
                    <p>${data.weather[0].description}</p>
                </div>
            </div>
            
            <div class="weather-details">
                <div class="detail">
                    <span class="label">Humidity</span>
                    <span class="value">${data.main.humidity}%</span>
                </div>
                <div class="detail">
                    <span class="label">Wind</span>
                    <span class="value">${data.wind.speed} m/s</span>
                </div>
                <div class="detail">
                    <span class="label">Pressure</span>
                    <span class="value">${data.main.pressure} hPa</span>
                </div>
            </div>
        </div>
    `;
    
    // Update weather container with new data
    weatherContainer.innerHTML = weatherHTML;
}

function showError(message) {
    // Display error message to user
    document.getElementById('weather-data').innerHTML = `
        <div class="error-container">
            <p class="error-message">${message}</p>
            <p>Please try searching for a different city.</p>
        </div>
    `;
}
