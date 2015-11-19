cs-controller
=========

A node.js module providing a serial port interface to motor controllers provided by Control Solutions LLC

## Installation
  Create a folder for your application and navigate there on a command line prompt.
  (optional) start a new nodejs project and put it under version control.  For an example, see https://quickleft.com/blog/creating-and-publishing-a-node-js-module/

  Install the cs-controller module:
  `npm install csllc/cs-controller.git --save`

## Usage
  Create a file (eg index.js) containing your script commands (refer to examples below).
  Run the script with a command like 'node index.js'
  
  ```javascript
  var portManager = require('cs-controller');

    
  ```
  Refer to the examples folder.

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code using the `make all` command.

Kudos to https://quickleft.com/blog/creating-and-publishing-a-node-js-module/ for the initial module structure

## Release History

* 0.1.0 Initial release
