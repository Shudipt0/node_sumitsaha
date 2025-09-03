const fs = require('fs');

const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');
const ourWriteStream = fs.createWriteStream(`${__dirname}/output.txt`, 'utf8');

// ourReadStream.on('data', (data) => {
//     // console.log(data);
//     ourWriteStream.write(data);
// });

// pipe
ourReadStream.pipe(ourWriteStream);
// console.log('hello');
