import fs from 'fs';
import path from 'path';


let fullPath = path.resolve( 'root','branch', 'file.js')
// console.log(path.join( 'root','branch'))
// console.log(fullPath)

const siteURL = 'http://localhost:8080/users?id-5123';
const url = new URL(siteURL);

<<<<<<< HEAD
let nm = new Number(350);
console.log(nm);
=======
console.log(url);
>>>>>>> testGit
