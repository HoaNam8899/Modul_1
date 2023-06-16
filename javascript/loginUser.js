$(document).ready( function () {
    $( ".btn-loginUser" ).click( function() {
        let loginEmail = $('#loginUser-email').val();
        let loginPassword = $('#loginUser-password').val();

        let user = JSON.parse(localStorage.getItem("user"));
        let check = checkUser(user, loginEmail, loginPassword);
        if (check) {
            window.location.href = "main.html";
        } else {
            alert('Sai tài khoản hoặc mật khẩu');
        }
      } );

})
function checkUser(arr, mails, passs) {
    if (arr.find( x => x.mail == mails) && arr.find( y => y.password == passs)){
        return true;
    }  else return false;
}