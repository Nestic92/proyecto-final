
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];
let filteredProducts = [];


const NES_TEC = [
    {
        id: 1,
        title: "Procesador AMD Ryzen 7 5800X",
        price: 505000,
        category: "procesadores",
        image: "imagenes/procesador_ryzen_5800x.jpg",
        specs: "8 núcleos, 16 hilos, 4.7GHz Max Boost"
    },
    {
        id: 2,
        title: "Tarjeta Gráfica NVIDIA RTX 4070",
        price: 867000,
        category: "tarjetas-graficas",
        image: "imagenes/tarjeta_grafica_nvidia_geforce_rtx_4070_12-gb-gddr6.jpg",
        specs: "12GB GDDR6X, DLSS 3, Ray Tracing"
    },
    {
        id: 3,
        title: "Memoria RAM Corsair Vengeance 32GB",
        price: 188000,
        category: "memorias-ram",
        image: "imagenes/ram_ddr4_corsair_vengeance_2x16_cl16_3200mhz.jpeg",
        specs: "DDR4 3200MHz, CL16, 2x16GB"
    },
    {
        id: 4,
        title: "SSD Samsung 970 EVO Plus 1TB",
        price: 173000,
        category: "almacenamiento",
        image: "imagenes/ssd_samsung_970_evo_plus_1tb.jpg",
        specs: "NVMe M.2, 3500MB/s lectura, 3300MB/s escritura"
    },
    {
        id: 5,
        title: "Placa Madre ASUS ROG Strix B550-F",
        price: 274500,
        category: "placas-madre",
        image: "imagenes/mother_asus_rog-strix_b550f_wifi.jpg",
        specs: "Socket AM4, PCIe 4.0, WiFi 6"
    },
    {
        id: 6,
        title: "Fuente de Poder Corsair RM750x",
        price: 188000,
        category: "fuentes-poder",
        image: "imagenes/fuente_corsair_rm-750x_80-plus-gold.webp",
        specs: "750W 80 Plus Gold, Modular"
    },
    {
        id: 7,
        title: "Gabinete NZXT H510 Elite",
        price: 217000,
        category: "gabinetes",
        image: "imagenes/gabinete_nzxt_h510_elite.jpg",
        specs: "Mid Tower, Vidrio Templado, RGB"
    },
    {
        id: 8,
        title: "Cooler CPU Noctua NH-D15",
        price: 144500,
        category: "enfriamiento",
        image: "imagenes/cooler_cpu_noctua_nh-D15.jpeg",
        specs: "Doble Torre, 2 Ventiladores, Compatible AM4/LGA1700"
    },
    {
        id: 9,
        title: "Procesador Intel Core i7-13700K",
        price: 607000,
        category: "procesadores",
        image: "imagenes/procesador_intel_core_i7-13700k.jpg",
        specs: "16 núcleos (8P+8E), 5.4GHz Turbo, LGA1700"
    },
    {
        id: 10,
        title: "Tarjeta Gráfica AMD RX 7800 XT",
        price: 795000,
        category: "tarjetas-graficas",
        image: "imagenes/tarjeta_gráfica_amd_rx_7800_xt.jpg",
        specs: "16GB GDDR6, FSR, Ray Accelerators"
    },
    {
        id: 11,
        title: "Fuente de Poder Seasonic Focus GX-850",
        price: 231000,
        category: "fuentes-poder",
        image: "imagenes/fuente de_poder_seasonic_focus_gx-850.jpg",
        specs: "850W 80 Plus Gold, Full Modular"
    },
    {
        id: 12,
        title: "Gabinete Lian Li PC-O11 Dynamic",
        price: 246000,
        category: "gabinetes",
        image: "imagenes/gabinete_lian_li_pc-O11_dynamic.webp",
        specs: "Doble Cámara, Vidrio Templado, Soporte para 9 ventiladores"
    }
];


const REVIEWS_API = 'https://jsonplaceholder.typicode.com/comments?_limit=6';


document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});


function initializeApp() {
    loadProducts();
    loadReviews();
    setupEventListeners();
    updateCartUI();
}


function setupEventListeners() {
    
    document.getElementById('cart-toggle').addEventListener('click', toggleCart);
    document.getElementById('close-cart').addEventListener('click', closeCart);
    document.getElementById('cart-overlay').addEventListener('click', closeCart);
    document.getElementById('checkout-btn').addEventListener('click', checkout);
    
    
    document.getElementById('search-input').addEventListener('input', filterProducts);
    document.getElementById('category-filter').addEventListener('change', filterProducts);
    
    
    document.getElementById('contact-form').addEventListener('submit', handleContactForm);
    
    
    setupSmoothScrolling();
}


