// const { log } = require("console");

// const { profile } = require("console");

// todo addeventlistenerrel figyeljük a kattintást. 
// todo ha megtörténik, kiolvassuk a mezők értékeit, 
// todo elmentjük egy json fileba
// todo 

/* let firstNameInput = document.querySelector("#firstName");
const readFirstName = () => {
    console.log(firstNameInput.value);
    let firstNameTyped = firstNameInput.value;
}
firstNameInput.addEventListener("input", readFirstName);
 */

/* const FormElement = document.querySelector(".form");

FormElement.addEventListener('submit', (event) => {
    event.preventDefault();
}); */

window.onload = function () {
    const FormE = document.querySelector("#testForm");

    FormE.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(FormE);
        // console.log(formData.get('username'));

        /* formData.set('username') // overrides what user wrote
        formData.delete('username') // delete value
        formData.append('username') // append smg to formData */

        // todo Lets create a json object out of formData
        // todo first we create a normal JS object out of all the data
        // todo then we use fetch API to stringify it to json
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
// * most már elmegy az adat de még el kell menteni profile.json file-ba


