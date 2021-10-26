console.log('client side js' )

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageSecond = document.querySelector('#message-2')

//messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value

    messageOne.textContent = 'Loading...'
    messageSecond.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            //console.log('Error: ' + data.error)
            messageOne.textContent = data.error
        } else {
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent = data.location
            messageSecond.textContent = data.forecast
            
        }
    })
})
})