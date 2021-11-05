const utils = require('../js/utils');
//table  state
export const state2String = val => {
    if (val == 'Queuing') return '排队中';
    if (val == 'Canceled') return '委托取消';
    if (val == 'Failure') return '委托失败';
    if (val == 'PartSuccess') return '部分委托成功';
    if (val == 'Success') return '委托成功';
    if (val == 'Discarded') return '废弃';
}
export let priceType2String = val => {
    if (val == 'MKT') return '市价单';
    if (val == 'LMT') return '委托价单';
}
export let tradeActionType2String = val => val === 'CLOSE' ? '平仓' : '开仓'
export let orderType2String = val => val === 'BUY' ? '买多' : '卖空'
export const windControlType2String = (type) => {
    switch (type) {
        case "DayUnwind":
            return "【强制平仓】";
        case "UserApplyUnwind":
            return "【市价平仓】";
        case "ReachProfitPoint":
            return "【达到止盈点平仓】";
        case "ReachLossPoint":
            return "【达到止损点平仓】";
        case "ReachContractExpiration":
            return "【合约到期平仓】";
        case "ReachStrongPoint":
            return "【达到强平点】";
        case "StopProfitOrLoss":
            return "【止盈止损平仓】";
        case "SpecifiedPrice":
            return "【委托价平仓】";
        case "OvernightFeeNotEnough":
            return "【延期费不足强平】";
        case "SystemUnwind":
            return "【系统操作平仓】";
        case "BackhandUnwind":
            return "【市价反手平仓】";
        default:
            return "【异常状态】";
    }

}


export let timeFormat1 = val => {
    if (val) return val.replace(/-/g, "/").substring(0, 16)
}
export let timeFormat2 = val => val.split(' ')[1]

export let filterKnownType = obj => {
    if (!obj) return

    if (obj.state) {
        obj.stateStr = state2String(obj.state)
    }
    if (obj.priceType) {
        obj.priceTypeStr = priceType2String(obj.priceType)
    }
    if (obj.tradeActionType) {
        obj.tradeActionTypeStr = tradeActionType2String(obj.tradeActionType)
    }
    if (obj.orderType) {
        obj.orderTypeStr = orderType2String(obj.orderType)
    }
    if (obj.windControlType) {
        obj.windControlTypeStr = windControlType2String(obj.windControlType)
    }

    if (obj.updateTime) {
        obj.updateTimeStr = timeFormat2(obj.updateTime)
    }

    if (obj.isUserCancel == true || obj.isUserCancel == false) {
        obj.isUserCancelStr = obj.isUserCancel ? "用户撤单" : "系统撤单"
    }

    if (!obj["insure"]) {
        obj["insure"] = "投保"
    }
    if (!obj["contractName"] &&
        obj.commodityName &&
        obj.commodityNo &&
        obj.contractNo
    ) {
        obj["contractName"] = obj.commodityName + obj.commodityNo + obj.contractNo
    }

    if (obj.publisherProfitOrLoss != null &&
        obj.currencySign != null &&
        obj.rate != null) {
        obj.publisherProfitOrLoss = utils.formatPriceByProfitLoss(obj);
    }
}