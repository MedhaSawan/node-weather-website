const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //const url = 'http://api.weatherstack.com/current?access_key=cd45e359e6f38eeb9ec7b2b677a05c00&query=37.8267,-122.4233'
    const url = 'http://api.weatherstack.com/current?access_key=cd45e359e6f38eeb9ec7b2b677a05c00&query=' + latitude + ',' + longitude
    // console.log(url)
    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)   
        } else {
            callback(undefined, body.current.weather_descriptions[0]+ '. It is ' + body.current.temperature + ' degree here. It feels like ' + body.current.feelslike + ' degree.')

        }
        
    })
    
}

module.exports = forecast