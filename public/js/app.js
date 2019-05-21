const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = search.value;
    message1.textContent = 'Loading...';
    message2.textContent = '';

    fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            message1.textContent = data.error;
        } else {
            message1.textContent = 'Location:' + data.location;
            message2.textContent = `It is ${data.forecast.summary} today. The temperature is ${data.forecast.temperature} outside and ${data.forecast.precipProbability} chance of precipitation`
        }
    });
}); 

})