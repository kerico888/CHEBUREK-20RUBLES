const products = [
    // 5 НЕ ОСТРЫХ
    { id: 1, name: "Чебурек Классический", desc: "Отборное мясо говядины, репчатый лук, специи.", category: "mild", price: 50 },
    { id: 2, name: "Чебурек Со свининой", desc: "Сочная свинина, лук, свежая зелень.", category: "mild", price: 50 },
    { id: 3, name: "Чебурек С сыром", desc: "Тянущийся сыр сулугуни и свежая петрушка.", category: "mild", price: 50 },
    { id: 4, name: "Чебурек С курицей и грибами", desc: "Нежное куриное филе, шампиньоны, лук.", category: "mild", price: 50 },
    { id: 5, name: "Чебурек С картофелем", desc: "Картофельное пюре, обжаренный лук, укроп.", category: "mild", price: 50 },

    // 7 ОСТРЫХ
    { id: 6, name: "Чебурек с Халапеньо", desc: "Говядина, перец халапеньо, острые специи.", category: "spicy", price: 50 },
    { id: 7, name: "Чебурек Дьявольский", desc: "Острая свинина, перец чили, чеснок.", category: "spicy", price: 50 },
    { id: 8, name: "Чебурек Мексиканский", desc: "Фарш микс, кукуруза, фасоль, соус табаско.", category: "spicy", price: 50 },
    { id: 9, name: "Чебурек С бараниной и чесноком", desc: "Рубленая баранина, чеснок, черный перец.", category: "spicy", price: 50 },
    { id: 10, name: "Чебурек Курица Карри", desc: "Курица, острая приправа карри, кайенский перец.", category: "spicy", price: 50 },
    { id: 11, name: "Чебурек Охотничий", desc: "Охотничьи колбаски, острый соус Шрирача.", category: "spicy", price: 50 },
    { id: 12, name: "Чебурек Азиатский", desc: "Свинина, васаби, имбирь, соевый соус.", category: "spicy", price: 50 }
];

let cart = [];

const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');

// Рендер карточек
function renderProducts(filter = 'all') {
    productGrid.innerHTML = '';

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const badgeText = product.category === 'spicy' ? 'ОСТРЫЙ 🌶' : 'НЕ ОСТРЫЙ';
        const badgeClass = product.category === 'spicy' ? 'spicy' : 'mild';

        card.innerHTML = `
            <div class="badge ${badgeClass}">${badgeText}</div>
            <div class="product-title">${product.name}</div>
            <div class="product-desc">${product.desc}</div>
            <div class="product-bottom">
                <div class="price">${product.price} ₽</div>
                <button class="add-btn" onclick="addToCart(${product.id})">В корзину</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Фильтрация
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.filter);
    });
});

// Добавление в корзину
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

// Обновление корзины
function updateCart() {
    cartCount.innerText = cart.length;

    // Группировка товаров для отображения
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Корзина пуста</p>';
    } else {
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price} ₽ <button onclick="removeFromCart(${index})" style="background:none; border:none; cursor:pointer; font-weight:bold;">[X]</button></span>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
        cartTotalPrice.innerText = total;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Открытие / Закрытие модального окна
openCartBtn.onclick = () => cartModal.style.display = 'flex';
closeCartBtn.onclick = () => cartModal.style.display = 'none';
window.onclick = (e) => { if (e.target === cartModal) cartModal.style.display = 'none'; };

// Инициализация
renderProducts();