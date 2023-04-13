// const requestURL = 'https://jsonplaceholder.typicode.com/posts';
const requestURL = './action.php';

fetch(requestURL, {
    method: 'POST',
    body: {
        name: 'Tolya',
        mail: 'maximos225@mail.ru',
        number: 9854687651,
    },
    headers: {
        'Content-type': 'multipart/form-data; charset=UTF-8',
    },
})
    .then(function (response) {
        console.log(response.status)
        return response.json()
    }).then((json) => console.log(json));

export { requestURL };