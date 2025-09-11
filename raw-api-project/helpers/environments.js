// Title: Environments
// Description: Handle all environments related things
// Aurthor: Shudipto Roy
// Date: 05/09/2025

// dependencies

// module scaffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'hsajjgasjhsvjkhjsdgghdd',
    maxChecks: 5,
};
environments.production = {
    port: 3000,
    envName: 'production',
    secretKey: 'asufdghvshdvuygauyueufb',
    maxChecks: 5,
};

// determine which environment was passed
const currentEnvironment =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport =
    typeof environments[currentEnvironment] === 'object'
        ? environments[currentEnvironment]
        : environments.staging;

// export module
module.exports = environmentToExport;
