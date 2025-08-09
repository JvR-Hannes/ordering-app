import { menuArray } from '/data.js'

const productMenu = document.getElementById('product-menu')
const orderSection = document.getElementById('orders')
const orderDetails = document.getElementById('order-items')
const completeOrderBtn = document.getElementById('complete-order-btn')
const paymentModal = document.getElementById('payment-modal')
const thankYouModal = document.getElementById('thank-you-modal')
const formDetails = document.getElementById('card-details')
const thanksMessage = document.getElementById('thanks-message-container')

let totalPrice = document.getElementById('total-price')
let order = []

menuArray.forEach(function (item) {
    productMenu.innerHTML += `
    <div class="products ">
             <img class="product-img" src="${item.image}" alt="${item.name}">
             <div class="product-text">
                 <h3 class="product-name">${item.name}</h3>
                 <p class="product-description">${item.ingredients.join(', ')}</p>
                 <p class="product-price">$${item.price}</p>
             </div>
             <button class="add-btn" data-id="${item.id}">+</button>
         </div>
    `
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-btn')) {
        const itemId = e.target.getAttribute('data-id')
        const menuItem = menuArray.find(i => i.id == itemId)

        if (!menuItem) return

        const orderItem = order.find(i => i.id == itemId)

        if (orderItem) {
            orderItem.quantity++
        }
        else {
            order.push({ ...menuItem, quantity: 1 })
        }

        renderOrder()
    }

})

function renderOrder() {
    if (order.length === 0) {
        orderSection.classList.add('hidden')
        return
    }

    orderSection.classList.remove('hidden')
    orderDetails.innerHTML = ''

    let total = 0
    order.forEach(item => {
        total += item.price * item.quantity
        orderDetails.innerHTML += `
        <div class="order-summary"> 
            <div class="order-details">
                <h3 class="product-name">${item.name} x ${item.quantity}</h3>
                <button class="remove-product-btn" data-id="${item.id}">Remove</button>
            </div>
            <p class="order-price">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        `
    })
    totalPrice.textContent = `$${total.toFixed(2)}`
}

orderDetails.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-product-btn')){
        const id = e.target.getAttribute('data-id')
        removeFromOrder(id)
    }
})

function removeFromOrder(id){
    order = order.filter(item => item.id != id)
    renderOrder()
}

completeOrderBtn.addEventListener('click', () =>{
    orderSection.classList.add('hidden')
    paymentModal.classList.remove('hidden')
})

formDetails.addEventListener('submit', (e) => {
    e.preventDefault()
    paymentModal.classList.add('hidden')
    thankYouModal.classList.remove('hidden')
    
    const formData = new FormData(e.target)
    const name = formData.get('username')
    
    thanksMessage.innerHTML = `<h2 class="message" id="thank-you-message">Thanks, ${name}! Your order is on its way!</h2>`
})