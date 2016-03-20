document.write('<div class="col-md-6 col-md-offset-3">');

document.write('<table class="table table-bordered table-condensed">');

document.write('<tr>');
for (var i = 0; i < 11; i++) {
  if (i == 0) {
    document.write('<td></td>');
  } else {
    document.write('<td id="c' + i + '">' + i + '</td>');
  }
}
document.write('</tr>');

for (var i = 1; i < 11; i++) {
  document.write('<tr>');
  for (var j = 0; j < 11; j++) {
    if (j == 0) {
      document.write('<td id="r' + i + '">' + i + '</td>');
    } else {
      document.write('<td data-row="' + i + '" data-col="' + j + '">' + (i * j) + '</td>');
    }
  }  
  document.write('</tr>');
}

document.write('</table>');

document.write('</div>');

$('td').hover(
  function() {
    $(this).addClass('btn-success');
    var row = 'r' + $(this).attr('data-row');
    $('#' + row).addClass('btn-success');
    var col = 'c' + $(this).attr('data-col');
    $('#' + col).addClass('btn-success');
  },
  function() {
    $(this).removeClass('btn-success');
    var row = 'r' + $(this).attr('data-row');
    $('#' + row).removeClass('btn-success');
    var col = 'c' + $(this).attr('data-col');
    $('#' + col).removeClass('btn-success');
  }
);