// const http = require('http');

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.write('<html><head><title>From</title></head>');
//         res.write(
//             '<body><form method="post" action="/about" ><input name="message" /></form></body></html>'
//         );
//         res.end();
//     } else if (req.url === '/about' && req.method === 'POST') {
//         const body = [];
//         req.on('data', (chunk) => {
//             body.push(chunk);
//         });
//         req.on('end', () => {
//             console.log('stream finished');
//             const parseBody = Buffer.concat(body).toString();
//             console.log(parseBody);
//         });
//         res.write('This is about page.');
//         res.end();
//     } else {
//         res.write('not found');
//         res.end();
//     }
// });

// server.listen(3000);
// console.log('Server is running on 3000');

// // const fs = require('fs');

// // const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');

// // ourReadStream.on('data', (data) => {
// //     console.log(data);
// // });

// // console.log('hello');
