const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode= require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

console.log(__dirname)
console.log(path.join(__dirname , '../public'))


const app = express()
// define paths for Express config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setups handlebars engine and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static direcoty to use
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Akiva Adam'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title:'About me',
        name: 'Akiva Adam'
    })
})

app.get('/help' , (req,res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Help instructions',
        name: 'Akiva Adam'
    })
})

app.get('/help/*' , (req,res) => {
    res.render('404',{
        title: '404 help',
        name: 'Akiva Adam',
        errorMessage: 'Help article not found'
    })})


app.get('/weather', (req , res)=> {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address!'
        })
    } else {
        geocode(req.query.address,(error,{latitude,longitude, location}={}) => {
            if (error){
                return res.send({error})
            } 
            forecast(latitude,longitude,(error,forecastData)=> {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                })
            })
        })    
    }

})

app.get('/products', (req,res)=> {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term!'
        })
    }
// we can use } else {} instead, but using return in the if statement is a commom practice in express

    console.log(req.query.search) 
    res.send({
        products:[]
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        title: '404',
        name: 'Akiva Adam',
        errorMessage: 'This is a 404 page!'
    })
})

app.listen(3000 , () => {
    console.log('server is up on port 3000')
})