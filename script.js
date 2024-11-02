const apiKey = '8f9164d0bb1a347b51a7d0e25e247b6c';
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function getWeather(city) {
    let response;

    // Check if the city parameter is provided; if not, use geolocation
    if (city) {
        response = await fetch(apiurl + city + `&appid=${apiKey}`);
    } else {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
                displayWeather(response);
            }, () => {
                alert("Unable to retrieve your location. Please enter a city name.");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
            return;
        }
        return; 
    }

    displayWeather(response);
}


async function displayWeather(response) {
    if (response.status == 404) {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weather').style.display = "none";
    } else {
        const data = await response.json();
        console.log(data);

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.Wind').innerHTML = data.wind.speed + ' km/hr';

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                break;
            case "Haze":
                weatherIcon.src = "images/haze.png";
                break;
            default:
                weatherIcon.src = "images/default.png"; 
        }

        document.querySelector('.weather').style.display = "block";
        document.querySelector('.error').style.display = "none";
    }
}

searchBtn.addEventListener('click', () => {
    const city = searchBox.value;
    getWeather(city);
});


getWeather();
