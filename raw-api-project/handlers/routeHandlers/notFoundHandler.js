// Title: NNot Found Handler
// Description: Not Found Handler
// Aurthor: Shudipto Roy
// Date: 05/09/2025

// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, { message: 'Your requested url was not found!' });
};

module.exports = handler;
