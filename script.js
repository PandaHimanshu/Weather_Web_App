const apikey = "22366f4c45144186e611d0602281ba0b"
// const apiLatLong="https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"
const apiurlCity = "https://api.openweathermap.org/data/2.5/weather?appid=22366f4c45144186e611d0602281ba0b&units=metric&q="

const searchbox = document.querySelector(".search-box")
const searchicon = document.querySelector(".search-icon")
const weathericon = document.querySelector(".weather-png")

function getLocation(position){
    console.log(position)
    let latitude=position.coords.latitude
    let longitude=position.coords.longitude
    console.log(longitude,latitude)

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`)
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data)
        document.querySelector(".city").innerHTML=data.name
        checkWeather(data.name)
    })
    
}
function FailedToLocate(){
    console.log("failed to locate")
}
document.addEventListener('DOMContentLoaded',async()=>{
    navigator.geolocation.getCurrentPosition(getLocation,FailedToLocate)
})


async function checkWeather(city) {
    const response = await fetch(apiurlCity + city)
    let data = await response.json()
    console.log(data)
    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C"
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"

    if (data.weather[0].main == "Clouds") {
        weathericon.src = "images/clouds.png"
    }
    else if (data.weather[0].main == "Clear") {
        weathericon.src = "images/clear.png"
    }
    else if (data.weather[0].main == "Drizzle") {
        weathericon.src = "images/drizzle.png"
    }
    else if (data.weather[0].main == "Mist") {
        weathericon.src = "images/mist.png"
    }
    else if (data.weather[0].main == "Rain") {
        weathericon.src = "images/rain.png"
    }
    else if (data.weather[0].main == "Snow") {
        weathericon.src = "images/snow.png"
    }
}
searchicon.addEventListener("click", () => {
    checkWeather(searchbox.value)
})
