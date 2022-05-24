$('#new').on('click', function() {
    window.location.href = 'form.html';
});
$('#return').on('click', function() {
    window.location.href = 'index.html';
});
const timeRanges = {
    weekly : ["Current Week", 'Last Week', "Two Weeks Ago"],
    period : ["Current Period", 'Last Period', "Two Periods Ago"],
    monthly : ["Current Month", 'Last Month', "Two Months Ago"],
    yearly : ["Current Year", 'Last Year', "Two Years Ago"]
}

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
    console.log(form.chargeTip3.value)

}
var values = getValues('closeReport');
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