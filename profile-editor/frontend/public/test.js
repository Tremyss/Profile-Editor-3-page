// ! THIS IS A CODE DUMP FILE NOT LINKED TO ANYWHERE

window.onload = function () {
    const FormE = document.querySelector("#testForm");

    FormE.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(FormE);
        const testData = Object.fromEntries(formData)
        console.log(testData);

        fetch('http://127.0.0.1:9000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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

window.onload = function () {
    const FormE = document.querySelector("#testForm");

    FormE.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(FormE);
        const testData = Object.fromEntries(formData)
        console.log(testData);

        fetch('http://127.0.0.1:9000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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