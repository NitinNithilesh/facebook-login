$(document).ready(function () {
  $("#login").click(function () {
    facebookLogin();
  });

  function facebookLogin() {
    FB.getLoginStatus(function (response) {
      console.log(response);
      statusChangeCallback(response);
    });
  }

  function statusChangeCallback(response) {
    if (response && response.authResponse && response.authResponse.accessToken) {
      var token = `<h3>${response.authResponse.accessToken}</h6>`;
      $("#status").append(token);
    } else {
      facebookLoginByDialog();
    }
  }

  function facebookLoginByDialog() {
    FB.login(function (response) {
      statusChangeCallback(response);
    }, { scope: 'public_profile,email, pages_show_list, pages_messaging, instagram_basic, instagram_manage_comments, instagram_manage_messages, pages_manage_metadata' });
  }
});