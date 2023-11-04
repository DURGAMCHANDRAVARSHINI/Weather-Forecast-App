const apiKey = "5362bb7b3b0b2507ef393a80170c174a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const plainurl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
var tryloc = 0;
if ("geolocation" in navigator) {
    navigator.permissions.query({ name: 'geolocation' }).then(function (permissionStatus) {
        if (permissionStatus.state === 'granted') {
            tryloc = 1;
        } else if (permissionStatus.state === 'denied') {
            tryloc = 0;
        }
    });
}
function checkLocation() {
    // console.log(tryloc);
    if ("geolocation" in navigator) {
        navigator.permissions.query({ name: 'geolocation' }).then(function (permissionStatus) {
            if (permissionStatus.state === 'granted' && tryloc === 0) {
                tryloc = 1;
                location.reload();
            } else if (permissionStatus.state === 'denied' && tryloc === 1) {
                tryloc = 0;
                location.reload();
            }
        });
    } else {
        // Geolocation is not supported by this browser
        console.log("Geolocation is not supported by your browser");
        // Handle your logic when geolocation is not supported
    }
}
setInterval(checkLocation, 1000);
// Check if geolocation is supported by the browser
if ("geolocation" in navigator) {
    // Get user's location
    navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        //console.log(`longitude: ${longitude} latitude: ${latitude}`);
        // Call function to get weather information using latitude and longitude
        getWeatherbyCoord(longitude, latitude);
    }, function (error) {
        if (error.code === error.PERMISSION_DENIED) {
            // User has denied location access
            console.log("Location is OFF");
        } else {
            // Some other error occurred while retrieving location
            console.error("Error getting location: ", error);
        }
        getWeather("Delhi");
    });
} else {
    // Geolocation is not supported by this browser
    console.log("Geolocation is not supported by your browser");
    getWeather("Delhi");
}
async function getWeatherbyCoord(longitude, latitude) {
    url = plainurl + `&lon=${longitude}&lat=${latitude}`;
    //console.log(apiUrl);
    const responded = await fetch(url + `&appid=${apiKey}`);
    var deta = await responded.json();
    console.log(deta);
    CityName.innerHTML = `${deta.name}`;
    temp.innerHTML = `${deta.main.temp}°C`;
    temp_min.innerHTML = `${deta.main.temp_min}°C`;
    temp_max.innerHTML = `${deta.main.temp_max}°C`;
    // feels_like.innerHTML=`${deta.main.feels_like}°C`;
    humidity.innerHTML = `${deta.main.humidity}%`;
    wind_speed.innerHTML = `${deta.wind.speed} km/h`;
    wind_deg.innerHTML = `${deta.wind.deg}°`;
    sunrise.innerHTML = `${new Date(deta.sys.sunrise * 1000).toLocaleTimeString()}`;
    sunset.innerHTML = `${new Date(deta.sys.sunset * 1000).toLocaleTimeString()}`;
    // tz.innerHTML=`${deta.timezone}`;
    // country.innerHTML=`${deta.sys.country}`;
    pressure.innerHTML = `${deta.main.pressure} mb`;
    visibility.innerHTML = `${deta.visibility} m`;
    // haze.innerHTML=`${deta.weather[0].description}`;
    // icon.innerHTML=`${deta.weather[0].icon}`;
    clouds.innerHTML = `${deta.clouds.all}%`;
    icoinfo.innerText = `${deta.weather[0].main}`;
    console.log(deta.weather[0].main);
    ico.innerHTML = `${weatherIcons[deta.weather[0].icon]}`;
    let str = "https://openweathermap.org/city/" + deta.id;
    linkelem = document.getElementById("linkid");
    linkelem.href = str;
    // Get the current date
    const currentDate = new Date();
    // Format the date
    const formattedDate = formatDate(currentDate);
    daydate.innerHTML = (formattedDate); // Output: "30 October 2023"
    foudweatherbyCoord(longitude, latitude);
}
async function getWeather(city) {
    url = apiUrl + city;
    //console.log(apiUrl);
    const response = await fetch(url + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);
    CityName.innerHTML = `${data.name}`;
    temp.innerHTML = `${data.main.temp}°C`;
    temp_min.innerHTML = `${data.main.temp_min}°C`;
    temp_max.innerHTML = `${data.main.temp_max}°C`;
    // feels_like.innerHTML=`${data.main.feels_like}°C`;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind_speed.innerHTML = `${data.wind.speed} km/h`;
    wind_deg.innerHTML = `${data.wind.deg}°`;
    sunrise.innerHTML = `${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
    sunset.innerHTML = `${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
    // tz.innerHTML=`${data.timezone}`;
    // country.innerHTML=`${data.sys.country}`;
    pressure.innerHTML = `${data.main.pressure} mb`;
    visibility.innerHTML = `${data.visibility} m`;
    // haze.innerHTML=`${data.weather[0].description}`;
    // icon.innerHTML=`${data.weather[0].icon}`;
    clouds.innerHTML = `${data.clouds.all}%`;
    icoinfo.innerText = `${data.weather[0].main}`;
    console.log(data.weather[0].main);
    ico.innerHTML = `${weatherIcons[data.weather[0].icon]}`;
    let str = "https://openweathermap.org/city/" + data.id;
    linkelem = document.getElementById("linkid");
    linkelem.href = str;
    // Get the current date
    const currentDate = new Date();
    // Format the date
    const formattedDate = formatDate(currentDate);
    daydate.innerHTML = (formattedDate); // Output: "30 October 2023"
    foudweather(city);
}
const weatherIcons = {
    '01d': '\u2600', // Sunny
    '01n': '\uD83C\uDF11', // Clear night
    '02d': '\uD83C\uDF24', // Partly cloudy day
    '02n': '\uD83C\uDF25', // Partly cloudy night
    '03d': '\uD83C\uDF25', // Cloudy (assuming similar to partly cloudy)
    '03n': '\uD83C\uDF25', // Cloudy (assuming similar to partly cloudy)
    '04d': '\uD83C\uDF27', // Broken clouds
    '04n': '\uD83C\uDF27', // Broken clouds
    '09d': '\uD83C\uDF27', // Shower rain (assuming similar to broken clouds)
    '09n': '\uD83C\uDF27', // Shower rain (assuming similar to broken clouds)
    '10d': '\uD83C\uDF26', // Rain
    '10n': '\uD83C\uDF27', // Rain (assuming similar to broken clouds)
    '11d': '\uD83C\uDF29', // Thunderstorm
    '11n': '\uD83C\uDF29', // Thunderstorm
    '13d': '\uD83C\uDF28', // Snow
    '13n': '\uD83C\uDF28', // Snow
    '50d': '\uD83C\uDF2B', // Mist
    '50n': '\uD83C\uDF2B' // Mist
};
const weatherIconCode = '50d'; // Example weather icon code from your API data
const unicodeIcon = weatherIcons[weatherIconCode];
function formatDate(date) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const formattedDate = `${day} ${months[monthIndex]} ${year}`;
    return formattedDate;
}
async function foudweatherbyCoord(longitude, latitude) {
    url = plainurl + `&lon=${longitude}&lat=${latitude}`;
    //console.log(apiUrl);
    const respondedin = await fetch(url + `&appid=${apiKey}`);
    var detas = await respondedin.json();
    temp2.innerHTML = `${detas.main.temp}°C`;
    humidity2.innerHTML = `${detas.main.humidity}%`;
    wind_speed2.innerHTML = `${detas.wind.speed} km/h`;
    let d = new Date();
    let s = d.getTime();
    let sunr = detas.sys.sunrise;
}
async function foudweather(city) {
    url = apiUrl + city;
    const responsed = await fetch(url + `&appid=${apiKey}`);
    var datas = await responsed.json();
    temp2.innerHTML = `${datas.main.temp}°C`;
    humidity2.innerHTML = `${datas.main.humidity}%`;
    wind_speed2.innerHTML = `${datas.wind.speed} km/h`;
    let d = new Date();
    let s = d.getTime();
    let sunr = datas.sys.sunrise;
}
submit.addEventListener('click', (e) => {
    e.preventDefault();
    //console.log(city.value);
    getWeather(city.value);
})
// getWeather("Delhi");
// getWeatherbyCoord();
cities = {
    1: "Delhi", 2: "Mumbai", 3: "Bangalore", 4: "Chennai", 5: "Kolkata"
}
//console.log(cities[1]);
async function comWeather1() {
    url = apiUrl + "Delhi";
    //console.log(apiUrl);
    const response1 = await fetch(url + `&appid=${apiKey}`);
    var data1 = await response1.json();
    //console.log(data);
    snr1.innerHTML = `${new Date(data1.sys.sunrise * 1000).toLocaleTimeString()}`;
    sns1.innerHTML = `${new Date(data1.sys.sunset * 1000).toLocaleTimeString()}`;
    t1.innerHTML = `${data1.main.temp}°C`;
    tn1.innerHTML = `${data1.main.temp_min}°C`;
    tm1.innerHTML = `${data1.main.temp_max}°C`;
    fl1.innerHTML = `${data1.main.feels_like}°C`;
    h1.innerHTML = `${data1.main.humidity}%`;
    wd1.innerHTML = `${data1.wind.deg}`;
    ws1.innerHTML = `${data1.wind.speed}`;
}
comWeather1();
async function comWeather2() {
    url = apiUrl + "Mumbai";
    //console.log(apiUrl);
    const response2 = await fetch(url + `&appid=${apiKey}`);
    var data2 = await response2.json();
    //console.log(data);
    snr2.innerHTML = `${new Date(data2.sys.sunrise * 1000).toLocaleTimeString()}`;
    sns2.innerHTML = `${new Date(data2.sys.sunset * 1000).toLocaleTimeString()}`;
    t2.innerHTML = `${data2.main.temp}°C`;
    tn2.innerHTML = `${data2.main.temp_min}°C`;
    tm2.innerHTML = `${data2.main.temp_max}°C`;
    fl2.innerHTML = `${data2.main.feels_like}°C`;
    h2.innerHTML = `${data2.main.humidity}%`;
    wd2.innerHTML = `${data2.wind.deg}`;
    ws2.innerHTML = `${data2.wind.speed}`;
    //console.log(data2.main.temp);
}
comWeather2();
async function comWeather3() {
    url = apiUrl + "Bangalore";
    //console.log(apiUrl);
    const response3 = await fetch(url + `&appid=${apiKey}`);
    var data3 = await response3.json();
    //console.log(data);
    snr3.innerHTML = `${new Date(data3.sys.sunrise * 1000).toLocaleTimeString()}`;
    sns3.innerHTML = `${new Date(data3.sys.sunset * 1000).toLocaleTimeString()}`;
    t3.innerHTML = `${data3.main.temp}°C`;
    tn3.innerHTML = `${data3.main.temp_min}°C`;
    tm3.innerHTML = `${data3.main.temp_max}°C`;
    fl3.innerHTML = `${data3.main.feels_like}°C`;
    h3.innerHTML = `${data3.main.humidity}%`;
    wd3.innerHTML = `${data3.wind.deg}`;
    ws3.innerHTML = `${data3.wind.speed}`;
    //console.log(data3.main.temp);
}
comWeather3();
async function comWeather4() {
    url = apiUrl + "Chennai";
    //console.log(apiUrl);
    const response4 = await fetch(url + `&appid=${apiKey}`);
    var data4 = await response4.json();
    //console.log(data);
    snr4.innerHTML = `${new Date(data4.sys.sunrise * 1000).toLocaleTimeString()}`;
    sns4.innerHTML = `${new Date(data4.sys.sunset * 1000).toLocaleTimeString()}`;
    t4.innerHTML = `${data4.main.temp}°C`;
    tn4.innerHTML = `${data4.main.temp_min}°C`;
    tm4.innerHTML = `${data4.main.temp_max}°C`;
    fl4.innerHTML = `${data4.main.feels_like}°C`;
    h4.innerHTML = `${data4.main.humidity}%`;
    wd4.innerHTML = `${data4.wind.deg}`;
    ws4.innerHTML = `${data4.wind.speed}`;
    // console.log(data4.main.temp);
}
comWeather4();
async function comWeather5() {
    url = apiUrl + "Kolkata";
    //console.log(apiUrl);
    const response5 = await fetch(url + `&appid=${apiKey}`);
    var data5 = await response5.json();
    //console.log(data);
    snr5.innerHTML = `${new Date(data5.sys.sunrise * 1000).toLocaleTimeString()}`;
    sns5.innerHTML = `${new Date(data5.sys.sunset * 1000).toLocaleTimeString()}`;
    t5.innerHTML = `${data5.main.temp}°C`;
    tn5.innerHTML = `${data5.main.temp_min}°C`;
    tm5.innerHTML = `${data5.main.temp_max}°C`;
    fl5.innerHTML = `${data5.main.feels_like}°C`;
    h5.innerHTML = `${data5.main.humidity}%`;
    wd5.innerHTML = `${data5.wind.deg}`;
    ws5.innerHTML = `${data5.wind.speed}`;
    // console.log(data5.main.temp);
}
comWeather5();
async function comWeather6() {
    url = apiUrl + "Pune";
    //console.log(apiUrl);
    const response6 = await fetch(url + `&appid=${apiKey}`);
    var data6 = await response6.json();
    //console.log(data);
    snr6.innerHTML = `${new Date(data6.sys.sunrise * 1000).toLocaleTimeString()}`;
    sns6.innerHTML = `${new Date(data6.sys.sunset * 1000).toLocaleTimeString()}`;
    t6.innerHTML = `${data6.main.temp}°C`;
    tn6.innerHTML = `${data6.main.temp_min}°C`;
    tm6.innerHTML = `${data6.main.temp_max}°C`;
    fl6.innerHTML = `${data6.main.feels_like}°C`;
    h6.innerHTML = `${data6.main.humidity}%`;
    wd6.innerHTML = `${data6.wind.deg}`;
    ws6.innerHTML = `${data6.wind.speed}`;
    // console.log(data6.main.temp);
}
comWeather6();
async function comWeather7() {
    url = apiUrl + "Ahmedabad";
    //console.log(apiUrl);
    const response7 = await fetch(url + `&appid=${apiKey}`);
    var data7 = await response7.json();
    //console.log(data);
    snr7.innerHTML = `${new Date(data7.sys.sunrise * 1000).toLocaleTimeString()}`;
    sns7.innerHTML = `${new Date(data7.sys.sunset * 1000).toLocaleTimeString()}`;
    t7.innerHTML = `${data7.main.temp}°C`;
    tn7.innerHTML = `${data7.main.temp_min}°C`;
    tm7.innerHTML = `${data7.main.temp_max}°C`;
    fl7.innerHTML = `${data7.main.feels_like}°C`;
    h7.innerHTML = `${data7.main.humidity}%`;
    wd7.innerHTML = `${data7.wind.deg}`;
    ws7.innerHTML = `${data7.wind.speed}`;
    // console.log(data7.main.temp);
}
comWeather7();
async function comWeather8() {
    url = apiUrl + "jaipur";
    //console.log(apiUrl);
    const response8 = await fetch(url + `&appid=${apiKey}`);
    var data8 = await response8.json();
    //console.log(data);
    snr8.innerHTML = `${new Date(data8.sys.sunrise * 1000).toLocaleTimeString()}`;
    sns8.innerHTML = `${new Date(data8.sys.sunset * 1000).toLocaleTimeString()}`;
    t8.innerHTML = `${data8.main.temp}°C`;
    tn8.innerHTML = `${data8.main.temp_min}°C`;
    tm8.innerHTML = `${data8.main.temp_max}°C`;
    fl8.innerHTML = `${data8.main.feels_like}°C`;
    h8.innerHTML = `${data8.main.humidity}%`;
    wd8.innerHTML = `${data8.wind.deg}`;
    ws8.innerHTML = `${data8.wind.speed}`;
    // console.log(data8.main.temp);
}
comWeather8();
