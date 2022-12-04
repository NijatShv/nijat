let weather = {
    apiKey:"4efed280b0fcf3f86060f291be2c67c4",
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
        .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    fetchCords: function(lat, lon){
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.switchCordToCity(data) & this.geolocationToCCA2(data));
    },

    fetchCountry: function(city){
        fetch("https://restcountries.com/v3.1/capital/" + city + "")
            .then((response) => response.json())
            .then((data) => this.displayCountry(data));
    },
// 
    geolocationToCCA2: function(data){
        const { country } = data.sys;
        console.log(country);
        fetch("https://restcountries.com/v3.1/alpha/" + country + "")
            .then((response) => response.json())
            .then((data) => this.geolocationToCountry(data));
    },

    
// 
    switchCordToCity: function(data){
        const { name } = data;
        city = name;
        this.fetchWeather(city);
    },

    displayCountry: function(data){
        const {status} = data;
        if(status == 404){
            document.querySelector(".flag-icon").remove();
            document.querySelector(".country").remove();
        } else {
        const { official } = data[0].name;
        const { png } = data[0].flags;
        document.querySelector(".flag-icon").innerHTML = '<img src="' + png + '" alt=""></img>';
        document.querySelector(".country").innerText = "Country: " + official;
        }
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
        const { temp, min, max, pressure, feels_like, humidity} = data.main;
        const {speed, deg  } = data.wind;
        // date = new Date(dt * 1000);
        // dateFormat= new Date(date);
        console.log(name,description,main,temp, temp_min, temp_max, pressure, feels_like, humidity,speed,deg)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".description").innerText = description;
        // document.querySelector(".main-weather").innerText = "General: " + main;
        document.querySelector(".temp-min-max").innerText = "Min:  " + temp_min + "°C / Max: " + temp_max + "°C";
        document.querySelector(".feels-like").innerText = "Feels like: " + feels_like + "°C";
        document.querySelector(".humidity").innerText ="Humidity: " + humidity + "%";
        document.querySelector(".pressure").innerText = "Pressure: " + pressure + "mbar";
        document.querySelector(".wind").innerText ="Wind speed: " + speed + "m/s";
        document.querySelector(".wind-direction").innerText = "Wind Direction: " + deg + "° (" + this.degToCompass(deg) + ")";   
        // document.querySelector(".date").innerText = "Date: "+ dateFormat.getDate()+"/"+(dateFormat.getMonth()+1)+"/"+dateFormat.getFullYear()+" "+dateFormat.getHours()+":"+dateFormat.getMinutes()+":"+dateFormat.getSeconds();
        },
    search: function (){
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        weather.search();
    }
});
weather.fetchWeather("Baku");