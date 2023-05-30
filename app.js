const allShoeNames = document.querySelectorAll('.shoe h2');
localStorage.setItem('allShoeNames', JSON.stringify(allShoeNames));
console.log(allShoeNames);

const indicator = document.querySelector('.indicator');
let noOfItems = 0;

const cartBtns = document.querySelectorAll('.carter');
// const myProducts = [];

cartBtns.forEach(cartBtn => {
    let numberInCart;
    cartBtn.addEventListener('click', function carter() {
        noOfItems++;
        indicator.innerText = noOfItems;
        if (noOfItems >= 1) {
            indicator.style.display = 'flex';
        }

        // * Shoe clicked on
        const clickedShoe = this.parentElement.parentElement;
        const removeCart = clickedShoe.querySelector('.in_cart');
        // * To add
        removeCart.classList.add('is_cart');
        this.classList.add('carted');
        // * To remove
        removeCart.addEventListener('click', () => {
            removeCart.classList.remove('is_cart');
            this.classList.remove('carted');
            numberInCart = 0;
            shoeObject.number = numberInCart;
            console.log(shoeObject.number);
            console.log(shoeObject);
            localStorage.setItem(shoeName, JSON.stringify(shoeObject));
            // myProducts.
            localStorage.removeItem(shoeName);

            noOfItems--;
            indicator.innerText = noOfItems;
            if (noOfItems === 0) {
                indicator.style.display = 'none';
            }
        })

        // * Number in cart
        numberInCart = 1;
        console.log(numberInCart);

        // * Shoe details
        const shoeImage = clickedShoe.querySelector('img').src;
        console.log(shoeImage);
        const shoeName = clickedShoe.querySelector('h2').innerText;
        console.log(shoeName);
        const shoePrice = clickedShoe.querySelector('.ctrls > p').innerText;
        console.log(shoePrice);

        // * Product object
        const shoeObject = {
            name: shoeName,
            image: shoeImage,
            price: shoePrice,
            number: numberInCart
        }
        console.log(shoeObject.number);
        // myProducts.push(shoeObject);


        console.log(shoeObject);
        localStorage.setItem(shoeName, JSON.stringify(shoeObject));
        // localStorage.setItem('Shoe', JSON.stringify(myProducts));

        // * My Toast
        Toastify({
            text: `${shoeName} successfully added to cart. VIEW CART`,
            duration: 4000,
            destination: "cart.html",
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#f99c15",
            },
            // onClick: function(){} // Callback after click
          }).showToast();
    });
});

// AbortSignal


const search = document.querySelector('.sort .input .search input');
const searchBtn = document.querySelector('.sort .input .search button');
const myShoeSearches = document.querySelectorAll('.shoe');
// myShoeSearches.forEach(search => {
//     console.log(search.getAttribute('data-search'));
// })l
search.addEventListener('keyup', () => {
    const filter = search.value;
    const searchMatch = [];
    myShoeSearches.forEach(shoe => {
        shoe.style.display = 'none';
        if (shoe.getAttribute('data-search').includes(filter.toUpperCase())) {
            shoe.style.display = 'flex';
            searchMatch.push(shoe);
        }
    });
});
