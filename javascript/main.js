$(document).ready( function () {
    $('.img').click( function () {
        $('.nationals').toggleClass('active-display');
    })
    $('.currency').click( function () {
        $('.currencies').toggleClass('active-display');
    })

    $('.sort-r i').click( function () {
        $(this).toggleClass('active-sort-r');
    })
    $('.button-for-login').click( function () {
        window.open('./loginUser.html');
    })
    $('.button-for-register').click( function () {
        window.open('./register.html');
        
    })
    $('.button-for-admin').click( function () {
        window.open('./login.html');
        
    })
    $('.button-for-view-cart').click( function () {
        window.location.href = 'cart.html';
    })
    $('.button-for-logout').click( function () {
        window.location.href = 'loginUser.html';
    })
    $('.card-button').click( function () {
        $(this).parent().parent().css("background-color", "#ccffdb");;
        
    })


    
})



function addCardToMain() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    console.log(products);
    let rows = '';
    // img: img,
    // id: id,
    // name: namex,
    // descript: descript,
    // vote: vote,
    // weight: weight,
    // price: price,
    // discount: discount
    for( let item of products) {
        // xử lí vote
        let cardVote = '';
        if (item.vote <= 0){
            cardVote = `
                <i class='bx bx-star' ></i>
                <i class='bx bx-star' ></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                `;
        } else if( item.vote == 1) {
            cardVote = `
                <i class='bx bxs-star' ></i>
                <i class='bx bx-star' ></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                `;
        } else if( item.vote == 2) {
            cardVote = `
                <i class='bx bxs-star' ></i>
                <i class='bx bxs-star' ></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                `;
        } else if( item.vote == 3) {
            cardVote = `
                <i class='bx bxs-star' ></i>
                <i class='bx bxs-star' ></i>
                <i class='bx bxs-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                `;
        } else if( item.vote == 4) {
            cardVote = `
                <i class='bx bxs-star' ></i>
                <i class='bx bxs-star' ></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bx-star'></i>
                `;
        } else {
            cardVote = `
                <i class='bx bxs-star' ></i>
                <i class='bx bxs-star' ></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                `;
        };

        rows += `
            <div class="col-xl-3 col-lg-6 col-md-4 col-sm-6 col-12">
                <div class="card-item">
                    <div class="card-img">
                        <img src="../img/${item.img}" alt="" class="img-fluid">
                    </div>
                    <div class="card-content">
                        <h4>${item.name}</h4>
                        <h3>${item.descript}</h3>
                        <div class="card-vote  d-flex">
                            <div class="card-vote-star">`;

        rows += cardVote;

        rows += `       </div>
                            <span>(${item.vote}.0)</span>
                        </div>
                        <h4>${item.weight}</h4>
                        <div class="card-price">
                            <span class="price">
                                ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * (100 - item.discount)/100)}
                            </span>
                            <span class="sale">
                                ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                            </span>
                        </div>
                        <button type="button" class="card-button" onclick="AddProductToCart('${item.id}')">Add</button>
                    </div>
                </div>
            </div>
        `;

    }
    $('#palace-cart').html(rows);
}
addCardToMain();

function AddProductToCart(id) {
    // lấy carts
    // lấy products
    // tìm id trong products để thêm vào carts
    // kiểm tra trong cart có id chưa
    // nếu có thì không thêm nữa
    let carts = JSON.parse(localStorage.getItem('carts')) || [];
    let products = JSON.parse(localStorage.getItem('products')) || [];

    let a = products.find( x => x.id == id);
    let b = carts.findIndex(x => x.id == id);

    if (b == -1) {
        carts.push(a);
    }
    localStorage.setItem('carts', JSON.stringify(carts));
    addCardToCartlist();
}

function addCardToCartlist() {
    let carts = JSON.parse(localStorage.getItem('carts')) || [];
    let rows = '';
    let a = 0;
    for( let item of carts){
        rows += `
            <div class="cart-list-product d-flex align-items-center justify-content-between">
                <h5 class="close-cart-list-product" onclick="closeCartListProduct('${item.id}')"><i class='bx bx-x'></i></h5>
                <div class="cart-list-img">
                    <img src="../img/${item.img}" alt="">
                </div>
                <div class="cart-list-content">
                    <h3>${item.name}</h3>
                    <div class="cart-list-content-bt d-flex align-items-center">
                        <h4>1x</h4>
                        <h4>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * (100 - item.discount)/100)}</h4>
                    </div>
                </div>
            </div>
        `;
        a += Alltotal(item.price, item.discount, item.quantity);
    }
    $('.cart-list-item').html(rows);
    $('.cart-list-price-total').html(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a));
}
addCardToCartlist();



function Alltotal(money, discount, quantity){
    let totalMoney = (money*(100-discount)/100)*quantity;
    // $('#all-total-pay').val(totalMoney); 
    return totalMoney;
}

function closeCartListProduct(id) {
    let carts = JSON.parse(localStorage.getItem('carts'));
    let a = carts.findIndex( x => x.id == id);
    carts.splice(a, 1);
    
    localStorage.setItem('carts',JSON.stringify(carts));
    addCardToCartlist();
}
// admin
// let Admin = {
//     userAdmin: 'admin',
//     passwordAdmin: 'admin'
// }
// localStorage.setItem('admin',JSON.stringify(Admin));

// new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(1000)
// item.price * (100 - item.discount)/100


/* <div class="col-xl-3 col-lg-6 col-md-4 col-sm-6 col-12">
                <div class="card-item">
                    <div class="card-img">
                        <img src="../img/${item.img}" alt="" class="img-fluid">
                    </div>
                    <div class="card-content">
                        <h4>${item.name}</h4>
                        <h3>${item.descript}</h3>
                        <div class="card-vote  d-flex">
                            <div class="card-vote-star">
                            <i class='bx bxs-star' ></i>
                            <i class='bx bxs-star' ></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bx-star'></i>
                            <i class='bx bx-star'></i>
                            </div>
                            <span>(4.0)</span>
                        </div>
                        <h4>${item.weight}</h4>
                        <div class="card-price">
                            <span class="price">
                                $${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * (100 - item.discount)/100)}
                            </span>
                            <span class="sale">
                                $${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                            </span>
                        </div>
                        <button type="button" class="card-button" onclick="AddProductToCart('${item.id}')">Add</button>
                    </div>
                </div>
            </div> */