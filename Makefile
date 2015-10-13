REPORTER = spec

all: jshint test

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --recursive --reporter $(REPORTER) --timeout 3000

jshint:
	jshint lib examples test cs-controller.js

tests: test

tap:
	@NODE_ENV=test ./node_modules/.bin/mocha -R tap > results.tap

skel:
	mkdir examples lib test
	touch index.js
	npm install mocha chai --save-dev

.PHONY: test tap unit jshint skel
