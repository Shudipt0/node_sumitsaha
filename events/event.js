const School = require('./school');

const school = new School();

// register a listener for bellring event
school.on('bellRing', (period) => {
    console.log(`We need to run! ${period}`);
});

school.startPeriod();
