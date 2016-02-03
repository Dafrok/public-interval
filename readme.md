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
- description
    - Start this interval handler.
- param
    - {object} obj
        - property {number} timer Interval time of this handler.
        - property {object} processor Initial processors of this handler.
        - property {boolean} autorun Whether run this handler when initialized.

### pi.stop
- Stop this interval handler.

### pi.setProcessor
- description
    - Set a new processor in this interval handler.
- param
    - name {string} The name of this processor. It's a unique value.
    - fn {function} The processor.

### pi.removeProcessor
- description
    - Remove a processor in this interval by name.
- param
    - name {string} The name of a processor which works in this interval handler.

### pi.setTimer
- description
    - Set interval time for this interval handler.
- param
    - time {number} The interval time of this interval handler.
