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
        this.wineCorked = isCorrect(vals.wineCorked);
        this.wineGlass = isCorrect(vals.wineGlass);
        return this;
    }
    barSales() {
        var total = 0;
        total += 
        this.liquor + 
        this.beerBtl + 
        this.beerKeg + 
        this.wineCorked + 
        this.wineGlass;
        return total;
    }
}
class sales{
    constructor(vals) {
        this.name = vals.name;
        this.station = isCorrect(vals.station);
        this.date = vals.date;
        this.shift = vals.shift;
        this.tipCharge = isCorrect(vals.tipCharge);
        this.chargeTip = isCorrect(vals.chargeTip);
        this.otherSales = isCorrect(vals.otherSales);
        this.cashTips = isCorrect(vals.cashTips);
        this.bar = vals.bar;
    }
    barTips() {
        return this.bar.barSales() * .10;
    }
    chargePercent() {
        return this.chargeTip/this.tipCharge;
    }
    cashPercent() {
        return this.cashTips/this.otherSales;
    }
    totalSales() {
        return this.tipCharge + this.otherSales;
    }
    totalTips() {
        return this.cashTips + this.chargeTip;
    }
    totalPercent() {
        return this.totalTips() / this.totalSales();
    }
    busserTips() {
        return this.totalTips() * .15;
    }
    totalTipsPaid() {
        return this.barTips() + this.busserTips();
    }
    netTips() {
        return this.totalTips() - this.totalTipsPaid()
    }
}