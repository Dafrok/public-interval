(function (global, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define('PublicInterval', factory);
    } else {
        global.PublicInterval = factory();
    }
})(this, function () {
    // setImmediate polyfill
    typeof setImmediate !== 'function' && (setImmediate = function (fn) {
        setTimeout(fn, 0)
    })

    // class PublicInterval
    function PublicInterval (option) {
        option = option || {}
        this.timer = option.timer || 16.7
        this.processor = option.processor || {}
        this.anonymousProcessor = []
        this.flag = typeof option.autorun === 'bool' ? option.autorun : false
        this.isRunning = false
        this.handler = function () {
            if (this.flag) {
                for (key in this.processor) {
                    setImmediate(this.processor[key])
                }
                for (var i = 0; i < this.anonymousProcessor.length; i++) {
                    setImmediate(this.anonymousProcessor[i])
                }
                setTimeout(this.handler.bind(this), this.timer)
            }
        }
        option.autorun && this.go()
    }

    PublicInterval.prototype.go = function () {
        this.flag = true
        !this.isRunning && (function (that) {
            that.isRunning = true
            that.handler()
        })(this)
    }

    PublicInterval.prototype.stop = function () {
        this.flag = false
        this.isRunning = false
    }

    PublicInterval.prototype.removeProcessor = function (key) {
        delete(this.processor[key])
    }

    PublicInterval.prototype.setProcessor = function (key, fn) {
        if (typeof fn === 'function') {
            this.processor[key] = fn
        } else if (typeof key === 'function') {
            fn = arguments[0]
            this.anonymousProcessor.push(fn)
        } else {
            throw('This processor is not a function.')
        }
    }

    PublicInterval.prototype.setTimer = function (time) {
        this.timer = +time
    }

    PublicInterval.prototype.dispose = function (time) {
        this.processor = {}
        this.anonymousProcessor = []
        this.stop()
    }

    return PublicInterval
})
