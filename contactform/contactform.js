$(document).ready(function() {
  "use strict";

  //Contact
  $("form.contactForm").submit(function() {
    var f = $(this).find(".form-group"),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children("input").each(function() {
      // run all inputs

      var i = $(this); // current input
      var rule = i.attr("data-rule");

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(":", 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case "required":
            if (i.val() === "") {
              ferror = ierror = true;
            }
            break;

          case "minlen":
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case "email":
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case "checked":
            if (!i.is(":checked")) {
              ferror = ierror = true;
            }
            break;

          case "regexp":
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next(".validation")
          .html(
            ierror
              ? i.attr("data-msg") !== undefined
                ? i.attr("data-msg")
                : "wrong Input"
              : ""
          )
          .show("blind");
      }
    });
    f.children("textarea").each(function() {
      // run all inputs

      var i = $(this); // current input
      var rule = i.attr("data-rule");

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(":", 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case "required":
            if (i.val() === "") {
              ferror = ierror = true;
            }
            break;

          case "minlen":
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next(".validation")
          .html(
            ierror
              ? i.attr("data-msg") !== undefined
                ? i.attr("data-msg")
                : "wrong Input"
              : ""
          )
          .show("blind");
      }
    });

    var fromEmail = $("#email").val();
    var contactName = $("#name").val();
    var subject = $("#subject").val();
    var message = $("#message").val();

    if (fromEmail !== "" && subject !== "" && message !== "") {
      var data = {
        Name: contactName,
        Email:fromEmail,
        Subject:subject,
        Message:message
      };
      // Email.send({
      //   Host: "sbm-id.net",
      //   // Username: "username",
      //   // Password: "password",
      //   To: "contact@sbm-id.net",
      //   From: fromEmail,
      //   Subject: subject,
      //   Body: message
      // }).then(response => {
      //   console.log("response:" + response);
      // });

      $("#submitForm").prop("disabled", true);
      $.LoadingOverlay("show");


      $.ajax({
        type: "POST",
        url: "https://localhost:44319/api/Email",
        data: data,        
        dataType: "json"
      })
      .done( function(){
        console.log('email send!');
        $('#contactForm').trigger("reset");
        $("#submitForm").prop("disabled", false);
        $.LoadingOverlay("hide");
      })
      .fail(function(jqXHR, textStatus, errorThrown){
        console.error('email fail!');
        $('#errormessage').prop("hide", false);
        $('#errormessage').html(JSON.parse( jqXHR.responseText).Message);
        $("#submitForm").prop("disabled", false);
        $.LoadingOverlay("hide");
      });
    }

    return false;
  });
});