async function loadProducts() {
    try {
        showLoading(true);
        
        
        products = NES_TEC;
        filteredProducts = [...products];
        
        displayProducts(products);
        showLoading(false);
    } catch (error) {
        console.error('Error al cargar productos:', error);
        showError('Error al cargar los componentes. Por favor, intenta nuevamente.');
        showLoading(false);
    }
}


function displayProducts(productsToDisplay) {
    const container = document.getElementById('products-grid');
    
    if (productsToDisplay.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4>No se encontraron componentes</h4>
                <p class="text-muted">Intenta con otros términos de búsqueda</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = productsToDisplay.map(product => {
        const badgeClass = `badge-${product.category}`;
        const categoryName = getCategoryName(product.category);
        
        return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card product-card h-100">
                <img src="${product.image}" 
                     class="card-img-top product-image" 
                     alt="${product.title}"
                     loading="lazy">
                <div class="card-body product-card-body d-flex flex-column">
                    <h5 class="product-title">${product.title}</h5>
                    <p class="product-specs">${product.specs}</p>
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="product-price">$${product.price}</span>
                            <span class="badge category-badge ${badgeClass}">${categoryName}</span>
                        </div>
                        <button class="btn btn-primary w-100 add-to-cart-btn" 
                                data-product-id="${product.id}"
                                data-product-title="${product.title}"
                                data-product-price="${product.price}"
                                data-product-image="${product.image}"
                                data-product-category="${product.category}">
                            <i class="fas fa-cart-plus me-2"></i>Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');
    
    
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}


function getCategoryName(category) {
    const categoryNames = {
        'procesadores': 'Procesadores',
        'tarjetas-graficas': 'Tarjetas Gráficas',
        'memorias-ram': 'Memorias RAM',
        'almacenamiento': 'Almacenamiento',
        'placas-madre': 'Placas Madre',
        'fuentes-poder': 'Fuentes de Poder',
        'gabinetes': 'Gabinetes',
        'enfriamiento': 'Enfriamiento'
    };
    return categoryNames[category] || category;
}


function filterProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    
    filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm) || 
                            product.specs.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || product.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    displayProducts(filteredProducts);
}


async function loadReviews() {
    try {
       
        const reviews = getFallbackReviews();
        displayReviews(reviews);
    } catch (error) {
        console.error('Error al cargar opiniones:', error);
        
        displayReviews([{
            id: 1,
            name: "Sistema",
            email: "info@pccomponentes.com",
            body: "Estamos cargando las opiniones de nuestros clientes. Por favor, vuelve pronto."
        }]);
    }
}


function displayReviews(reviews) {
    const container = document.getElementById('reviews-grid');
    
    container.innerHTML = reviews.map(review => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card review-card h-100">
                <div class="review-header">
                    <img src="https://i.pravatar.cc/100?img=${review.id}" 
                         alt="${review.name}" 
                         class="review-avatar">
                    <div>
                        <h6 class="mb-1">${review.name}</h6>
                        <div class="review-stars">
                            ${'★'.repeat(5)}
                        </div>
                    </div>
                </div>
                <p class="review-text">"${review.body}"</p>
                <small class="text-muted">${review.email}</small>
            </div>
        </div>
    `).join('');
}


function getFallbackReviews() {
    return [
        {
            id: 1,
            name: "Carlos",
            email: "carlos@email.com",
            body: "Excelente servicio y componentes de alta calidad. El Ryzen 7 funciona perfectamente, la entrega fue rápida y el empaque muy seguro."
        },
        {
            id: 2,
            name: "Ana",
            email: "ana@email.com",
            body: "La RTX 4070 superó todas mis expectativas. El rendimiento en juegos es increíble y la temperatura se mantiene muy baja. ¡Recomendado al 100%!"
        },
        {
            id: 3,
            name: "Miguel",
            email: "miguel@email.com",
            body: "Compré las memorias RAM Corsair y la diferencia de rendimiento es notable. Buen precio y calidad premium. Definitivamente vuelvo a comprar acá."
        },
        {
            id: 4,
            name: "Laura",
            email: "laura@email.com",
            body: "El soporte técnico me ayudó a elegir los componentes perfectos para mi PC de trabajo. Muy profesionales y atentos. Mi nueva PC funciona perfectamente."
        },
        {
            id: 5,
            name: "David",
            email: "david@email.com",
            body: "Componentes 100% originales y con garantía. El SSD Samsung es increíblemente rápido, mi sistema arranca en segundos. Muy confiable para mis proyectos."
        },
        {
            id: 6,
            name: "Sofía",
            email: "sofia@email.com",
            body: "El gabinete NZXT es hermoso y con excelente flujo de aire. La instalación fue sencilla y el cableado muy fácil de organizar. ¡Me encanta!"
        }
    ];
}


function displayReviews(reviews) {
    const container = document.getElementById('reviews-grid');
    
    container.innerHTML = reviews.map(review => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card review-card h-100">
                <div class="review-header">
                    <div class="review-avatar-placeholder">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="review-user-info">
                        <h6 class="mb-1">${review.name}</h6>
                        <div class="review-stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                </div>
                <p class="review-text">"${review.body}"</p>
                <small class="text-muted">Cliente verificado</small>
            </div>
        </div>
    `).join('');
}


function addToCart(event) {
    const button = event.currentTarget;
    const product = {
        id: parseInt(button.dataset.productId),
        title: button.dataset.productTitle,
        price: parseFloat(button.dataset.productPrice),
        image: button.dataset.productImage,
        category: button.dataset.productCategory,
        quantity: 1
    };
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }
    
    updateCartUI();
    showAlert('Componente agregado al carrito', 'success');
    
    
    button.classList.add('btn-success');
    setTimeout(() => {
        button.classList.remove('btn-success');
    }, 1000);
}


