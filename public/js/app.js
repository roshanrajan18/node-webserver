console.log("Client side script has been loaded")

const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    messageOne.textContent = 'Loading.....'
    messageTwo.textContent = ''

    fetchforecast(searchLocation.value)
})

const fetchforecast = (location) => fetch('http://localhost:3000/weather?address=' + encodeURI(location)).then((response => {
    response.json().then((data) => {
        if (data.error) {
            if (data.error.errorMessage) {
                messageOne.textContent = data.error.errorMessage
            } else {
                messageOne.textContent = data.error
            }
        } else {
            messageOne.textContent = data.Location
            messageTwo.textContent = data.Current_Forecast
        }
    })
    })
)