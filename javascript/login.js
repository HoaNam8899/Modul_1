$(document).ready( function () {
    $( ".btn-login" ).click( function() {
        let loginEmail = $('#login-email').val();
        let loginPassword = $('#login-password').val();

        let admin = JSON.parse(localStorage.getItem("admin"));
        console.log(admin)
        if (admin.userAdmin == loginEmail && admin.passwordAdmin == loginPassword) {
            window.location.href = "administration.html";
        } else {
            alert('Wrong Email or Password!!')
        }
      } );

})