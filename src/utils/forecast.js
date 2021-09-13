const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url='http://api.weatherstack.com/current?access_key=12b04ecfcafe7ea20c03ba39ae061d44&query='+latitude+','+longitude
    /* error and reponse are the callbacks from request function in the request library */
    request({url:url , json: true}, (error,response) => {
        if (error) {
            callback('Unable to connect to the service!',undefined)
        } else if (response.body.error) {
            callback('The values in the request are not specified correctly!',undefined)
        } else {
            callback(undefined,{
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                weather: response.body.current.weather_descriptions[0]

            })
        }
    })
}

module.exports = forecast