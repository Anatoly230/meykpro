// import fs from 'fs';

// export function compilePages(){
//     fs.readdir('./source/pug/', function (err, data) {
//         if (err) {
//             console.log(err)
//         } else {
//             return data.toString().split(',');
//         }
//     })
// }

let route = 'dme';

const elementsContaner = document.querySelector('.app__search-results');
const elements = elementsContaner.querySelectorAll('.ticket-desktop');

elements.forEach((item, index) => {
    let routStart = item.querySelector('.segment-route__path-endpoint-iata').textContent;
    if (routStart.toLocaleLowerCase() === route) {
        item.style.border = '5px solid red' ;
    }
})


// segment-route__path-endpoint-iata  svo

// ticket-desktop