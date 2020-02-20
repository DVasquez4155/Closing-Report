var values = getValues('closeReport');
var report = document.calculator;
var hash = parseInt(location.hash.substring(1));
function fill(shiftNumber){
    if (!isNaN(shiftNumber)) {
        var shift = values[shiftNumber];
        report.name.value = shift.name;
        report.station.value = shift.station;
        report.date.value = shift.date;
        report.shift.value = shift.shift;
        report.tipCharge.value = shift.tipCharge;
        report.chargeTip.value = shift.chargeTip;
        report.otherSales.value = shift.otherSales;
        report.cashTips.value = shift.cashTips;
        report.barSales.value = shift.barSales;
        loadShift(report)
    }
}
window.onload = function(){fill(hash)};
for (i = 0; i < report.length - 1; i++) {
    $(report[i]).attr('disabled', true)
}
$('#return').on('click', function(e) {
    window.location.href = 'index.html';
})