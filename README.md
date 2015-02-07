cs-controller
=========

A node.js module providing a serial port interface to motor controllers provided by Control Solutions LLC

## Installation

  npm install cs-controller --save

## Usage
  create a file (eg index.js) containing your script commands (refer to examples below).
  Run the script with a command like 'node index.js'
  
  ```javascript
  var portManager = require('cs-controller');

  // get a list of all available ports
  var ports = portManager.list();
  // choose the last one in the list or use some other way of choosing the port to open
  var portName = ports.slice(-1);
  
  // Use try/catch to deal with errors (error opening the port, communication error, etc)
  try {
    var controller = new portManager.controller( portName );
    }
    catch( e ) {
      // an error occurred opening the port
    }
    
    try {
      var personality = controller.personality();
      console.log( 'Product Id: ' + personality.productId );
      }
      catch (e ) {
        console.error( 'Error reading personality' );
      }
    }
        
    
    
    
  ```
  
## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code using the npm test command.

Kudos to https://quickleft.com/blog/creating-and-publishing-a-node-js-module/ for the initial module structure

## Release History

* 0.1.0 Initial release
