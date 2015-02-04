
var chai = require('chai');
var util = require('util');
var manager = require('./cs-controller');

manager.on('error', function(err) {
    chai.assert.fail('no error', err, util.inspect(err));
  });

manager.list( function (err, ports) 
    {

        chai.assert.isUndefined(err, util.inspect(err));
        chai.assert.isDefined(ports, 'ports is not defined');
        chai.assert.isTrue(ports.length > 0, 'no ports found');
 
        ports.forEach(function(port) 
            {
                console.log(port);
            });
 
        // open the last port in the list
        manager.usePorts( [ ports.slice(-1)[0].comName ]);
        //openPort( ports.slice(-1)[0].comName );
     });




