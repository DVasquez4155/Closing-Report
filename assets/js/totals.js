$('#new').on('click', function() {
    window.location.href = 'form.html';
});
$('#return').on('click', function() {
    window.location.href = 'index.html';
});
const timeRanges = {
    daily : ["Current Shift", 'Previous Shift', "Two Shifts Ago"],
    weekly : ["Current Week", 'Previous Week', "Two Weeks Ago"],
    period : ["Current Period", 'Previous Period', "Two Periods Ago"],
    monthly : ["Current Month", 'Previous Month', "Two Months Ago"],
    yearly : ["Current Year", 'Previous Year', "Two Years Ago"]
}
var values = getValues('closeReport');

var totalChargeTip = 0;
var totalCashTip = 0;
var totalTipCharge = 0;

values.forEach(element => {
    console.log(element)
    totalChargeTip += element.chargeTip;
    totalCashTip += element.cashTips;
    totalTipCharge += element.tipCharge;
});

const us = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})
const percent = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2
})
$(document.totals).on('change', function(e){
    loadSummary(this)
})
loadSummary(document.totals)
function loadSummary(form) {
    $('#current').text(timeRanges[form.summary.value][0])
    $('#previous').text(timeRanges[form.summary.value][1])
    $('#last').text(timeRanges[form.summary.value][2])
    $('#total').text(timeRanges[form.summary.value][3])

    form.chargeTip0.value = us.format(0);
    form.chargeTip1.value = us.format(0);
    form.chargeTip2.value = us.format(0);
    form.chargeTip3.value = us.format(totalChargeTip);

    form.cashTip0.value = us.format(0);
    form.cashTip1.value = us.format(0);
    form.cashTip2.value = us.format(0);
    form.cashTip3.value = us.format(totalCashTip);

    form.totalTip0.value = us.format(0);
    form.totalTip1.value = us.format(0);
    form.totalTip2.value = us.format(0);
    form.totalTip3.value = us.format(totalChargeTip + totalCashTip);

    form.tipPercent0.value = percent.format(0);
    form.tipPercent1.value = percent.format(0);
    form.tipPercent2.value = percent.format(0);
    form.tipPercent3.value = percent.format((totalChargeTip + totalCashTip)/totalTipCharge);
    
    form.totalPaid0.value = us.format(0);
    form.totalPaid1.value = us.format(0);
    form.totalPaid2.value = us.format(0);
    form.totalPaid3.value = us.format(0);
    
    // console.log(form.chargeTip3.value)

}
// var cardList = $('#list')
// $(values).each(function(i) {
//     var date = moment(values[i].date);
//     if ($('#' + date.format('MMM_YYYY')).length == 0) {
//         cardList.append(
//             '<div class="card-header">' +
//             '<button class="btn btn-link" data-toggle="collapse" data-target="#' + date.format('MMM_YYYY') + '">' +
//             date.format('MMMM YYYY') +
//             '</button>' +
//             '</div>')
//         .append(
//             '<div id="' + date.format('MMM_YYYY') + '" class="collapse">' +
//             '<ul id="' + date.format('MMM_YYYY') + 'ul" class="list-group">' +
//             '</ul>' +
//             '</div>')
//     }
//     // if ($('#' + date.format('MMM_YYYY')))
//     var list = document.createElement('li');
//     $(list)
//     .addClass('list-group-item')
//     .html('<a href="form.html#' + i + '">' + date.format('M/DD/YYYY') + "</a>")
//     .appendTo($('#' + date.format('MMM_YYYY') + 'ul'));
// })