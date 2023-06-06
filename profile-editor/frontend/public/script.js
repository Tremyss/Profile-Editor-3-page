// ? Collects the form data and saves it on the backend in the profile.json

window.onload = function () {
    const FormE = document.querySelector("#testForm");

    FormE.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(FormE);

        // todo Lets create a json object out of formData. First we create a normal JS object out of all the data, then we use fetch API to stringify it to json
        const testData = Object.fromEntries(formData)
        console.log(testData);

        fetch('http://127.0.0.1:9000', {
            // * a fetch-be kell a http vagy https!!!
            method: 'POST',
            // ? default method is GET, if you just getting data you don't need to specify this.
            headers: {
                // ? the server needs to know what format it will be:
                'Content-Type': 'application/json'
            },
            // ? the actual data we want to send:
            body: JSON.stringify(testData)
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                const jsonData = JSON.stringify(data);
                const fs = require('fs');
                fs.writeFile('profile.json', jsonData, (err) => {
                    if (err) throw err;
                    console.log('JSON data saved to file');
                });
            })
            .catch(error => console.log(error))
    });
}

// ? saves the uploaded file and store it in the profile.jpg

function uploadImage() {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];

    if (!file) {
        console.log('No file selected');
        return;
    }

    const formData = new FormData();
    formData.append('profileImage', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to upload image');
            }
            console.log('Image uploaded successfully');
            // Perform any necessary actions after successful image upload
        })
        .catch(error => {
            console.error('Error uploading image:', error);
            // Handle the error appropriately
        });
}


// ! code above not working
/* script.js:83     POST http://127.0.0.1:9000/upload 404 (Not Found)
uploadImage @ script.js:83
onclick @ (index):217
script.js:95 Error uploading image: Error: Failed to upload image
    at script.js:89:23 */

// ? fetches the profile.jpg from the backend and shows it's as a preview
/* 
const imageUrl = 'http://127.0.0.1:9000/profile.jpg';
const imgElement = document.getElementById('imagePreview');

fetch(imageUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }
        return response.blob();
    })
    .then(blob => {
        const objectURL = URL.createObjectURL(blob);
        imgElement.src = objectURL;
    })
    .catch(error => {
        console.error('Error fetching image:', error);
        // Handle the error appropriately, e.g., show a fallback image or display an error message
    });
console.log(imgElement);
 */


