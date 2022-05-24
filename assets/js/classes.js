function isCorrect(num) {
    if (!isNaN(num) && num != "") {
        return parseFloat(num);
    }
    else {
        return 0.00;
    }
}
class barSales {
    constructor(vals) {
        this.liquor = isCorrect(vals.liquor);
        this.beerBtl = isCorrect(vals.beerBtl);
        this.beerKeg = isCorrect(vals.beerKeg);
        this.wine = isCorrect(vals.wine);
        return this;
    }
    barSales() {
        var total = 0;
        total += 
        this.liquor + 
        this.beerBtl + 
        this.beerKeg + 
        this.wine;
        return total;
    }
}
class sales{
    constructor(vals) {
        // this.name = vals.name;
        // this.station = isCorrect(vals.station);
        this.date = vals.date;
        this.year = vals.year;
        this.month = vals.month;
        this.day = vals.day;
        this.shift = vals.shift;
        this.tipCharge = isCorrect(vals.tipCharge);
        this.chargeTip = isCorrect(vals.chargeTip);
        // this.otherSales = isCorrect(vals.otherSales);
        this.cashTips = isCorrect(vals.cashTips);
        this.netTotalTips = isCorrect(vals.netTotalTips);
        this.totalTipsPercent = isCorrect(vals.totalTipsPercent);
        this.totalTipsPaidOut = isCorrect(vals.totalTipsPaidOut);
        this.bar = vals.bar;
    }
    barTips() {
        return this.bar.barSales() * .05;
    }
    chargePercent() {
        return this.chargeTip/this.tipCharge;
    }
    cashPercent() {
        return this.cashTips/this.otherSales;
    }
    totalSales() {
        return this.tipCharge;
    }
    totalTips() {
        return this.cashTips + this.chargeTip;
    }
    totalPercent() {
        return this.totalTips() / this.totalSales();
    }
    busserTips() {
        return this.tipCharge * .021;
    }
    hohTips() {
        return this.tipCharge * .006;
    }
    hostTips() {
        return this.tipCharge * .003;
    }
    totalTipsPaid() {
        return this.barTips() + this.busserTips() + this.hohTips() + this.hostTips();
    }
    netTips() {
        return this.totalTips() - this.totalTipsPaid()
    }
}