function updateCartUI() {
    updateCartCount();
    updateCartItems();
    updateCartTotal();
    saveCartToLocalStorage();
}


function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}


function updateCartItems() {
    const container = document.getElementById('cart-body');
    const emptyMessage = document.getElementById('empty-cart-message');
    
    if (cart.length === 0) {
        emptyMessage.style.display = 'block';
        container.innerHTML = '';
        return;
    }
    
    emptyMessage.style.display = 'none';
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" 
                 alt="${item.title}" 
                 class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title.substring(0, 30)}...</div>
                <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
                <div class="cart-item-controls mt-2">
                    <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    
    document.querySelectorAll('.decrease-quantity').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.increase-quantity').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeFromCart);
    });
}


function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}


function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function decreaseQuantity(event) {
    const productId = parseInt(event.currentTarget.dataset.id);
    const item = cart.find(item => item.id === productId);
    
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCartUI();
    }
}

function increaseQuantity(event) {
    const productId = parseInt(event.currentTarget.dataset.id);
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += 1;
        updateCartUI();
    }
}

function removeFromCart(event) {
    const productId = parseInt(event.currentTarget.dataset.id);
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showAlert('Componente eliminado del carrito', 'warning');
}


function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
    document.getElementById('cart-overlay').classList.toggle('active');
}

function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('active');
    document.getElementById('cart-overlay').classList.remove('active');
}


function checkout() {
    if (cart.length === 0) {
        showAlert('Tu carrito está vacío', 'warning');
        return;
    }
    
    
    showAlert('¡Compra realizada con éxito! Gracias por confiar en Nes>Tec.', 'success');
    
    
    cart = [];
    updateCartUI();
    closeCart();
}


async function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    
    if (!validateForm(form)) {
        showAlert('Por favor, completa todos los campos requeridos correctamente.', 'error');
        return;
    }
    
    try {
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
        submitBtn.disabled = true;
        
        
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showAlert('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            form.reset();
            form.classList.remove('was-validated');
        } else {
            throw new Error('Error en el envío');
        }
        
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        showAlert('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
    } finally {
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}


function validateForm(form) {
    form.classList.add('was-validated');
    
    const nombre = form.querySelector('#nombre');
    const email = form.querySelector('#email');
    const mensaje = form.querySelector('#mensaje');
    
    let isValid = true;
    
    if (!nombre.value.trim()) {
        isValid = false;
    }
    
    if (!email.value.trim() || !isValidEmail(email.value)) {
        isValid = false;
    }
    
    if (!mensaje.value.trim()) {
        isValid = false;
    }
    
    return isValid;
}


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header-section').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


function showLoading(show) {
    const loadingElement = document.getElementById('loading');
    const productsGrid = document.getElementById('products-grid');
    
    if (show) {
        loadingElement.style.display = 'block';
        productsGrid.style.display = 'none';
    } else {
        loadingElement.style.display = 'none';
        productsGrid.style.display = 'flex';
    }
}


function showAlert(message, type) {
    const alertClass = {
        'success': 'alert-success',
        'error': 'alert-danger',
        'warning': 'alert-warning',
        'info': 'alert-info'
    }[type] || 'alert-info';
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertClass} alert-dismissible fade show position-fixed`;
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    
    alertDiv.innerHTML = `
        <strong>${type === 'success' ? 'Éxito!' : type === 'error' ? 'Error!' : 'Atención!'}</strong>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}


function showError(message) {
    showAlert(message, 'error');
}


function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}


loadCartFromLocalStorage();