'use strict';

const FindTradingViewFrame = () => {
    let obj = document.getElementsByTagName('iframe')

    for (let i = 0; i < obj.length; i++) {
        if (obj[i].id.indexOf('tradingview_') != -1) {
            // 找到
            let win = obj[i].contentWindow
            if (win) {
                return win
            }
        }
    }
    return null
}

const FindPineJs = () => {
    let win = FindTradingViewFrame()
    if(win) {
        return win.PineJS
    }
    return null
}

export {
    FindTradingViewFrame,
    FindPineJs
}