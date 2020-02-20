$('#save').click(function(e) {
    console.log(e)
    addValue('closeReport',currentShift)
    window.location.href = 'index.html';
})
var values = getValues('closeReport')
$(document.calculator).on('change', function(e){
    calculator(this)
})
var currentShift;
function calculator(e) {
    var vals = [];
    for (i = 0; i < e.length; i++) {
        if(e[i].attributes.type != undefined && $(e[i]).attr('type') !='button') {
            vals.push(e[i].value);
        }
    }
    currentShift = new shift(vals);
    e.chargePercent.value = currentShift.chargePercent();
    e.cashPercent.value = currentShift.cashPercent();
    e.totalSales.value = currentShift.totalSales();
    e.totalTips.value = currentShift.totalTips();
    e.totalPercent.value = currentShift.totalPercent();
    e.barTips.value = currentShift.barTips();
    e.busserTips.value = currentShift.busserTips();
    e.totalTipsPaid.value = currentShift.totalTipsPaid();
    e.netTips.value = currentShift.netTips();
}
window.onload = function() {
    calculator(document.calculator)
}

function shift(vals) {
    this.name = vals[0];
    this.station = vals[1];
    this.date = vals[2];
    this.shift = vals[3];
    this.tipCharge = vals[4];
    this.chargeTip = vals[5];
    var chargeCalc = !isNaN(this.tipCharge) && !isNaN(this.chargeTip);
    this.chargePercent = function() {
        var percent = this.chargeTip/this.tipCharge;
        if (chargeCalc) {
            percent = Math.floor(percent*10000)/100
            return percent;
        }
        else {
            return 0.00;
        }
    }
    this.otherSales = vals[6];
    this.cashTips = vals[7];
    var cashCalc = !isNaN(this.otherSales) && !isNaN(this.cashTips);
    this.cashPercent = function() {
        if (cashCalc) {
            var percent = this.cashTips/this.otherSales;
            percent = Math.floor(percent*10000)/100
            return percent;
        }
        else {
            return 0.00;
        }
    }
    this.totalSales = function() {
        if (!isNaN(this.tipCharge) && !isNaN(this.otherSales)) {
            var totalSales = parseFloat(this.tipCharge) + parseFloat(this.otherSales)
            totalSales = Math.floor(totalSales*100)/100;
            return totalSales;
        }
        else {
            return 0.00
        }
    }
    this.totalTips = function() {
        if (!isNaN(this.cashTips) && !isNaN(this.chargeTip)) {
            var totalTips = parseFloat(this.cashTips) + parseFloat(this.chargeTip)
            totalTips = Math.floor(totalTips*100)/100;
            return totalTips;
        }
        else {
            return 0.00;
        }
    }
    this.totalPercent = function() {
        if (!isNaN(this.totalTips()) && !isNaN(this.totalSales())) {
            var percent = this.totalTips() / this.totalSales()
            percent = Math.floor(percent*100*100)/100
            return percent;
        }
        else {
            return 0.00;
        }
    }
    this.barSales = vals[8];
    this.barTips = function() {
        if(!isNaN(this.barSales)) {
            var barTips = this.barSales * .10
            barTips = Math.floor(barTips*100)/100
            return barTips;
        }
        else {
            return 0.00
        }
    }
    this.busserTips = function() {
        if (!isNaN(this.totalTips())) {
            var busserTips = this.totalTips() * .15
            busserTips = Math.floor(busserTips*100)/100
            return busserTips;
        }
        else {
            return 0.00
        }
    }
    this.totalTipsPaid = function() {
        if(!isNaN(this.barTips()) && !isNaN(this.busserTips())) {
            var totalTipsPaid = parseFloat(this.barTips()) + parseFloat(this.busserTips())
            return totalTipsPaid;
        }
        else {
            return 0.00
        }
    }

    this.netTips = function() {
        if (!isNaN(this.totalTips()) && !isNaN(this.totalTipsPaid())) {
            var netTips = parseFloat(this.totalTips()) - parseFloat(this.totalTipsPaid())
            netTips = Math.floor(netTips*100)/100
            return netTips;
        }
        else {
            return 0.00
        }
    }
    return this;
}

$('#return').on('click', function(e) {
    window.location.href = 'index.html';
})