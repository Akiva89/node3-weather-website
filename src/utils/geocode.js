const request= require('request')

/* address is an argument that geocode function receives, while callback is an argumet
 that states that the function is waiting for a call back with structure of (error,data)
 the call back parameters may be different, it's according to the order of fields coming
 back from the call back.
*/
const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWtpdmE4OSIsImEiOiJja3Q3azhpOGEwdDd0Mm9wZXFscmNwbGduIn0.O7fpx-UgLnHsqEwu98UmCw'

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services',undefined)
        } else if (response.body.features.length===0) {
            callback('Unable to find location, try another search',undefined)
        } else {
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
