let weather = {
    apiKey:"4efed280b0fcf3f86060f291be2c67c4",
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+this.apiKey).then((response) => response.json()).then((data) => this.displayWeather(data));
    },
    fetchCords: function(lat, lon){
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+this.apiKey).then((response) => response.json()).then((data) => this.switchCordToCity(data) & this.geolocationToCCA2(data));
    },

    fetchCountry: function(city){
        fetch("https://restcountries.com/v3.1/capital/"+city+"").then((response) => response.json()).then((data) => this.displayCountry(data));
    },

    geolocationToCCA2: function(data){
        const { country } = data.sys;
        console.log(country);
        fetch("https://restcountries.com/v3.1/alpha/"+country+"").then((response) => response.json()).then((data) => this.geolocationToCountry(data));
    },

    

    switchCordToCity: function(data){
        const { name } = data;
        city = name;
        this.fetchWeather(city);
    },
    
    degToCompass: function(num){
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        direction = arr[(val % 16)];
        return direction;
    },
    displayWeather: function(data){
        const { name } = data;
        const {description,main } = data.weather[0];
        const { temp, temp_min, temp_max, pressure, feels_like, humidity} = data.main;
        const {speed, deg  } = data.wind;
        console.log(name,description,main,temp, temp_min, temp_max, pressure, feels_like, humidity,speed,deg)
        document.querySelector(".city").innerText =name;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".description").innerText = "Description: "+ description;
        document.querySelector(".temp-min-max").innerText = "Minimum :  " + temp_min + "°C / Maximum: " + temp_max + "°C";
        document.querySelector(".feels-like").innerText = "Feels like: " + feels_like + "°C";
        document.querySelector(".humidity").innerText ="Humidity: " + humidity + "%";
        document.querySelector(".pressure").innerText = "Pressure: " + pressure + "mbar";
        document.querySelector(".wind").innerText ="Wind speed: " + speed + "m/s";
        document.querySelector(".wind-direction").innerText = "Wind Direction: " + deg + "° (" + this.degToCompass(deg) + ")";   
        

        },
    search: function (){
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        weather.search();
    }
});
weather.fetchWeather("America");