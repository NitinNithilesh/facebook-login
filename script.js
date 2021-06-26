$(document).ready(function () {

  // add event listener on the login button

  $("#login").click(function () {

    facebookLogin();


  });

  // add event listener on the logout button

  $("#logout").click(function () {

    $("#logout").hide();
    $("#login").show();
    $("#status").empty();
    facebookLogout();

  });


  function facebookLogin() {
    FB.getLoginStatus(function (response) {
      console.log(response);
      statusChangeCallback(response);
    });
  }

  function statusChangeCallback(response) {
    console.log('Enna da idhu pithalam: ', response);

    if (response && response.authResponse && response.authResponse.accessToken) {
      var token = `<h2>TOKEN: ${response.authResponse.accessToken}</h2>`;
      $("#status").append(token);
    }

    if (response.status === "connected") {
      $("#login").hide();
      $("#logout").show();
      fetchUserProfile();
    }
    else {
      // Logging the user to Facebook by a Dialog Window
      facebookLoginByDialog();
    }
  }

  function fetchUserProfile() {
    // console.log('Welcome!  Fetching your information.... ');
    // FB.api('/me?fields=id,name,email,gender,birthday', function (response) {
    //   console.log(response);
    //   console.log('Successful login for: ' + response.name);
    //   var profile = `<h1>Welcome {response.name}<h1>
    //      <h2>Your email is ${response.email}</h2>
    //      <h3>Your Birthday is ${response.birthday}</h3>`;
    //   $("#status").append(profile);
    // });
  }

  function facebookLoginByDialog() {
    FB.login(function (response) {

      statusChangeCallback(response);

    }, { scope: 'public_profile,email, pages_show_list, pages_messaging, instagram_basic, instagram_manage_comments, instagram_manage_messages, pages_manage_metadata' });
  }

  // logging out the user from Facebook

  function facebookLogout() {
    FB.logout(function (response) {
      statusChangeCallback(response);
    });
  }


});