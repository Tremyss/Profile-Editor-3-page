// const { log } = require("console");

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

window.onload=function(){
    const FormE = document.querySelector("#testForm");
    
    FormE.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(FormE);
        console.log(formData.get('username'));

        /* formData.set('username') // overrides what user wrote
        formData.delete('username') // delete value
        formData.append('username') // append smg to formData */

        // todo Lets create a json object out of formData
        // todo first we creat a normal JS object out of all the data
        // todo then we use fetch API to stringify it to json
        const testData = Object.fromEntries(formData)
        console.log(testData);

        fetch('127.0.0.1:9000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });
    });
}


