$('#new').on('click', function() {
    window.location.href = 'form.html';
});
var values = getValues('closeReport');
var cardList = $('#list')
$(values).each(function(i) {
    var date = moment(values[i].date);
    if ($('#' + date.format('MMM_YYYY')).length == 0) {
        cardList.append(
            '<div class="card-header">' +
            '<button class="btn btn-link" data-toggle="collapse" data-target="#' + date.format('MMM_YYYY') + '">' +
            date.format('MMMM YYYY') +
            '</button>' +
            '</div>')
        .append(
            '<div id="' + date.format('MMM_YYYY') + '" class="collapse">' +
            '<ul id="' + date.format('MMM_YYYY') + 'ul" class="list-group">' +
            '</ul>' +
            '</div>')
    }
    // if ($('#' + date.format('MMM_YYYY')))
    var list = document.createElement('li');
    $(list)
    .addClass('list-group-item')
    .html('<a href="form.html#' + i + '">' + date.format('M/DD/YYYY') + "</a>")
    .appendTo($('#' + date.format('MMM_YYYY') + 'ul'));
})