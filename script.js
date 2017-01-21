var state;
var $weatherIcon = $('.weather-icon');
var $location = $('.location');
var $description = $('.description');
var $temperature = $('.temperature');
var $unit = $('.unit');

function getWeatherData(city, callback) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
    $.ajax({
        url: apiUrl,
        data: {
            q: city, 
            units: 'metric',
            appid: '7b81df642bd1365871e88764d2d1cb66'
        }
    }).then(function(data) {
        state = {
            image: data.weather[0].icon,
            location: data.name + ', ' + data.sys.country,
            description: data.weather[0].description,
            temperature: Math.round(data.main.temp),
            unit: 'C'
        }
        callback();
    });
}

function renderWeatherData() {
    var imgUrl = 'http://openweathermap.org/img/w/' + state.image + '.png';
    $weatherIcon.html(`<img src="${imgUrl}">`);
    $location.text(state.location);
    $description.text(state.description);
    $temperature.html(state.temperature + '&deg; ');
    $unit.text(state.unit);
}

getWeatherData('chennai', renderWeatherData);

$unit.on('click', function() {
   if (state.unit == 'C') {
       state.temperature = Math.round(state.temperature * 1.8 + 32);
       state.unit = 'F';
   } else {
       state.temperature = Math.round((state.temperature - 32) / 1.8);
       state.unit = 'C';
   }
   $temperature.html(state.temperature + '&deg; ');
   $unit.text(state.unit);
});