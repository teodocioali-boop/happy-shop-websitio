class App {
    constructor() {
        this.apiService = new ApiService();
        this.currentSection = 'productList';
        this.currentProductId = null;
        this.currentCategory = null;
        this.cart = new Cart(1);
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupEventDelegation();
        this.updateApiStats();
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.getAttribute('data-tab');
                this.switchSection(section);
            });
        });
    }

    setupEventDelegation() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-detail-btn')) {
                const productId = e.target.getAttribute('data-product-id');
                this.showProductDetail(productId);
            }
            
            if (e.target.classList.contains('add-cart-btn')) {
                const productId = e.target.getAttribute('data-product-id');
                this.addToCart(productId);
            }
            if (e.target.classList.contains('view-category-btn')) {
                const category = e.target.getAttribute('data-category');
                this.showProductsByCategory(category);
            }
            if (e.target.classList.contains('browse-products-btn')) {
                this.switchSection('productList');
            }
        });
    }

    switchSection(section) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-tab="${section}"]`).classList.add('active');
        
        this.currentSection = section;
        this.loadSectionContent(section);
    }

    async loadSectionContent(section) {
        const container = document.getElementById('contentArea');
        
        try {
            container.innerHTML = '<div class="loading">Cargando...</div>';

            switch(section) {
                case 'productList':
                    await this.loadProducts(container);
                    break;
                case 'productDetail':
                    if (this.currentProductId) {
                        await this.loadProductDetail(container, this.currentProductId);
                    } else {
                        container.innerHTML = `
                            <div class="content-section">
                                <div class="content-header">
                                    <h2> Detalle de Producto</h2>
                                </div>
                                <div class="loading">
                                    <p>Selecciona un producto de la lista para ver sus detalles</p>
                                    <button class="btn btn-primary" onclick="app.switchSection('productList')">
                                        Ver Lista de Productos
                                    </button>
                                </div>
                            </div>
                        `;
                    }
                    break;
                case 'categories':
                    await this.loadCategories(container);
                    break;
                case 'filteredProducts':
                    if (this.currentCategory) {
                        await this.loadFilteredProducts(container, this.currentCategory);
                    } else {
                        container.innerHTML = `
                            <div class="content-section">
                                <div class="content-header">
                                    <h2> Productos Filtrados</h2>
                                </div>
                                <div class="loading">
                                    <p>Selecciona una categoría para ver los productos</p>
                                    <button class="btn btn-primary" onclick="app.switchSection('categories')">
                                        Ver Categorías
                                    </button>
                                </div>
                            </div>
                        `;
                    }
                    break;
                case 'reviews':
                    if (this.currentProductId) {
                        await this.loadProductReviews(container, this.currentProductId);
                    } else {
                        container.innerHTML = `
                            <div class="content-section">
                                <div class="content-header">
                                    <h2> Opiniones de Productos</h2>
                                </div>
                                <div class="loading">
                                    <p>Selecciona un producto para ver sus opiniones</p>
                                    <button class="btn btn-primary" onclick="app.switchSection('productList')">
                                        Ver Lista de Productos
                                    </button>
                                </div>
                            </div>
                        `;
                    }
                    break;
                case 'userProfile':
                    await this.loadUserProfile(container);
                    break;
                case 'shoppingCart':
                    await this.loadShoppingCart(container);
                    break;
                case 'orderHistory':
                    await this.loadOrderHistory(container);
                    break;
            }

            this.updateApiStats();
            
        } catch (error) {
            container.innerHTML = `<div class="error">Error al cargar: ${error.message}</div>`;
        }
    }
    async loadProducts(container) {
        const products = await this.apiService.getProducts();
        container.innerHTML = `
            <div class="content-section">
                <div class="content-header">
                    <h2> Lista de Productos</h2>
                    <span>${products.length} productos encontrados</span>
                </div>
            </div>
        `;
        UIComponents.displayProducts(container, products);
    }
    async showProductDetail(productId) {
        this.currentProductId = productId;
        await this.loadSectionContent('productDetail');
    }

    async loadProductDetail(container, productId) {
        const product = await this.apiService.getProductDetail(productId);
        container.innerHTML = `
            <div class="content-section">
                <div class="content-header">
                    <h2> Detalle de Producto</h2>
                    <button class="back-button" onclick="app.switchSection('productList')">
                        ← Volver a la lista
                    </button>
                </div>
            </div>
        `;
        UIComponents.displayProductDetail(container, product);
    }
    async loadCategories(container) {
        const categories = await this.apiService.getCategories();
        container.innerHTML = `
            <div class="content-section">
                <div class="content-header">
                    <h2>🏷️ Categorías de Productos</h2>
                    <span>${categories.length} categorías</span>
                </div>
            </div>
        `;
        UIComponents.displayCategories(container, categories);
    }
    async showProductsByCategory(category) {
        this.currentCategory = category;
        await this.loadSectionContent('filteredProducts');
    }

    async loadFilteredProducts(container, category) {
        const products = await this.apiService.getProductsByCategory(category);
        container.innerHTML = `
            <div class="content-section">
                <div class="content-header">
                    <h2> Productos en: ${UIComponents.capitalizeFirstLetter(category)}</h2>
                    <button class="back-button" onclick="app.switchSection('categories')">
                        ← Volver a categorías
                    </button>
                </div>
            </div>
        `;
        UIComponents.displayFilteredProducts(container, products, category);
    }
    async loadProductReviews(container, productId) {
        const reviews = await this.apiService.getProductReviews(productId);
        container.innerHTML = `
            <div class="content-section">
                <div class="content-header">
                    <h2> Opiniones del Producto</h2>
                    <button class="back-button" onclick="app.switchSection('productDetail')">
                        ← Volver al producto
                    </button>
                </div>
            </div>
        `;
        UIComponents.displayReviews(container, reviews);
    }
    async loadUserProfile(container) {
        const user = await this.apiService.getUserProfile();
        container.innerHTML = `
            <div class="content-section">
                <div class="content-header">
                    <h2> Perfil de Usuario</h2>
                </div>
            </div>
        `;
        UIComponents.displayUserProfile(container, user);
    }
    async loadShoppingCart(container) {
        container.innerHTML = `
            <div class="content-section">
                <div class="content-header">
                    <h2> Carrito de Compras</h2>
                    <span>${this.cart.itemCount} productos</span>
                </div>
            </div>
        `;
        UIComponents.displayCart(container, this.cart);
    }
    async loadOrderHistory(container) {
        const orders = await this.apiService.getOrderHistory();
        container.innerHTML = `
            <div class="content-section">
                <div class="content-header">
                    <h2> Historial de Pedidos</h2>
                    <span>${orders.length} pedidos encontrados</span>
                </div>
            </div>
        `;
        UIComponents.displayOrderHistory(container, orders);
    }
    async addToCart(productId) {
        try {
            const product = await this.apiService.getProductDetail(productId);
            this.cart.addItem(product, 1);
            alert(` "${product.title}" agregado al carrito!`);
            if (this.currentSection === 'shoppingCart') {
                this.loadSectionContent('shoppingCart');
            }
            
        } catch (error) {
            alert('Error al agregar producto al carrito');
        }
    }
    async updateApiStats() {
        const stats = this.apiService.getApiStats();
        const container = document.getElementById('apiStats');
        
        const exchangeData = await this.apiService.getExchangeRate();
        
        container.innerHTML = `
            <div class="api-stats-grid">
                <div class="api-stat-card">
                    <h4> Total de Requests</h4>
                    <div class="api-stat-number">${stats.getTotalRequests()}</div>
                    <p>APIs consumidas</p>
                </div>
                <div class="api-stat-card">
                    <h4> Productos</h4>
                    <div class="api-stat-number">${stats.requests.products}</div>
                    <p>Solicitudes</p>
                </div>
                <div class="api-stat-card">
                    <h4> Reseñas</h4>
                    <div class="api-stat-number">${stats.requests.reviews}</div>
                    <p>Solicitudes</p>
                </div>
                <div class="api-stat-card">
                    <h4> Tipo de Cambio</h4>
                    <div class="api-stat-number">${exchangeData ? exchangeData.rates.BOB?.toFixed(2) || 'N/A' : 'N/A'}</div>
                    <p>BOB por USD</p>
                </div>
            </div>
        `;
    }
}
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new App();
});