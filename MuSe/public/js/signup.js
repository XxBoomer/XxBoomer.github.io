$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var firstNameInput = $("input#firstName-input");
  var lastNameInput = $("input#lastName-input");
  var bioInput = $("textarea#bio-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {

    event.preventDefault();
    var userData = {
      email: emailInput.val(),
      password: passwordInput.val(),
      firstName: lastNameInput.val(),
      lastName: firstNameInput.val(),
      bio: bioInput.val()
    };
    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
      return;
    }
    // If we have an email and password, run the signUpUser function

    signUpUser(userData.email, userData.password, userData.firstName, userData.lastName, userData.bio);
    emailInput.val("");
    passwordInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
    bioInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, firstName, lastName, bio) {

    $.post("/api/signup", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      bio: bio
    })
      .then(function (data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
