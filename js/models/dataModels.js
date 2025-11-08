class Product {
    constructor(id, title, price, description, category, image, rating) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this.rating = rating;
        this.variants = [];
        this.images = [];
        this.inStock = true;
        this.stockQuantity = 0;
    }

    addVariant(size, color, price, stock) {
        this.variants.push({
            size: size,
            color: color,
            price: price,
            stock: stock,
            sku: `SKU-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        });
    }

    addImage(imageUrl) {
        this.images.push(imageUrl);
    }
}

class Category {
    constructor(id, name, description, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.productCount = 0;
    }
}

class Review {
    constructor(id, productId, userId, userName, rating, comment, date) {
        this.id = id;
        this.productId = productId;
        this.userId = userId;
        this.userName = userName;
        this.rating = rating;
        this.comment = comment;
        this.date = date;
        this.verifiedPurchase = false;
    }
}

class User {
    constructor(id, name, email, phone, address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.registrationDate = new Date();
        this.lastLogin = new Date();
    }
}

class Cart {
    constructor(userId) {
        this.userId = userId;
        this.items = [];
        this.total = 0;
        this.itemCount = 0;
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                product: product,
                quantity: quantity,
                addedAt: new Date()
            });
        }

        this.calculateTotal();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.calculateTotal();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.product.id === productId);

        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.calculateTotal();
            }
        }
    }

    calculateTotal() {
        this.total = this.items.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity);
        }, 0);

        this.itemCount = this.items.reduce((count, item) => count + item.quantity, 0);
    }

    clear() {
        this.items = [];
        this.total = 0;
        this.itemCount = 0;
    }
}

class Order {
    constructor(id, userId, items, total, shippingAddress, paymentMethod) {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.total = total;
        this.shippingAddress = shippingAddress;
        this.paymentMethod = paymentMethod;
        this.orderDate = new Date();
        this.status = 'pending';
        this.trackingNumber = null;
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }
}
class ApiStats {
    constructor() {
        this.requests = {
            products: 0,
            categories: 0,
            users: 0,
            reviews: 0,
            cart: 0,
            orders: 0,
            exchange: 0,
            weather: 0
        };
        this.lastUpdated = new Date();
    }

    incrementRequest(apiType) {
        if (this.requests[apiType] !== undefined) {
            this.requests[apiType]++;
            this.lastUpdated = new Date();
        }
    }

    getTotalRequests() {
        return Object.values(this.requests).reduce((sum, count) => sum + count, 0);
    }
}