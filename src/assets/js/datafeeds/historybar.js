'use strict';

/// timestamp is micro second

class HistoryBar {
    constructor() {
        this._resolution = '0'
        this._bars = []                     // RecordBar
    }

    fixTimestamp(ts, resolution) {
        // return fixTimestamp(ts, resolution)
    }

    setBars(bars) {
        this._bars = bars
    }

    setResolution(resolution) {
        this._resolution = resolution
    }
    getResolution() {
        return this._resolution;
    }

    clear() {
        this._bars = []
    }

    getBars() {
        return this._bars
    }

    // return true if create a new bar
    merge(barValue) {
        if(this._bars.length > 1) {
            let lastBar = this._bars[this._bars.length - 1]
            let lastStartTs = this.fixTimestamp(lastBar.time, this._resolution)
            let startTs = this.fixTimestamp(barValue.time, this._resolution)

            if(startTs == lastStartTs) {
                // 替换
                this._bars[this._bars.length - 1] = barValue
                return false
            } else if (lastStartTs < startTs) {
                // new bar
                lastBar.time = lastStartTs

                this._bars.push(barValue)
                return true
            }
        }
        return false
    }
}




