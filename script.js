var state;

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
            temperature: data.main.temp,
            unit: 'C'
        }
        callback();
    });
}

function renderWeatherData() {
    var imgUrl = 'http://openweathermap.org/img/w/' + state.image + '.png';
    $('.weather-icon').html(`<img src="${imgUrl}">`);
    $('.location').text(state.location);
    $('.description').text(state.description);
    $('.temperature').html(state.temperature + '&deg; ' + state.unit);
}

getWeatherData('chennai', renderWeatherData);