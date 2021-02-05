window.onload = function () {
  document.querySelector(".wrapper").style.marginTop= '"' + (document.documentElement.clientWidth/5) + 'px"';
  //DATE AND TIME//
  //Converted into days, months, hours, day-name, AM/PM
  var dt = new Date();
  var days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  document.querySelector("#day").innerHTML = days[dt.getDay()];
  var months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  document.querySelector("#date").innerHTML = months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();
  document.querySelector("#time").innerHTML = dt.getHours() + ":" + dt.getMinutes();

  //CELSIUS TO FAHRENHEIT CONVERTER on Click
  var temp = 0;
  document.querySelector("#fahrenheit").click(function () {
    this.style.color = "white";
    document.querySelector("#celsius").css("color", "#b0bec5");
    document.querySelector("#temperature").innerHTML = Math.round(temp * 1.8 + 32);
  });

  document.querySelector("#celsius").click(function () {
    this.style.color = "white";
    document.querySelector("#fahrenheit").style.color = "#b0bec5";
    document.querySelector("#temperature").innerHTML = Math.round(temp);
  });

  //GEOLOCATION and WEATHER API//
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var myLatitude = parseFloat(
        Math.round(position.coords.latitude * 100) / 100
      ).toFixed(2);
      var myLongitude = parseFloat(
        Math.round(position.coords.longitude * 100) / 100
      ).toFixed(2);
      //var utcTime = Math.round(new Date().getTime()/1000.0);

      // $('.geo').innerHTML(position.coords.latitude + " " + position.coords.longitude);
      var requestURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + myLatitude + "&lon=" + myLongitude + "&id=524901&appid=ca8c2c7970a09dc296d9b3cfc4d06940&lang=ru";
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            var json = request.response;
            document.querySelector("#city").innerHTML = json.name + ", " + json.sys.country;
            document.querySelector("#weather-status").innerHTML = 
            json.weather[0].main + " / " + json.weather[0].description;

          //WEATHER CONDITIONS FOUND HERE: http://openweathermap.org/weather-conditions
          switch (json.weather[0].main) {
            case "Облачно":
                document.querySelector(".weather-icon").setAttribute(
                "src",
                "https://myleschuahiock.files.wordpress.com/2016/02/cloudy.png"
              );
              break;
            case "Ясно":
                document.querySelector(".weather-icon").setAttribute(
                "src",
                "https://myleschuahiock.files.wordpress.com/2016/02/sunny2.png"
              );
              break;
            case "Thunderstorm":
                document.querySelector(".weather-icon").setAttribute(
                "src",
                "https://myleschuahiock.files.wordpress.com/2016/02/thunderstorm.png"
              );
              break;
            case "Drizzle":
                document.querySelector(".weather-icon").setAttribute(
                "src",
                "https://myleschuahiock.files.wordpress.com/2016/02/drizzle.png"
              );
              break;
            case "Дождь":
                document.querySelector(".weather-icon").setAttribute(
                "src",
                "https://myleschuahiock.files.wordpress.com/2016/02/rain.png"
              );
              break;
            case "Снег":
                document.querySelector(".weather-icon").setAttribute(
                "src",
                "https://myleschuahiock.files.wordpress.com/2016/02/snow.png"
              );
              break;
            case "Extreme":
                querySelector(".weather-icon").setAttribute(
                "src",
                "https://myleschuahiock.files.wordpress.com/2016/02/warning.png"
              );
              break;
          }
          temp = json.main.temp - 273;
          document.querySelector("#temperature").innerHTML = Math.round(temp);
          document.querySelector(".windspeed").innerHTML = json.wind.speed + " м/с";
          document.querySelector(".humidity").innerHTML = json.main.humidity + " %";
          document.querySelector(".pressure").innerHTML = json.main.pressure + " гПа";
          var sunriseUTC = json.sys.sunrise * 1000;
          var sunsetUTC = json.sys.sunset * 1000;
          var sunriseDt = new Date(sunriseUTC);
          var sunsetDt = new Date(sunsetUTC);
          document.querySelector(".sunrise-time").innerHTML = 
            (sunriseDt.getHours() > 12
              ? sunriseDt.getHours() - 12
              : sunriseDt.getHours()
            ).toString() +
              ":" +
              ((sunriseDt.getMinutes() < 10 ? "0" : "").toString() +
                sunriseDt.getMinutes().toString()) +
              (sunriseDt.getHours() < 12 ? " AM" : " PM").toString();
              document.querySelector(".sunset-time").innerHTML = 
            (sunsetDt.getHours() > 12
              ? sunsetDt.getHours() - 12
              : sunsetDt.getHours()
            ).toString() +
              ":" +
              ((sunsetDt.getMinutes() < 10 ? "0" : "").toString() +
                sunsetDt.getMinutes().toString()) +
              (sunsetDt.getHours() < 12 ? " AM" : " PM").toString();
          // $('.sunrise-time').innerHTML(json.sys.sunrise);
          //$('.sunset-time').innerHTML(json.sys.sunset);
          }
    });
  } else {
    document.querySelector("#city").innerHTML("Пожалуйста, включите Геолокатор в браузере.");
  }
};
