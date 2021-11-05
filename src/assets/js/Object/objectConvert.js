
// import { SymbolInfos } from '../config/symbolInfo'

import {
    ContractInfo
} from './ContractInfo'

import * as utils from '../utils'

export let Quote2Quote = (res) => {

    let updateTime = new Date(res.time).Format("hh:mm:ss")
    res.updateTime = updateTime

    return res
}

export let FuturesQuoteData2Quote = (res) => {
    // let key = node.commodityNo + node.contractNo

    // if (obj) {
    //     let scale = obj.scale
    //     let last = parseFloat(res.lastPrice)
    //     let close = parseFloat(res.closePrice)

        // let updateTime = res.time.split(" ")[1]
        // updateTime = updateTime.split(".")[0]
        let updateTime = new Date(res.time).Format("hh:mm:ss")

        return {

            commodityNo: res.commodityNo,
            contractNo: res.contractNo,

            // currentTime: res.currentTime,
            totalVolume: res.totalQty,

            sp1: res.askPrice,
            sp2: res.askPrice2,
            sp3: res.askPrice3,
            sp4: res.askPrice4,
            sp5: res.askPrice5,
            sv1: res.askSize,
            sv2: res.askSize2,
            sv3: res.askSize3,
            sv4: res.askSize4,
            sv5: res.askSize5,
            bp1: res.bidPrice,
            bp2: res.bidPrice2,
            bp3: res.bidPrice3,
            bp4: res.bidPrice4,
            bp5: res.bidPrice5,
            bv1: res.bidSize,
            bv2: res.bidSize2,
            bv3: res.bidSize3,
            bv4: res.bidSize4,
            bv5: res.bidSize5,

            close: res.closePrice,
            high: res.highPrice,
            low: res.lowPrice,
            open: res.openPrice,

            newPrice: res.lastPrice,                 // 最新价
            preSettle: res.preSettle,

            updateTime: updateTime,

            // upDropPrice: (last - close).toFixed(scale),
            // upDropSpeed: (((last - close) / close) * 100).toFixed(2)
        }
    // }
    // return new ContractInfo
}

