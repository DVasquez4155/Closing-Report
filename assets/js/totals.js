$('#new').on('click', function () {
    window.location.href = 'form.html';
});
$('#return').on('click', function () {
    window.location.href = '/';
});
const timeRanges = {
    daily: ["Current Shift", 'Previous Shift', "Two Shifts Ago"],
    weekly: ["Current Week", 'Previous Week', "Two Weeks Ago"],
    period: ["Current Period", 'Previous Period', "Two Periods Ago"],
    monthly: ["Current Month", 'Previous Month', "Two Months Ago"],
    yearly: ["Current Year", 'Previous Year', "Two Years Ago"]
}
var values = getValues('closeReport');

var totalChargeTip = 0;
var totalCashTip = 0;
var totalTipCharge = 0;
var totalPaidOut = 0;

values.forEach(element => {
    totalChargeTip += element.serverTips.chargeTips;
    totalCashTip += element.serverTips.cashTips;
    totalTipCharge += element.serverTips.totalTips;
    totalPaidOut += element.paidTips.total;
});
totalTipsPercent = totalTipCharge / values.length

const us = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})
const percent = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2
})
$(document.totals).on('change', function (e) {
    loadSummary(this)
})

function addUpSummaries(summaries) {
    var totalSummaryChargeTip = 0;
    var totalSummaryCashTip = 0;
    var totalSummaryTotalTips = 0;
    var totalSummaryTotalTipsPercent = 0;
    var totalSummaryPaidTipsTotal = 0;
    summaries.forEach(element => {
        totalSummaryChargeTip += element.serverTips.chargeTips;
        totalSummaryCashTip += element.serverTips.cashTips;
        totalSummaryTotalTips += element.serverTips.totalTips;
        totalSummaryPaidTipsTotal += element.paidTips.total;
    });
    totalSummaryTotalTipsPercent = totalSummaryChargeTip / summaries.length
    const totalSummary = {
        serverTips : {
            chargeTips : totalSummaryChargeTip,
            cashTips : totalSummaryCashTip,
            totalTips : totalSummaryTotalTips,
            totalTipsPercent : totalSummaryTotalTipsPercent/100,
        },
        paidTips: {
            total: totalSummaryPaidTipsTotal
        }
    }
    return totalSummary;
}

function grabSummaries(timeRange) {
    const summaries = [];
    if (timeRange == "daily") {
        const totalShifts = values.length;
        summaries.push(values[totalShifts - 3])
        summaries.push(values[totalShifts - 2])
        summaries.push(values[totalShifts - 1])
    } else if (timeRange == "weekly") {
        var firstWeek = []
        var secondWeek = []
        var thirdWeek = []
        const date = new Date;

        for (let i = 0; i < 20; i++) {
            values.forEach(element => {
                if (
                    element.year == date.getFullYear() &&
                    element.month == date.getMonth() + 1 &&
                    element.day == date.getDate()
                ) {
                    if (i <= 6) {
                        firstWeek.push(element)
                    } else if (i <= 13) {
                        secondWeek.push(element)
                    } else if (i <= 20) {
                        thirdWeek.push(element)
                    }
                }
            })
            date.setDate(date.getDate() - 1)
        }

        summaries.push(addUpSummaries(firstWeek))
        summaries.push(addUpSummaries(secondWeek))
        summaries.push(addUpSummaries(thirdWeek))
    } else if (timeRange == "period") {

    } else if (timeRange == "monthly") {

    }
    return summaries;
}


loadSummary(document.totals)

function loadSummary(form) {
    const summaries = grabSummaries(form.summary.value);
    $('#current').text(timeRanges[form.summary.value][0])
    $('#previous').text(timeRanges[form.summary.value][1])
    $('#last').text(timeRanges[form.summary.value][2])
    $('#total').text(timeRanges[form.summary.value][3])

    form.chargeTip0.value = us.format(summaries[0].serverTips.chargeTips);
    form.chargeTip1.value = us.format(summaries[1].serverTips.chargeTips);
    form.chargeTip2.value = us.format(summaries[2].serverTips.chargeTips);
    form.chargeTip3.value = us.format(totalChargeTip);

    form.cashTip0.value = us.format(summaries[0].serverTips.cashTips);
    form.cashTip1.value = us.format(summaries[1].serverTips.cashTips);
    form.cashTip2.value = us.format(summaries[2].serverTips.cashTips);
    form.cashTip3.value = us.format(totalCashTip);

    form.totalTip0.value = us.format(summaries[0].serverTips.totalTips);
    form.totalTip1.value = us.format(summaries[1].serverTips.totalTips);
    form.totalTip2.value = us.format(summaries[2].serverTips.totalTips);
    form.totalTip3.value = us.format(totalChargeTip + totalCashTip);

    form.tipPercent0.value = percent.format(summaries[0].serverTips.totalTipsPercent || 0);
    form.tipPercent1.value = percent.format(summaries[1].serverTips.totalTipsPercent || 0);
    form.tipPercent2.value = percent.format(summaries[2].serverTips.totalTipsPercent || 0);
    form.tipPercent3.value = percent.format(totalTipsPercent / 100);

    form.totalPaid0.value = us.format(summaries[0].paidTips.total);
    form.totalPaid1.value = us.format(summaries[1].paidTips.total);
    form.totalPaid2.value = us.format(summaries[2].paidTips.total);
    form.totalPaid3.value = us.format(totalPaidOut);
}