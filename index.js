(function (global, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define('PublicInterval', factory);
    } else {
        global.PublicInterval = factory();
    }
})(this, function () {
    function PublicInterval (option) {
        option = option || {}
        this.timer = option.timer || 16.7
        this.processor = option.processor || {}
        this.flag = typeof option.autorun === 'bool' ? option.autorun : false
        this.isRunning = false
        this.handler = function () {
            if (this.flag) {
                for (key in this.processor) {
                    setImmediate(this.processor[key])
                }
                setTimeout(this.handler.bind(this), this.timer)
            }
        }
        option.autorun && this.go()
    }

    PublicInterval.prototype.go = function () {
        this.flag = true
        !this.isRunning && this.handler()
    }

    PublicInterval.prototype.stop = function () {
        this.isRunning = false
        this.flag = false
    }

    PublicInterval.prototype.removeProcessor = function (key) {
        delete(this.processor[key])
    }

    PublicInterval.prototype.setProcessor = function (key, fn) {
        if (typeof fn === 'function') {
            this.processor[key] = fn
        } else {
            throw('This processor is not a function.')
        }
    }

    PublicInterval.prototype.setTimer = function (time) {
        this.timer = +time
    }

    return PublicInterval
})
