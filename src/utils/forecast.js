const axios = require('axios')

const forecast = (address = auckland) => {
    const api_url = 'http://api.weatherstack.com/current';
    const map_box_key = 'pk.eyJ1IjoidGlncmlsbG8zMzMiLCJhIjoiY2t4bzdicTR1M3BiOTJ2b2thenN5NjlmMSJ9.t4wo89e-MH1KyWhXIhfMDQ';

    const find_place_coords_promise = () => {
        return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${map_box_key}&limit=1`);
    }

    const get_weather_promise = (coords) => {
        const position = coords.features[0].place_name;

        const params = {
            access_key: 'ba5725fa823e094d170c09c99b0b0700',
            query: `${position}`,
            unit: 'm',
        }

        return axios.get(api_url, {params});
    }

    return find_place_coords_promise().then(resp => get_weather_promise(resp.data)).catch(err => {
        console.log('Unable to find location')
    }).then(resp => {
        const weather_data = resp.data;
        //console.log(resp.data);
        return {
            temp: weather_data.current.temperature,
            description: weather_data.current.weather_descriptions[0],
            probability: weather_data.current.precip,
            feels: weather_data.current.feelslike,
            image: weather_data.current.weather_icons[0]
        }
    }).catch(err => {
        console.log(err);
    });
}

module.exports = forecast
