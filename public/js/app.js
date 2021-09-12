

const weatherForm = document.querySelector('form') // the form label in the html file index.hbs
const search = document.querySelector('input') // the form label in the html file index.hbs
const messageOne = document.querySelector('#message-1') 
const messageTwo = document.querySelector('#message-2')
// when we want to attach the html element for a label we use multiple times, as <p> 
// we will use an id in the html and call that element in the javaScript by metioning
// it's id. the call will start with # and the id name.

// messageOne.textContent = 'From javaScript'

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault() //the browser is not refreshed when clicking on search button.
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent=data.error
            } else {
                messageOne.textContent=data.location
                messageTwo.textContent=('The weather is '+data.forecast.weather+
                ', when the temperature is '+data.forecast.temperature+' degrees, but it feels like '+
                data.forecast.feelslike+' degrees')
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
    

    console.log(location)
})