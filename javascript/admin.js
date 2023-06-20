$(document).ready( function () {
    $( ".btn-home" ).click( function() {
        window.open('./main.html');
    } );
    $( ".btn-logout" ).click( function() {
        window.location.href = 'login.html';
    } );

    $('.btn-add').click( function () {

        let products = JSON.parse(localStorage.getItem('products')) || [];

        let id = $('#id-product').val();
        let img = $('#img-product').prop('files')[0].name;
        let namex = $('#name-product').val();
        let descript = $('#descript-product').val();
        let vote = $('#vote-product').val();
        let weight = $('#weight-product').val();
        let price= $('#price-product').val();
        let discount = $('#discount-product').val();
        // kiểm tra id
        let check = checkId(products, id);
        if (check) {
            alert('bị trùng Id');
        } else {
            let objProduct = {
                img: img,
                id: id,
                name: namex,
                descript: descript,
                vote: vote,
                weight: weight,
                price: price,
                discount: discount,
                quantity: 1
            }
            products.push(objProduct);
            clearInfo();
        }
        localStorage.setItem('products',JSON.stringify(products));
        // in ra table
        inserInfo(); 
    })

    $('.btn-save').click( function () {
        let products = JSON.parse(localStorage.getItem('products')) || [];

        let id = $('#id-product').val();
        let img = $('#img-product').prop('files')[0].name;
        let namex = $('#name-product').val();
        let descript = $('#descript-product').val();
        let vote = $('#vote-product').val();
        let weight = $('#weight-product').val();
        let price= $('#price-product').val();
        let discount = $('#discount-product').val();

        let a = products.find( x => x.id == id)

        a.name = namex;
        a.descript = descript;
        a.vote = vote;
        a.weight = weight;
        a.price = price;
        a.discount = discount;
        a.img = img;

        localStorage.setItem('products', JSON.stringify(products));
        inserInfo();
        $('#id-product').prop( "disabled", false );
        clearInfo();
    })

})
function checkId(arr, ids){
    if (arr.find( x => x.id == ids)){
        return true;
    }  else return false;
}

function inserInfo() {
    let rows = '';
    let products = JSON.parse(localStorage.getItem('products'));
    products = products.sort((p1, p2) => parseInt(p1.price) - parseInt(p2.price));
    for( let item of products) {
        rows += `
            <tr>
                <td>${item.id}</td>
                <td>
                    <img src="../img/${item.img}" alt="">
                </td>
                <td>${item.name}</td>
                <td>${item.descript}</td>
                <td>${item.vote}</td>
                <td>${item.weight}</td>
                <td>${item.price}</td>
                <td>${item.discount}</td>
                <td>
                    <button type="button" class="btn btn-success mb-1" onclick="adjustProduct('${item.id}')" >Adjust</button>
                    <button type="button" class="btn btn-danger" onclick="deleteProduct('${item.id}')" >Delete</button>
                </td>
            </tr>
        `;
    }

    $('#list-product').html(rows);

}

function adjustProduct(pId){
    let products = JSON.parse(localStorage.getItem('products'));

    let a = products.find( x => x.id == pId);
    $('#id-product').val(a.id);
    $('#id-product').prop( "disabled", true );
    $('#name-product').val(a.name);
    $('#descript-product').val(a.descript);
    $('#vote-product').val(a.vote);
    $('#weight-product').val(a.weight);
    $('#price-product').val(a.price);
    $('#discount-product').val(a.discount);

    // prop( "disabled", true )
}
function deleteProduct(pId) {
    let products = JSON.parse(localStorage.getItem('products'));
    if(confirm('bạn có muốn xóa')){
        let a = products.findIndex( x => x.id == pId);
        products.splice(a, 1);
    }
    localStorage.setItem('products',JSON.stringify(products));
    inserInfo();
    clearInfo();
}
function clearInfo() {
    $('#id-product').val('');
    $('#name-product').val('');
    $('#descript-product').val('');
    $('#vote-product').val('');
    $('#weight-product').val('');
    $('#price-product').val('');
    $('#discount-product').val('');
    $('#id-product').prop( "disabled", false );
}
inserInfo();

    // lấy item từ storage
    // lấy id input
    // gửi item lên input
    // chỉnh sửa lại ngoại trừ id
    // bấm nut lưu, lấy id tìm lại trong item để gán lại