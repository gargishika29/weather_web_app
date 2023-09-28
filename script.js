document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "ef0562be82cf37af02f31aec3f3ffe36"; // openweathermap API key
    const weatherInfo = document.getElementById("weather-info");
    const errorMessage = document.getElementById("error-message");

    document.getElementById("get-weather").addEventListener("click", () => {
        const location = document.getElementById("location").value;
        const unit = document.querySelector('input[name="unit"]:checked').value;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Location not found.");
                }
                return response.json();
            })
            .then(data => {
                errorMessage.textContent = "";
                const weatherData = `
                    <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                    <p>Temperature: ${data.main.temp}°</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                    <p>Description: ${data.weather[0].description}</p>
                `;
                weatherInfo.innerHTML = weatherData;
            })
            .catch(error => {
                weatherInfo.textContent = "";
                errorMessage.textContent = error.message;
            });
    });

    // Check for geolocation support and request user permission

    if ("geolocation" in navigator) {
        document.getElementById("location").placeholder = "Or use your current location";
        document.getElementById("location").addEventListener("click", () => {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Unable to fetch weather for your current location.");
                        }
                        return response.json();
                    })
                    .then(data => {
                        errorMessage.textContent = "";
                        const weatherData = `
                            <h2>Your Current Weather</h2>
                            <p>Temperature: ${data.main.temp}°</p>
                            <p>Humidity: ${data.main.humidity}%</p>
                            <p>Wind Speed: ${data.wind.speed} m/s</p>
                            <p>Description: ${data.weather[0].description}</p>
                        `;
                        weatherInfo.innerHTML = weatherData;
                    })
                    .catch(error => {
                        weatherInfo.textContent = "";
                        errorMessage.textContent = error.message;
                    });
            });
        });
    }
    // Function to update weather data when the unit is changed
function changeUnit() {
    const location = document.getElementById("location").value;
    const unit = document.querySelector('input[name="unit"]:checked').value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Location not found.");
            }
            return response.json();
        })
        .then(data => {
            errorMessage.textContent = "";
            const weatherData = `
                <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
                <p>Description: ${data.weather[0].description}</p>
            `;
            weatherInfo.innerHTML = weatherData;
        })
        .catch(error => {
            weatherInfo.textContent = "";
            errorMessage.textContent = error.message;
        });
}

// Add event listeners to the unit radio buttons
document.getElementById("celsius").addEventListener("change", changeUnit);
document.getElementById("fahrenheit").addEventListener("change", changeUnit);

});
