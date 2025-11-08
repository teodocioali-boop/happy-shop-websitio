class UIComponents {
    static truncateText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    static capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static generateStarRating(rating) {
        if (!rating) return '☆☆☆☆☆';
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
    }
    static displayProducts(container, products, currentPage = 1, itemsPerPage = 8) {
        if (!products || products.length === 0) {
            container.innerHTML = '<div class="loading">No se encontraron productos</div>';
            return;
        }
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedProducts = products.slice(startIndex, endIndex);
        const totalPages = Math.ceil(products.length / itemsPerPage);

        const productsHTML = paginatedProducts.map(product => {
            const rating = product.rating ? product.rating.rate : 0;
            const count = product.rating ? product.rating.count : 0;
            
            return `
                <div class="product-card" data-product-id="${product.id}">
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <div class="product-title">${this.truncateText(product.title, 50)}</div>
                    <div class="product-price">Bs. ${(product.price * 6.96).toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="btn btn-primary view-detail-btn" data-product-id="${product.id}">
                            Ver detalle
                        </button>
                        <button class="btn btn-success add-cart-btn" data-product-id="${product.id}">
                             Agregar
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        const filtersHTML = `
        `;
        const paginationHTML = `
            <div class="pagination">
                <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">
                    ← Anterior
                </button>
                <span class="pagination-info">
                    Página ${currentPage} de ${totalPages}
                </span>
                <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">
                    Siguiente →
                </button>
            </div>
        `;

        container.innerHTML = `
            ${filtersHTML}
            <div class="content-section">
                <div class="content-header">
                    <h2> Lista de Productos</h2>
                </div>
                <div class="products-grid">
                    ${productsHTML}
                </div>
                ${paginationHTML}
            </div>
        `;
    }
    static displayProductDetail(container, product) {
        if (!product) {
            container.innerHTML = '<div class="loading">No se pudo cargar el producto</div>';
            return;
        }
        const allImages = [product.image, ...(product.images || [])];
        const galleryHTML = allImages.map((img, index) => `
        `).join('');
        const variantsHTML = product.variants && product.variants.length > 0 
            ? `
                <div class="variant-selection">
                    <strong>Tallas disponibles:</strong>
                    <div class="variant-options">
                        ${product.variants.map(variant => `
                            <div class="variant-option" data-variant='${JSON.stringify(variant).replace(/'/g, "&apos;")}'>
                                ${variant.size} - ${variant.color}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `
            : '';
        const relatedProductsHTML = `
        `;

        container.innerHTML = `
            <div class="content-section">
                <div class="content-header">
                    <h2> Detalle de Producto</h2>
                </div>
                
                <div class="product-detail">
                    <div class="detail-images">
                        <div class="image-gallery">
                            <img src="${product.image}" alt="${product.title}" class="main-image" id="mainImage">
                            <div class="thumbnail-grid">
                                ${galleryHTML}
                            </div>
                        </div>
                    </div>

                    <div class="detail-info">
                        <h3>${product.title}</h3>
                        <div class="product-price-large">Bs. ${(product.price * 6.96).toFixed(2)}</div>
                        
                        <p><strong>Descripción:</strong> ${product.description}</p>
                        <p><strong>Categoría:</strong> ${this.capitalizeFirstLetter(product.category)}</p>
                        <p><strong>Stock disponible:</strong> ${product.stockQuantity || 0} unidades</p>
                        <p><strong>Calificación:</strong> ${this.generateStarRating(product.rating?.rate || 0)} (${product.rating?.count || 0} reseñas)</p>
                        
                        ${variantsHTML}
                    </div>
                </div>
                
                ${relatedProductsHTML}
            </div>
        `;
    }
static displayCategories(container, categories) {
    if (!categories || categories.length === 0) {
        container.innerHTML = '<div class="loading">No se encontraron categorías</div>';
        return;
    }

    const categoriesHTML = categories.map(category => {
        const description = this.getCategoryDescription(category.name);
        
        return `
            <div class="category-card" data-category="${category.name}">
                <h4>${this.capitalizeFirstLetter(category.name)}</h4>
                <p>${description}</p>
                <p><strong>${category.productCount || 0} productos</strong></p>
                <button class="btn btn-primary view-category-btn" data-category="${category.name}">
                    Ver Productos
                </button>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="content-section">
            <div class="content-header">
                <h2>Categorías de Productos</h2>
            </div>
            <div class="categories-list">
                ${categoriesHTML}
            </div>
        </div>
    `;
}
    static displayFilteredProducts(container, products, category, filters = {}) {
        if (!products || products.length === 0) {
            container.innerHTML = `
                <div class="loading">
                    No se encontraron productos en la categoría ${this.capitalizeFirstLetter(category)}
                </div>
            `;
            return;
        }
        const filterSummaryHTML = `
            <div class="filter-summary">
                <strong> Filtro actual:</strong> "Categoría: ${this.capitalizeFirstLetter(category)}"
                ${filters.priceRange ? ` / Precio: ${filters.priceRange}` : ''}
                ${filters.sortBy ? ` / Orden: ${filters.sortBy}` : ''}
                <div class="filter-tags">
                    <span class="filter-tag">
                        ${this.capitalizeFirstLetter(category)}
                        <span class="remove" onclick="app.clearCategoryFilter()">×</span>
                    </span>
                    ${filters.priceRange ? `
                        <span class="filter-tag">
                            Precio: ${filters.priceRange}
                            <span class="remove" onclick="app.clearPriceFilter()">×</span>
                        </span>
                    ` : ''}
                </div>
            </div>
        `;

        const productsHTML = products.map(product => {
            const rating = product.rating ? product.rating.rate : 0;
            const count = product.rating ? product.rating.count : 0;
            
            return `
                <div class="product-card" data-product-id="${product.id}">
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <div class="product-title">${this.truncateText(product.title, 50)}</div>
                    <div class="product-price">Bs. ${(product.price * 6.96).toFixed(2)}</div>
                    <div class="product-rating">
                        ${this.generateStarRating(rating)}
                        <span>(${count})</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary view-detail-btn" data-product-id="${product.id}">
                            Ver Detalle
                        </button>
                        <button class="btn btn-success add-cart-btn" data-product-id="${product.id}">
                            🛒 Agregar
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="content-section">
                <div class="content-header">
                    <h2>Productos Filtrados</h2>
                </div>
                ${filterSummaryHTML}
                <div class="products-grid">
                    ${productsHTML}
                </div>
            </div>
        `;
    }
    static displayReviews(container, reviews, productId) {
        if (!reviews || reviews.length === 0) {
            container.innerHTML = `
                <div class="loading">
                    <p>No hay reseñas para este producto</p>
                    <button class="btn btn-primary" onclick="app.showReviewForm()">✏️ Escribir primera opinión</button>
                </div>
            `;
            return;
        }

        const averageRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length;

        const reviewsHTML = reviews.map(review => `
            <div class="review-card">
                <div class="review-rating">
                    ${this.generateStarRating(review.rating)}
                </div>
                <p class="review-comment">"${review.comment || 'Sin comentario'}"</p>
                <div class="review-meta">
                    <span class="review-author">${review.userName || 'Usuario anónimo'}</span>
                    <span class="review-date">${review.date ? new Date(review.date).toLocaleDateString() : 'Fecha desconocida'}</span>
                </div>
            </div>
        `).join('');
        const reviewFormHTML = `
            <div class="review-form">
                <h4> ESCRIBE TU OPINION </h4>
                <textarea placeholder="" style="width: 100%; height: 100px; padding: 10px; border: 4px solid #050505ff; border-radius: 5px; margin: 10px 0;"></textarea>
                <button class="btn btn-success" onclick="app.submitReview(${productId})">Enviar Opinión</button>
            </div>
        `;

        container.innerHTML = `
            <div class="content-section">
                <div class="content-header">
                    <h2> Opiniones del Producto</h2>
                </div>
                
                <div class="reviews-section">
                    <div class="reviews-summary">
                        <h3>Opiniones de Clientes</h3>
                        <div class="average-rating">
                            <strong>Calificación promedio:</strong>
                            ${this.generateStarRating(averageRating)}
                            <span>(${reviews.length} reseñas)</span>
                        </div>
                    </div>
                    
                    <div class="reviews-list">
                        ${reviewsHTML}
                    </div>
                    
                    ${reviewFormHTML}
                </div>
            </div>
        `;
    }
    static displayUserProfile(container, user, recentOrders = []) {
        if (!user) {
            container.innerHTML = '<div class="loading">No se pudo cargar el perfil de usuario</div>';
            return;
        }
        const recentOrdersHTML = recentOrders.slice(0, 3).map(order => `
            <div class="order-summary" style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 5px 0;">
                <strong>Pedido #${order.id}</strong> - ${order.orderDate.toLocaleDateString()} - 
                <span class="status-${order.status}">${this.getStatusText(order.status)}</span> - 
                Bs. ${order.total.toFixed(2)}
            </div>
        `).join('');

        container.innerHTML = `
            <div class="content-section">
                <div class="content-header">
                    <h2> Perfil de Usuario</h2>
                </div>
                
                <div class="user-profile">
                    <div class="profile-header" style="display: flex; align-items: center; gap: 20px; margin-bottom: 30px;">
                        <div class="avatar" style="width: 80px; height: 80px; background: #3498db; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">
                            ${user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h3>${user.name || 'Usuario'}</h3>
                            <p>Miembro desde ${user.registrationDate ? user.registrationDate.toLocaleDateString() : 'fecha reciente'}</p>
                        </div>
                    </div>

                    <div class="profile-details">
                        <div class="profile-field">
                            <label>Nombre Completo</label>
                            <div>${user.name || 'No especificado'}</div>
                        </div>
                        <div class="profile-field">
                            <label>Correo Electrónico</label>
                            <div>${user.email || 'No especificado'}</div>
                        </div>
                        <div class="profile-field">
                            <label>Teléfono</label>
                            <div>${user.phone || 'No especificado'}</div>
                        </div>
                        <div class="profile-field">
                            <label>Dirección de Envío</label>
                            <div>${user.address ? `${user.address.street}, ${user.address.city}, ${user.address.zipcode}` : 'No especificada'}</div>
                        </div>
                    </div>

                    ${recentOrders.length > 0 ? `
                        <div class="recent-orders" style="margin-top: 30px;">
                            <h4>📦 Historial Reciente</h4>
                            ${recentOrdersHTML}
                            <button class="btn btn-primary" onclick="app.switchSection('orderHistory')" style="margin-top: 10px;">
                                Ver historial completo
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    static displayCart(container, cart) {
        if (!cart || !cart.items || cart.items.length === 0) {
            container.innerHTML = `
                <div class="empty-cart">
                    <h3> Tu Carrito está Vacío</h3>
                    <p>Agrega algunos productos para continuar</p>
                    <button class="btn btn-primary browse-products-btn">Ver Productos</button>
                </div>
            `;
            return;
        }

        const cartItemsHTML = cart.items.map(item => `
            <div class="cart-item">
                <img src="${item.product.image}" alt="${item.product.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${this.truncateText(item.product.title, 40)}</h4>
                    <div class="item-price">Bs. ${(item.product.price * 6.96).toFixed(2)} c/u</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease-btn" data-product-id="${item.product.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase-btn" data-product-id="${item.product.id}">+</button>
                    </div>
                </div>
                <div class="item-total">
                    Bs. ${(item.product.price * item.quantity * 6.96).toFixed(2)}
                </div>
                <button class="btn btn-secondary remove-item-btn" data-product-id="${item.product.id}">
                </button>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="content-section">
                <div class="content-header">
                    <h2> Carrito de Compras</h2>
                </div>
                
                <div class="cart-container">
                    <div class="cart-items">
                        ${cartItemsHTML}
                    </div>
                    
                    <div class="cart-summary">
                        <div class="summary-row">
                            <span>Subtotal:</span>
                            <span>Bs. ${cart.total ? (cart.total * 6.96).toFixed(2) : '0.00'}</span>
                        </div>
                        <div class="summary-row">
                            <span>Envío:</span>
                            <span>Bs. 15.00</span>
                        </div>
                        <div class="summary-row total">
                            <span>Total:</span>
                            <span>Bs. ${cart.total ? (cart.total * 6.96 + 15).toFixed(2) : '15.00'}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    static displayOrderHistory(container, orders) {
        if (!orders || orders.length === 0) {
            container.innerHTML = '<div class="loading">No hay pedidos registrados</div>';
            return;
        }

        const ordersHTML = orders.map(order => `
            <tr class="order-row">
                <td>#${order.id}</td>
                <td>${order.orderDate.toLocaleDateString()}</td>
                <td>${order.items.length} productos</td>
                <td><span class="status-${order.status}">${this.getStatusText(order.status)}</span></td>
                <td>Bs. ${order.total.toFixed(2)}</td>
                <td>
                    <button class="btn btn-primary view-order-btn" data-order-id="${order.id}">
                        Ver Detalle
                    </button>
                </td>
            </tr>
        `).join('');

        container.innerHTML = `
            <div class="content-section">
                <div class="content-header">
                    <h2> Historial de Pedidos</h2>
                </div>
                
                <div class="orders-table-container">
                    <table class="orders-table">
                        <thead>
                            <tr>
                                <th>N° Pedido</th>
                                <th>Fecha</th>
                                <th>Productos</th>
                                <th>Estado</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${ordersHTML}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    static getCategoryIcon(categoryName) {
        const icons = {
            'parlantes': '🔊',
            'audifonos': '🎧',
            'personalizacion': '🎨',
            'electronics': '📱',
            'jewelery': '💎',
            'men\'s clothing': '👔',
            'women\'s clothing': '👗'
        };
        return icons[categoryName] || '📦';
    }

    static getCategoryDescription(categoryName) {
        const descriptions = {
            'parlantes': 'Parlantes Bluetooth y sistemas de audio portátiles',
            'audifonos': 'Audífonos inalámbricos, con cable y para gaming',
            'personalizacion': 'Tazas, retratos, llaveros y más productos personalizados',
            'electronics': 'Dispositivos electrónicos y tecnología',
            'jewelery': 'Joyas y accesorios de lujo',
            'men\'s clothing': 'Ropa y moda masculina',
            'women\'s clothing': 'Ropa y moda femenina'
        };
        return descriptions[categoryName] || 'Productos varios';
    }

    static getStatusText(status) {
        const statusMap = {
            'pending': 'Pendiente',
            'processing': 'Procesando',
            'shipped': 'Enviado',
            'delivered': 'Entregado',
            'cancelled': 'Cancelado'
        };
        return statusMap[status] || status;
    }

    static changeMainImage(thumbnail, newImageSrc) {
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        thumbnail.classList.add('active');
        const mainImage = document.getElementById('mainImage');
        if (mainImage) {
            mainImage.src = newImageSrc;
        }
    }
}