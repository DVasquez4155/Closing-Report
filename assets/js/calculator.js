$('#save').click(function() {
    var reportDone = true;
    var e = document.calculator;
    for (i = 0; i < e.length; i++) {
        if($(e[i]).attr('required') == "required") {
            if (e[i].value == "") {
                reportDone = false;
                break;
            }
        }
    }
    if (!reportDone) {
        $('#notComplete').modal('show');
        return;
    }
    addValue('closeReport',currentShift)
    window.location.href = 'index.html';
})
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})
var values = getValues('closeReport')
$(document.calculator).on('change', function(e){
    loadShift(this)
})
var currentShift;
function loadShift(e) {
    var vals = [];
    for (i = 0; i < e.length; i++) {
        if($(e[i]).attr('required') == "required") {
            vals.push(e[i].value);
        }
    }
    currentShift = new shift(vals);
    calculator(currentShift, e)
}
function calculator(currentShift,form) {
    form.chargePercent.value = formatter.format(currentShift.chargePercent());
    form.cashPercent.value = formatter.format(currentShift.cashPercent());
    form.totalSales.value = formatter.format(currentShift.totalSales());
    form.totalTips.value = formatter.format(currentShift.totalTips());
    form.totalPercent.value = formatter.format(currentShift.totalPercent());
    form.barTips.value = formatter.format(currentShift.barTips());
    form.busserTips.value = formatter.format(currentShift.busserTips());
    form.totalTipsPaid.value = formatter.format(currentShift.totalTipsPaid());
    form.netTips.value = formatter.format(currentShift.netTips());
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
        if (chargeCalc && !isNaN(percent)) {
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
        var percent = this.cashTips/this.otherSales;
        if (cashCalc  && !isNaN(percent)) {
            percent = Math.floor(percent*10000)/100
            return percent;
        }
        else {
            return 0.00;
        }
    }
    this.totalSales = function() {
        var totalCalc = !isNaN(this.tipCharge) && !isNaN(this.otherSales);
        var totalSales = parseFloat(this.tipCharge) + parseFloat(this.otherSales)
        if (!isNaN(totalCalc) && totalSales) {
            totalSales = Math.floor(totalSales*100)/100;
            return totalSales;
        }
        else {
            return 0.00
        }
    }
    this.totalTips = function() {
        var totalCalc = !isNaN(this.cashTips) && !isNaN(this.chargeTip);
        var totalTips = parseFloat(this.cashTips) + parseFloat(this.chargeTip)
        if (totalCalc && !isNaN(totalTips)) {
            totalTips = Math.floor(totalTips*100)/100;
            return totalTips;
        }
        else {
            return 0.00;
        }
    }
    this.totalPercent = function() {
        var totalCalc = !isNaN(this.totalTips()) && !isNaN(this.totalSales());
        var percent = this.totalTips() / this.totalSales();
        if (totalCalc && !isNaN(percent)) {
            percent = Math.floor(percent*100*100)/100;
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