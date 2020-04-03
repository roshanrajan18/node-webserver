console.log("Client side script has been loaded")

const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    messageOne.textContent = 'Loading.....'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''


    fetchforecast(searchLocation.value)
})

const fetchforecast = (location) => fetch('/weather?address=' + encodeURI(location)).then((response => {
    response.json().then((data) => {
        if (data.error) {
            if (data.error.errorMessage) {
                messageOne.textContent = data.error.errorMessage
            } else {
                messageOne.textContent = data.error
            }
        } else {
            let temperatureFaranheit = data.Temperature
            let feelsLikeFaranheit = data.Feels_Like

            let temperatureCelcius = (5/9) * (temperatureFaranheit - 32)
            let feelsLikeCelcius = (5/9) * (feelsLikeFaranheit - 32)

            temperatureCelcius = (Math.round(temperatureCelcius * 100) / 100).toFixed(2)
            temperatureFaranheit = (Math.round(temperatureFaranheit * 100) / 100).toFixed(2)

            feelsLikeCelcius = (Math.round(feelsLikeCelcius * 100) / 100).toFixed(2)
            feelsLikeFaranheit = (Math.round(feelsLikeFaranheit * 100) / 100).toFixed(2)

            messageOne.textContent = data.Location
            messageTwo.textContent = data.Current_Forecast
            messageThree.textContent = "Current Air Temperature is " + temperatureFaranheit + " F " + " or " + temperatureCelcius + " C"
            messageFour.textContent = "Feels like " + feelsLikeFaranheit + " F " + " or " + feelsLikeCelcius + " C"
        }
    })
    })
)