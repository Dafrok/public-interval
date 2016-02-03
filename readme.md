# public-interval.js
## Intro
Create a public interval handler for a group of processors.

## Install
```
$ npm install public-interval
```

## Usage
```javascript
import PublicInterval from 'public-interval'
let pi = new PublicInterval()
pi.setProcessor('my-processor', function () {
    console.log('My processor is running.')
})
pi.go()
```

## API
### pi.go
- Start this interval handler.
- param {object} obj
    - property {number} timer Interval time of this handler.
    - property {object} processor Initial processors of this handler.
    - property {boolean} autorun Whether run this handler when initialized.

### pi.stop
- Stop this interval handler.

### pi.setProcessor
- Set a new processor in this interval handler.
- param {string} name The name of this processor. It's a unique value.
- param {function} fn The processor.

### pi.removeProcessor
- Remove a processor in this interval by name.
- param {string} name The name of a processor which works in this interval handler.

### pi.setTimer
- Set a interval time for this interval handler.
- param {number} time The interval time of this interval handler.
