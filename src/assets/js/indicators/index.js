'use strict';
// import test from "./test"
import avl from "./alex_avl"

import {
    FindTradingViewFrame,
    FindPineJs
} from './helper'

const fixPinejs = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let obj = arr[i]
        obj.constructor.prototype.getPineJs = () => {
            return window.PineJS ? window.PineJS : FindPineJs()
        }
    }
}


const fixCustomIndicator = (widget) => {

    let id = widget._id
    let obj = window[id]

    if (obj) {
        delete obj.customIndicatorsUrl
        Object.defineProperty(obj, "customIndicatorsUrl", {
            enumerable: true,
            configurable: true,
            get: function () {
                let x = widget._getIFrameElement()
                let win = x.contentWindow;
                if(win.$) {
                    findTradingViewAndFix(win)
                }
                return "abc";
            }
        })
    }
}

const findTradingViewAndFix = (win) => {

    let indicators = [avl]
    // let win = FindTradingViewFrame()
    if (win) {
        fixPinejs(indicators)
        if (win.$) {
            win.$.getScript = (e, t) => {
                let xx = win.$.Deferred()
                let good = false
                if (e == "abc") {
                    win.__customIndicators = indicators
                    good = true
                }
                if(good) {
                    setTimeout(() => {
                        xx.resolve()
                    }, 1)
                } else {
                    setTimeout(() => {
                        xx.reject()
                    }, 1);
                }
                return xx
            }
        }
        return
    }
    console.warn("findTradingViewAndFix 失败")
}

export {
    fixCustomIndicator,
    // findTradingViewAndFix
}
