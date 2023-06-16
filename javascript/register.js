$(document).ready( function () {

    $('.btn-register').click( function () {
        let registerMail = $('#register-mail').val();
        let registerPassword = $('#register-password').val();
        let registerConfirm = $('#register-confirmPassword').val();
        
        
        let user = JSON.parse(localStorage.getItem('user')) || [];
        let check = checkUser(user, registerMail);
        if ( registerMail == '' || registerPassword == '' || registerConfirm == '') {
            alert('Vui lòng nhập đủ thông tin.')
        } else if (check) {
            alert('Email bị trùng!');
        } else if ( registerConfirm != registerPassword) {
            alert('Mật khẩu và xác nhận không khớp!');
        } else {
            let objUser = {
                mail: registerMail,
                password: registerPassword
            }
            user.push(objUser);
            localStorage.setItem('user', JSON.stringify(user));
            alert('Đăng kí thành công');
            $('#register-mail').val('');
            $('#register-password').val('');
            $('#register-confirmPassword').val('');
            window.location.href = "loginUser.html";
        }
        
        

    })

})
function checkUser(arr, mail) {
    for ( let item of arr) {
        if (item.mail == mail) return true;
        else return false;
    }
}