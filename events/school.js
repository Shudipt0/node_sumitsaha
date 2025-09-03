const EvenetEmitter = require('events');

class School extends EvenetEmitter {
    startPeriod() {
        console.log('Class started');

        // raise an event
        setTimeout(() => {
            this.emit('bellRing', 'second period ended');
        }, 2000);
    }
}

module.exports = School;
