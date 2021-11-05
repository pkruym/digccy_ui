'use strict';

export default {
    name: "Average value line",
    metainfo: {
        _metainfoVersion: 40,
        isTVScript: false,
        isTVScriptStub: false,
        is_hidden_study: false,
        isCustomIndicator: true,
        defaults: {
            styles: {
                plot_0: {
                    linestyle: 0,
                    linewidth: 3,
                    plottype: 0,
                    trackPrice: false,
                    transparency: 40,
                    visible: true,
                    color: "#FFFF00"
                }
            },
            precision: 4,
            inputs: {
                in_0: "close",
                in_1: 0
            }
        },
        plots: [{
            id: "plot_0",
            type: "line"
        }],
        styles: {
            plot_0: {
                title: "成本均线",
                histogramBase: 0,
                joinPoints: !1
            }
        },
        description: "成本均线",
        shortDescription: "AVL",
        is_price_study: true,
        inputs: [{
            id: "in_0",
            name: "Source",
            defval: "close",
            type: "source",
            options: ["open", "high", "low", "close", "hl2", "hlc3", "ohlc4"]
        }, {
            id: "in_1",
            name: "Offset",
            defval: 0,
            type: "integer",
            min: -1e4,
            max: 1e4
        }],
        id: "Average value line@tv-basicstudies-1",
        scriptIdPart: "",
        name: "Average value line"
    },
    constructor: function () {
        this.main = function (ctx, input) {
            
            let value = NaN
            let PineJS = this.getPineJs()
            if(PineJS) {
                this._context = ctx
                this._input = input
                let close = PineJS.Std[this._input(0)](this._context)
                let volume = PineJS.Std.volume(this._context)
                
                let cv = this._context.new_var()
                let v = this._context.new_var()
    
                let scv = PineJS.Std.na(cv.get(1)) ? 0 : cv.get(1)
                let sv = PineJS.Std.na(v.get(1)) ? 0 : v.get(1)
    
                cv.set(scv + close * volume)
                v.set(sv + volume)
    
                value = cv.get() / v.get()
                if (PineJS.Std.na(value)) {
                    value = close
                }
            }

            return [{
                value: value,
                offset: 0
            }]
        }
    }
}
