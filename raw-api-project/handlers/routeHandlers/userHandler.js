// Title: User Handler
// Description: Handler to handle user related routes
// Aurthor: Shudipto Roy
// Date: 06/09/2025

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    // console.log(requestProperties.method);
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if( acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._user[requestProperties.method](requestProperties, callback);
    } else {
           callback(405);
    }
};

handler._user = {};

handler._user.post = (requestProperties, callback) => {

};

handler._user.get = (requestProperties, callback) => {

};

handler._user.put = (requestProperties, callback) => {

};

handler._user.delete = (requestProperties, callback) => {

};

module.exports = handler;
