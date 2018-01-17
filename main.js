(function($)  {
    
    var dom;
    
    //setting up temperature variables
    var temperatures = {
    fahrenheit : '',
    fahrenheitD1 : '',
    fahrenheitD2 : '',
    fahrenheitD3 : '',
    fahrenheitD4 : '',
    celsius : '',
    celsius1 : '',
    celsius2 : '',
    celsius3 : '',
    celsius4: '',
    convertTempToCelsius: function (){
        var fahrenheit = parseInt(this.fahrenheit);
        return Math.round(((fahrenheit) - 32) * (5/9)) + "°C";
    }
  };
  
    //loading cities from JSON file
    /*var loadCities = function() {
        $.getJSON("city.list.json", requestForecast );
    };*/
    
    //load forecase based on user input
    var requestForecast = function(e) {
//        if (e.which === 13 || e.type === 'click') {
//        console.log(dom.searchText[0].value);
        var q = dom.searchText[0].value;
        let api = 'https://api.openweathermap.org/data/2.5/forecast?q=' + q + '&appid=4d8b02dd6a0915262d9f1d723f477f27&units=imperial'; 
            $.ajax({
                method:"GET",
                url: api,
                cache: false,
                datatype: "json"
            }).then(function(data)    {
                    dom.city.html(data.city.name);
        //getting dates from api call
                console.log(data);
                    let d1 = new Date(data.list[8].dt_txt);
                    let d2 = new Date(data.list[16].dt_txt);
                    let d3 = new Date(data.list[24].dt_txt);
                    let d4 = new Date(data.list[32].dt_txt);
                //creating fahrenheit temp variable
                    temperatures.fahrenheit = Math.round(data.list[0].main.temp)+ "°F";
                    temperatures.fahrenheitD1 = Math.round(data.list[8].main.temp)+ "°F";
                    temperatures.fahrenheitD2 = Math.round(data.list[16].main.temp)+ "°F";
                    temperatures.fahrenheitD3 = Math.round(data.list[24].main.temp)+ "°F";
                    temperatures.fahrenheitD4 = Math.round(data.list[32].main.temp)+ "°F";
//                    console.log(data.list[0].weather[0].main);
                //populating HTML with data from ajax call
                    dom.temp.html(temperatures.fahrenheit);
                    dom.wthr.html(data.list[0].weather[0].main); 
                    dom.humidity.html(data.list[0].main.humidity + '%');
                    dom.wind.html(Math.round(data.list[0].wind.speed) + ' mph');
                    dom.icon.css({"display": "none"});
                    if (data.list[0].weather[0].main == "Clouds") {
                      dom.clouds.css({"display": "block"})
                    } else if (data.list[0].weather[0].main == "Rain" || data.list[0].weather[0].main == "Mist") {
                      dom.rain.css({"display": "block"})
                    } else if (data.list[0].weather[0].main == "Clear") {
                      dom.sunny.css({"display": "block"});
                    }

                    dom.day1.html(d1.toString().slice(0,3));
                    dom.day1Temp.html(temperatures.fahrenheitD1);
                    dom.day1Wthr.html(data.list[8].weather[0].main);

                    dom.day2.html(d2.toString().slice(0,3));
                    dom.day2Temp.html(temperatures.fahrenheitD2);
                    dom.day2Wthr.html(data.list[16].weather[0].main);

                    dom.day3.html(d3.toString().slice(0,3));
                    dom.day3Temp.html(temperatures.fahrenheitD3);
                    dom.day3Wthr.html(data.list[24].weather[0].main);

                    dom.day4.html(d4.toString().slice(0,3));
                    dom.day4Temp.html(temperatures.fahrenheitD4);
                    dom.day4Wthr.html(data.list[32].weather[0].main);
              }); 
            dom.searchText[0].value = '';
        
//        }
    }
    //initialize the module
    var init = function() {
    cacheDom();
    bindHandlers();
  };
    
    //binding event handlers
    var bindHandlers = function() {
        dom.button.on('click', convertTemp);
        dom.searchButton.on('click keypress', requestForecast);
        dom.searchText.on('keydown', onEnterRequestForecast);
  };
    var onEnterRequestForecast = function(e){
        if (e.which === 13){
            requestForecast();
        }
    }
  
    //caching the DOM
    var cacheDom = function() {
    dom = {};
    dom.container = $(".main_container");
    dom.city = dom.container.find('.city');
    dom.wthr = dom.container.find('.wthr');
    dom.temp = dom.container.find('.temp');
    dom.icon = dom.container.find('.icon');
    dom.searchText = dom.container.find('.location-search_text');
    dom.searchButton = dom.container.find('.location-search_button');
    dom.button = dom.container.find('.convert__button'); 
    dom.clouds = dom.container.find('.cloudy');
    dom.rain = dom.container.find('.rainy');
    dom.sunny = dom.container.find('.sunny');
    dom.humidity = dom.container.find('.humidity');
    dom.wind = dom.container.find('.wind');
    dom.day1 = dom.container.find('.day1');
    dom.day1Temp = dom.container.find('.day1-temp');
    dom.day1Wthr = dom.container.find('.day1-weather');
    dom.day2 = dom.container.find('.day2');
    dom.day2Temp = dom.container.find('.day2-temp');
    dom.day2Wthr = dom.container.find('.day2-weather');
    dom.day3 = dom.container.find('.day3');
    dom.day3Temp = dom.container.find('.day3-temp');
    dom.day3Wthr = dom.container.find('.day3-weather');
    dom.day4 = dom.container.find('.day4');
    dom.day4Temp = dom.container.find('.day4-temp');
    dom.day4Wthr = dom.container.find('.day4-weather');
  };

    
    //getting location from user
    if (navigator.geolocation)  { 
        navigator.geolocation.getCurrentPosition(function(position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let api = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=4d8b02dd6a0915262d9f1d723f477f27&units=imperial'; 
            $.ajax({
                method:"GET",
                url: api,
                cache: false,
                datatype: "json"
          
    //populating HTML with data from ajax call
      }).then(function(data)    {
        dom.city.html(data.city.name);
    //getting dates from api call
        let d1 = new Date(data.list[8].dt_txt);
        let d2 = new Date(data.list[16].dt_txt);
        let d3 = new Date(data.list[24].dt_txt);
        let d4 = new Date(data.list[32].dt_txt);
    //creating fahrenheit temp variable
        temperatures.fahrenheit = Math.round(data.list[0].main.temp)+ "°F";
        temperatures.fahrenheitD1 = Math.round(data.list[8].main.temp)+ "°F";
        temperatures.fahrenheitD2 = Math.round(data.list[16].main.temp)+ "°F";
        temperatures.fahrenheitD3 = Math.round(data.list[24].main.temp)+ "°F";
        temperatures.fahrenheitD4 = Math.round(data.list[32].main.temp)+ "°F";
    //creating description variable 
        let description = data.list[0].weather[0].main;
    //populating HTML with data from ajax call
        dom.temp.html(temperatures.fahrenheit);
        dom.wthr.html(description); 
        dom.humidity.html(data.list[0].main.humidity + '%');
        dom.wind.html(Math.round(data.list[0].wind.speed) + ' mph');
          
        if (dom.wthr[0].textContent == "Clouds") {
          dom.clouds.css({"display": "block"})
        } else if (dom.wthr[0].textContent == "Rain" || dom.wthr[0].textContent == "Mist") {
          dom.rain.css({"display": "block"})
        } else if (dom.wthr[0].textContent == "Clear") {
          dom.sunny.css({"display": "block"});
        }
          
        dom.day1.html(d1.toString().slice(0,3));
        dom.day1Temp.html(temperatures.fahrenheitD1);
        dom.day1Wthr.html(data.list[8].weather[0].main);
          
        dom.day2.html(d2.toString().slice(0,3));
        dom.day2Temp.html(temperatures.fahrenheitD2);
        dom.day2Wthr.html(data.list[16].weather[0].main);
          
        dom.day3.html(d3.toString().slice(0,3));
        dom.day3Temp.html(temperatures.fahrenheitD3);
        dom.day3Wthr.html(data.list[24].weather[0].main);
          
        dom.day4.html(d4.toString().slice(0,3));
        dom.day4Temp.html(temperatures.fahrenheitD4);
        dom.day4Wthr.html(data.list[32].weather[0].main);
      });
  }); 

 
    
    var convertTemp = function()  {
      if(dom.temp[0].innerHTML == temperatures.fahrenheit || dom.day1Temp.html == temperatures.fahrenheitD1 || dom.day2Temp.html == temperatures.fahrenheitD2 || dom.day3Temp.html == temperatures.fahrenheitD3 || dom.day4Temp.html == temperatures.fahrenheitD4) {
            dom.temp.html(temperatures.convertTempToCelsius())
//            console.log(Math.round((parseInt(dom.day1Temp[0].textContent) - 32) * (5/9)) + "°C");
            dom.day1Temp.html(temperatures.convertTempToCelsius());
            dom.day2Temp.html(Math.round((parseInt(dom.day2Temp[0].textContent) - 32) * (5/9)) + "°C");
            dom.day3Temp.html(Math.round((parseInt(dom.day3Temp[0].textContent) - 32) * (5/9)) + "°C");
            dom.day4Temp.html(Math.round((parseInt(dom.day4Temp[0].textContent) - 32) * (5/9)) + "°C");
      } else {
          dom.temp.html(temperatures.fahrenheit);
          dom.day1Temp.html(temperatures.fahrenheitD1);
          dom.day2Temp.html(temperatures.fahrenheitD2);
          dom.day3Temp.html(temperatures.fahrenheitD3);
          dom.day4Temp.html(temperatures.fahrenheitD4);;
      }
    };
  
  init();
     
  }  
})(jQuery);
