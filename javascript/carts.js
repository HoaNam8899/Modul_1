$(document).ready( function () {
    $('.btn-for-return-to-shoping').click( function () {
        window.location.href = 'main.html';
    })
})

function addInfoToCart(){
    let carts = JSON.parse(localStorage.getItem('carts')) || [];
    let rows = '';
    let a = 0;
    for( let item of carts){
        rows += `
            <div class="pay-list-item d-flex justify-content-around">
                <img src="../img/${item.img}" alt="">
                <div class="pay-list pay-list-one d-flex flex-column">
                    <span>${item.name}</span>
                    <span>Quantity: ${item.weight}</span>
                </div>
                <div class="pay-list d-flex flex-column">
                    <span>Price (+ Discount)</span>
                    <!-- them class -->
                    <span><b>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * (100 - item.discount)/100)}</b></span>
                </div>
                <div class="pay-list d-flex flex-column">
                    <span>Qty</span>
                    <div class="d-flex qty align-items-center">
                        <button type="button" class="btn  btn-qty" onclick="subQuantity('${item.id}')">-</button>
                        <h4 id="qty-product">${item.quantity}</h4>
                        <button type="button" class="btn  btn-qty" onclick="addQuantity('${item.id}')">+</button>
                    </div>
                </div>
                <div class="pay-list d-flex flex-column">
                    <span>Total</span>
                    <span class="all-money">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((item.price * (100 - item.discount)/100)*item.quantity)}</span>
                </div>
                <div class="pay-list d-flex flex-column">
                    <span>action</span>
                    <span class="pay-list-remove" onclick="payListRemove('${item.id}')">Remove</span>
                </div>
            </div>
        `;
        a += Alltotal(item.price, item.discount, item.quantity);
        
    }
    $('.cart-pay-list').html(rows);
    console.log(a);
    // tổng tiền
    $('#all-total-pay').html(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a));
    
}

function payListRemove(pId) {
    let carts = JSON.parse(localStorage.getItem('carts'));

    if(confirm('bạn có muốn xóa')){
        let a = carts.findIndex( x => x.id == pId);
        carts.splice(a, 1);
    }
    localStorage.setItem('carts',JSON.stringify(carts));
    addInfoToCart();
    if(carts.length == 0){
        $('.cart-pay-list').html('');
    }

}
function addQuantity(id) {
    let carts = JSON.parse(localStorage.getItem('carts'));

    let a = carts.find( x => x.id == id);
    a.quantity += 1;
    
    localStorage.setItem('carts', JSON.stringify(carts));
    addInfoToCart();
}
function subQuantity(id) {
    let carts = JSON.parse(localStorage.getItem('carts'));

    let a = carts.find( x => x.id == id);
    if (a.quantity > 1){
        a.quantity -= 1;
    } else {
        a.quantity = 1;
    }
    
    localStorage.setItem('carts', JSON.stringify(carts));
    addInfoToCart();
}

function Alltotal(money, discount, quantity){
    let totalMoney = (money*(100-discount)/100)*quantity;
    // $('#all-total-pay').val(totalMoney); 
    return totalMoney;
}
Alltotal();
addInfoToCart();

// new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(1000)
// item.price * (100 - item.discount)/100
// (item.price * (100 - item.discount)/100)*item.quantity