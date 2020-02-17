var values = getValues('closeReport')
$(document.calculator).on('change', function(e){
    calculator(this)
})
var test;
function calculator(e) {
    var chargeCalc = !isNaN(e.tipCharge.value) && !isNaN(e.chargeTip.value);
    if (chargeCalc) {
        var percent = e.chargeTip.value/e.tipCharge.value;
        percent = Math.floor(percent*100*100)/100
        e.chargePercent.value = percent
    }
    var cashCalc = !isNaN(e.otherSales.value) && !isNaN(e.cashTips.value);
    if (cashCalc) {
        var percent = e.cashTips.value/e.otherSales.value;
        percent = Math.floor(percent*100*100)/100
        e.cashPercent.value = percent
    }
    if (!isNaN(e.tipCharge.value) && !isNaN(e.otherSales.value)) {
        var totalSales = parseFloat(e.tipCharge.value) + parseFloat(e.otherSales.value)
        e.totalSales.value = totalSales;
    }
    if (!isNaN(e.cashTips.value) && !isNaN(e.chargeTip.value)) {
        var totalTips = parseFloat(e.cashTips.value) + parseFloat(e.chargeTip.value)
        e.totalTips.value = totalTips;
    }
    if (!isNaN(e.totalTips.value) && !isNaN(e.totalSales.value)) {
        var percent = e.totalTips.value / e.totalSales.value
        percent = Math.floor(percent*100*100)/100
        e.totalPercent.value = percent;
    }
    if(!isNaN(e.barSales.value)) {
        var barTips = e.barSales.value * .10
        barTips = Math.floor(barTips*100)/100
        e.barTips.value = barTips;
    }
    if (!isNaN(e.totalTips.value)) {
        var busserTips = e.totalTips.value * .15
        busserTips = Math.floor(busserTips*100)/100
        e.busserTips.value = busserTips;
    }
    if(!isNaN(e.barTips.value) && !isNaN(e.busserTips.value)) {
        var totalTipsPaid = parseFloat(e.barTips.value) + parseFloat(e.busserTips.value)
        e.totalTipsPaid.value = totalTipsPaid;
    }
    if (!isNaN(e.totalTips.value) && !isNaN(e.totalTipsPaid.value)) {
        var netTips = parseFloat(e.totalTips.value) - parseFloat(e.totalTipsPaid.value)
        
        netTips = Math.floor(netTips*100)/100
        e.netTips.value = netTips;
    }
    var vals = [];
    for (i = 0; i < e.length; i++) {
        vals.push(e[i].value);
    }
    test = new shift(vals);
    // addValues('closeReport',value)
}
calculator(document.calculator)
function shift(vals) {
    this.name = vals[0];
    this.station = vals[1];
    this.date = vals[2];
    this.shift = vals[3];
    this.tipCharge = vals[4];
    this.chargeTip = vals[5];
    this.chargePercent = vals[6];
    this.otherSales = vals[7];
    this.chashTips = vals[7];
    this.totalSales = vals[9];
    this.totalTips = vals[10];
    this.totalPercent = vals[11];
    this.barSales = vals[12];
    this.barTips = vals[13];
    this.totalTipsPaid = vals[14];
    this.netTips = vals[15];
    return this;
}