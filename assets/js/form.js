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
    addValue('closeReport',currentSales)
    window.location.href = 'index.html';
})
const us = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})
const percent = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2
})
var values = getValues('closeReport')
$(document.calculator).on('change', function(e){
    loadShift(this)
})
$('#exitBarButton').on('click', function () {
    loadShift(document.calculator)
})
loadShift(document.calculator)
var currentSales;
function loadShift(calc) {
    var bar = document.bar;
    currentBarSales = new barSales({
        liquor : bar.liquor.value,
        beerBtl : bar.beerBtl.value,
        beerKeg : bar.beerKeg.value,
        // wineCorked : bar.wineCorked.value,
        wine : bar.wine.value,
        // total : bar.barTotal.value
    });
    var date = [0,0,0];
    date = calc.date.value.split("-")
    currentSales = new sales({
        // name :  calc.name.value,
        // station:  calc.station.value,
        bar:  currentBarSales,
        date:  calc.date.value,
        
        year: parseInt(date[0]),
        month: parseInt(date[1]),
        day: parseInt(date[2]),
        shift:  parseInt(calc.shift.value),
        tipCharge:  calc.tipCharge.value,
        // otherSales:  calc.otherSales.value,
        chargeTip:  calc.chargeTip.value,
        cashTips:  calc.cashTips.value,
    })
    calculator(currentSales, calc)
}
function calculator(currentShift,form) {
    console.log(currentShift)
    

    currentShift.serverTips = {
        chargeTips: parseFloat(form.chargeTip.value),
        cashTips: parseFloat(form.cashTips.value),
        totalTips: parseFloat(form.chargeTip.value) + parseFloat(form.cashTips.value),

        totalTipsPercent: (form.chargeTip.value + form.cashTips.value)/form.tipCharge.value,
    }
    // var bar = document.bar;
    // form.chargePercent.value = percent.format(currentShift.chargePercent());
    // form.cashPercent.value = percent.format(currentShift.cashPercent());
    // form.totalSales.value = us.format(currentShift.totalSales());
    form.totalTips.value = us.format(currentShift.totalTips());
    form.totalPercent.value = percent.format(currentShift.totalPercent());
    form.barSales.value = us.format(currentShift.bar.barSales());
    // bar.barTotal.value = form.barSales.value
    form.barTips.value = us.format(currentShift.barTips());
    form.busserTips.value = us.format(currentShift.busserTips());
    form.hohTips.value = us.format(currentShift.hohTips());
    form.hostTips.value = us.format(currentShift.hostTips());
    form.totalTipsPaid.value = us.format(currentShift.totalTipsPaid());
    form.netChargeTips.value = us.format(currentShift.netTips()-currentShift.cashTips);
    form.netCashTips.value = us.format(currentShift.cashTips);
    currentShift.paidTips = {
        bar: currentShift.barTips(),
        busser: currentShift.busserTips(),
        hoh: currentShift.hohTips(),
        host: currentShift.hostTips(),
        total: 
        currentShift.barTips() + 
        currentShift.busserTips() + 
        currentShift.hohTips() + 
        currentShift.hostTips()
    }
    
    currentSales = currentShift;
}

$('#return').on('click', function(e) {
    window.location.href = '/';
})

var report = document.calculator;
var bar = document.bar;
var hash = parseInt(location.hash.substring(1));
function fill(shiftNumber){
    var shift = values[shiftNumber];
    console.log(shift)
    // report.name.value = shift.name;
    // report.station.value = shift.station;
    report.date.value = shift.date;
    report.shift.value = shift.shift;
    report.tipCharge.value = shift.tipCharge;
    report.chargeTip.value = shift.chargeTip;
    // report.otherSales.value = shift.otherSales;
    report.cashTips.value = shift.cashTips;
    var reportedBarSales =  new barSales(shift.bar)
    bar.liquor.value = reportedBarSales.liquor;
    bar.beerBtl.value = reportedBarSales.beerBtl;
    bar.beerKeg.value = reportedBarSales.beerKeg;
    // bar.wineCorked.value = reportedBarSales.wineCorked;
    bar.wine.value = reportedBarSales.wine;
    loadShift(report)
}
window.onload = function(){
    if (!isNaN(hash)) {
        disableForm(report);
        disableForm(document.bar);
        $('#save').attr('style', 'visibility: hidden;')
        fill(hash)
    }
};
function disableForm(form) {
    for (i = 0; i < form.length; i++) {
        if ($(form[i]).attr('type') != 'button') {
            $(form[i]).attr('disabled', true)
        }
    }
}