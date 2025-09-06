// Title: Routes
// Description: Application Routes
// Aurthor: Shudipto Roy
// Date: 05/09/2025

// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');
const { userHandler } = require('./handlers/routeHandlers/userHandler');

const routes = {
    sample: sampleHandler,
    user: userHandler,
};

module.exports = routes;
