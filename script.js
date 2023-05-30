function updatePrice() {
    let prices = prods.map((pro) => {
        if (pro != null) {
            return pro.price.slice(1, pro.price.length);
        }
    });
    prices = prices.filter((pro) => {
        return typeof (pro) == "string";
    });
    console.log(prices);
    let total = prices.reduce((prev, next) => {
        return parseFloat(prev) + parseFloat(next);
    });
    totalAmt.innerText = `$${total}`;
}
const imageChange = document.querySelector('.myHeadO');
const totalAmt = document.querySelector('.total_price span');
window.addEventListener('DOMContentLoaded', () => {
    const remove = document.querySelectorAll('.remv');
    remove.forEach(remover => {
        remover.addEventListener('click', () => {
            let clickedProd = remover.parentElement.parentElement;
            let cliName = clickedProd.querySelector('h2');
            console.log(clickedProd);
            console.log(cliName.innerText);
            clickedProd.classList.add('fade_out');
            setTimeout(() => {
                clickedProd.classList.remove('fade_out');
                clickedProd.remove();
                localStorage.removeItem(cliName.innerText);
            }, 300);
            setTimeout(() => {
                updatePrice();
            }, 600);

            // * My Toast
            Toastify({
                text: `${cliName.innerText} removed from cart, UNDO`,
                duration: 4000,
                // destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#f99c15",
                },
                onClick: function () {
                    localStorage.setItem(cliName.innerText, );
                    // newProduct(cliName.innerText, price, image)
                } // Callback after click
            }).showToast();
        });
    })

    let random = Math.round(Math.random() * (12 - 1) + 1);
    console.log(random);
    imageChange.setAttribute('style', `background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(./images/bgs/bg${random}.png);`)
    if (random == 12) {
        const text = document.querySelector('.slidee p');
        const head = document.querySelector('.slidee h1');
        const but = document.querySelector('.slidee a');
        head.innerText = `Games are also cool!`;
        text.innerText = `You've gotta love games too ya know ... (This is an add).`;
        but.innerText = `Buy Shoes`;
    }

    const dec = document.querySelectorAll('.mins');
    const inc = document.querySelectorAll('.plus');
    console.log(dec);
    console.log(inc);

    let num = 1;
    inc.forEach(inc => {
        inc.addEventListener('click', () => {
            const no = inc.parentElement;
            const value = no.querySelector('.value');
            num++;

            value.innerText = num;
        })
    })
    dec.forEach(dec => {
        dec.addEventListener('click', () => {
            const no = dec.parentElement;
            const value = no.querySelector('.value');
            num--;
            if (num <= 0) {
                const ele = dec.parentElement.parentElement.parentElement;
                const h2 = ele.querySelector('h2');
                localStorage.removeItem(h2.innerText);
                ele.classList.add('fade_out');
                setTimeout(() => {
                    ele.classList.remove('fade_out');
                    ele.remove();
                }, 500);
                setTimeout(() => {
                    updatePrice();
                }, 600);
            }

            value.innerText = num;
        })
    })


    updatePrice();
});

const allShoeNames = JSON.parse(localStorage.getItem('allShoeNames'))
// const products = localStorage.getItem('')
console.log(allShoeNames);

const names = [
    'Cool Red Shoe',
    'Amazing Pattern Shoe',
    'Awesone Crazy Black Shoe',
    'Cool Black Palm Shoe',
    'Rubix Patterned Shoe',
    'Cool Blue',
    'Check Out Gold',
    'Cooler Blue',
    'Gold Boot',
    'Patterned with Red',
    'The Future Shoe (Self Lacing)',
    'This is Mad Right'
];
const prods = [];

for (let i = 0; i < names.length; i++) {
    // prods.push(names[i]);
    prods.push(JSON.parse(localStorage.getItem(names[i])));
}

console.log(prods);

const myCart = document.querySelector('.cart');

for (let i = 0; i < prods.length; i++) {
    if (prods[i] != null) {
        newProduct(prods[i].name, prods[i].price, prods[i].image);
    }
}

// class Product {
//     constructor(name, price, incart) {
//         this.name = name;
//         this.price = price;
//         this.incart = incart;
//     }
// }

function newProduct(name, price, image) {
    const product = document.createElement('div');
    product.className = `product ${name}`;
    product.innerHTML = `
    <div class="abt">
        <div class="img">
            <img src="${image}">
        </div>
        <div class="desc">
            <h2>${name}</h2>
            <p>${price}</p>
        </div>
    </div>
    <div class="cnge">
        <div class="numb">
            <div class="plus">+</div>
            <div class="value">1</div>
            <div class="mins">-</div>
        </div>
        <div class="remv">⨉</div>
    </div>
    `;

    myCart.append(product);
}