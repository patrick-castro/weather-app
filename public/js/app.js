console.log('js/app.js is working!');

// Initialize client-side components
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgLocation = document.querySelector('#msg-location');
const msgStatus = document.querySelector('#msg-status');
const msgTemp = document.querySelector('#msg-temp');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // So that output won't immediately gets removed after loading

    const location = search.value;
    msgLocation.textContent = 'Loading...';
    msgStatus.textContent = '';
    msgTemp.textContent = '';

    // Fetches the weather json data then display it in the index page
    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (!data.error) {
                msgLocation.textContent = data.location;
                msgStatus.textContent = data.status;
                msgTemp.textContent = data.message;
            } else {
                msgLocation.textContent = data.error;
                msgStatus.textContent = '';
                msgTemp.textContent = '';
            }
        });
    });
});
