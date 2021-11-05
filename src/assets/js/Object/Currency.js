
export class Currency {


    /**
     *       
     * "id": "1",
      "symbol": "USD",
      "name": "美元",
      "rate": 6.71,
      "flag": "$",
      "type": "TRADE", //stringEnum:"TRADE", "PAY", "WITHDRAW"
     * @param {*} symbol 
     * @param {*} obj 
     */
    constructor(obj) {
        this.symbol = obj.symbol || ""
        this.id = obj.id || ""
        this.name = obj.name || ""
        this.flag = obj.flag || ""
        this.rate = {
            "TRADE": 0,
            "PAY": 0,
            "WITHDRAW": 0
        }
        this.rate[obj.type] = obj.rate
    }
    merge(obj) {
        if (obj && obj.symbol == this.symbol) {
            this.rate[obj.type] = obj.rate
        }
    }
}
