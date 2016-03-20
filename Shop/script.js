function check() {
  var inName = $("#inputLogin").val();
  if (inName == "admin") {
    $("#divLogin").removeClass("has-error");
    $("#iconLogin").removeClass("glyphicon-remove");
    $("#divLogin").addClass("has-success");
    $("#iconLogin").addClass("glyphicon-ok");
    var inPass = $("#inputPassword").val();
    if (inPass == "123456") {
      $("#divPassword").removeClass("has-error");
      $("#iconPassword").removeClass("glyphicon-remove");
      $("#divPassword").addClass("has-success");
      $("#iconPassword").addClass("glyphicon-ok");
    } else {
      $("#divPassword").removeClass("has-success");
      $("#iconPassword").removeClass("glyphicon-ok");
      $("#divPassword").addClass("has-error");
      $("#iconPassword").addClass("glyphicon-remove");
    }
  } else {
    $("#divLogin").removeClass("has-success");
    $("#iconLogin").removeClass("glyphicon-ok");
    $("#divLogin").addClass("has-error");
    $("#iconLogin").addClass("glyphicon-remove");
  }

}