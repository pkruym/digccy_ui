'use strict';

export default {
    // Replace the <study name> with your study name
    // The name will be used internally by the Charting Library
    name: "test123",
    metainfo: {
        "_metainfoVersion": 40,
        "id": "test123@tv-basicstudies-1",
        "scriptIdPart": "",
        "name": "test123",

        // This description will be displayed in the Indicators window
        // It is also used as a "name" argument when calling the createStudy method
        "description": "测试脚本",

        // This description will be displayed on the chart
        "shortDescription": "测试脚本s",

        "is_hidden_study": false,
        "is_price_study": true,
        "isCustomIndicator": true,

        "plots": [{
            "id": "plot_0",
            "type": "line"
        }],
        "defaults": {
            "styles": {
                "plot_0": {
                    "linestyle": 0,
                    "visible": true,

                    // Plot line width.
                    "linewidth": 2,

                    // Plot type:
                    //    1 - Histogram
                    //    2 - Line
                    //    3 - Cross
                    //    4 - Area
                    //    5 - Columns
                    //    6 - Circles
                    //    7 - Line With Breaks
                    //    8 - Area With Breaks
                    "plottype": 2,

                    // Show price line?
                    "trackPrice": false,

                    // Plot transparency, in percent.
                    "transparency": 40,

                    // Plot color in #RRGGBB format
                    "color": "#0000FF"
                }
            },

            // Precision of the study's output values
            // (quantity of digits after the decimal separator).
            "precision": 4,

            "inputs": {
                in_0: 9,
                in_1: "close",
                in_2: 0
            }
        },
        "styles": {
            "plot_0": {
                // Output name will be displayed in the Style window
                "title": "oooooxxxxxxx",
                "histogramBase": 0,
            }
        },
        "inputs": [{
            id: "in_0",
            name: "Length",
            defval: 9,
            type: "integer",
            min: 1,
            max: 1e4
        }, {
            id: "in_1",
            name: "Source",
            defval: "close",
            type: "source",
            options: ["open", "high", "low", "close", "hl2", "hlc3", "ohlc4"]
        }, {
            id: "in_2",
            name: "Offset",
            defval: 0,
            type: "integer",
            min: -1e4,
            max: 1e4
        }],
    },

    constructor: function () {
        this.init = function (context, inputCallback) {
            this._context = context;
            this._input = inputCallback;

            let PineJS = this.getPineJs()

            // Define the symbol to be plotted.
            // Symbol should be a string.
            // You can use PineJS.Std.ticker(this._context) to get the selected symbol's ticker.
            // For example,
            //    var symbol = "AAPL";
            //    var symbol = "#EQUITY";
            //    var symbol = PineJS.Std.ticker(this._context) + "#TEST";
            var symbol = PineJS.Std.ticker(this._context) + "#TEST";
            this._context.new_sym(symbol, PineJS.Std.period(this._context), PineJS.Std.period(this._context));
        };

        this.main = function (context, inputCallback) {
            this._context = context;
            this._input = inputCallback;

            // this._context.select_sym(1);

            let PineJS = this.getPineJs()

            // You can use following built-in functions in PineJS.Std object:
            //    open, high, low, close
            //    hl2, hlc3, ohlc4
            var v = PineJS.Std[this._input(1)](this._context);
            var o = this._input(2)
            var n = this._input(0)

            var s = this._context.new_var(v)
            var l = PineJS.Std.sma(s, n, this._context)

            return [{
                value: l,
                offset: o
            }];
        }
    }
}


// this.main = function(t, e) {
//     var i, n, r, s, a, l;
//     return this._context = t,
//     this._input = e,
//     i = o.Std[this._input(1)](this._context),
//     n = this._input(0),
//     r = this._input(2),
//     s = this._context.new_var(i),
//     a = o.Std.sma(s, n, this._context),
//     l = a,
//     [{
//         value: l,
//         offset: r
//     }]
// }