// const requestURL = 'https://jsonplaceholder.typicode.com/posts';
const requestURL = './php/action.php';

let formData = new FormData();
formData.append('id', '5');
formData.append('title', 'try');
formData.append('body', 'Som one');
formData.append('userId', '5');


fetch(requestURL, {
    method: 'POST',
    body: formData,
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
})
    .then(function (response) {
        console.log(response.status)
        return response.json()
    }).then((json) => console.log(json));

fetch(requestURL)
    .then(function (response) {
        console.log(response.status)
        return response.json()
    }).then(function (json) { console.log(json) });

export { requestURL };