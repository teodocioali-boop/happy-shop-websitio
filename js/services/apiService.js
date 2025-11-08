class ApiService {
    constructor() {
        this.baseUrls = {
            products: 'https://fakestoreapi.com',
            users: 'https://jsonplaceholder.typicode.com',
            exchange: 'https://api.exchangerate-api.com/v4/latest',
            quotes: 'https://api.quotable.io',
            countries: 'https://restcountries.com/v3.1'
        };

        this.apiStats = new ApiStats();
    }
    async getProducts(limit = 12) {
        try {
            this.apiStats.incrementRequest('products');
            const customProducts = this.getCustomProducts();
            return customProducts.slice(0, limit);
            
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
    getCustomProducts() {
        return [
            new Product(
                1,
                "Parlante Bluetooth JBL Flip 5",
                45.99,
                "Parlante portátil resistente al agua con sonido de alta calidad",
                "parlantes",
                "https://media.istockphoto.com/id/1199491696/es/foto/altavoz-bluetooth-port%C3%A1til-con-mango-de-silicona-aislado-en-fondo-blanco.webp?a=1&b=1&s=612x612&w=0&k=20&c=Sdg4RFxmuzRQPdY8bXng2njDLz06D8rGu8WP0xrv9Yk=",
                { rate: 4.8, count: 124 }
            ),
            new Product(
                2,
                "Parlante Inalámbrico Sony SRS-XB23",
                38.50,
                "Parlante extra bass con iluminación LED y 12 horas de batería",
                "parlantes",
                "https://images.unsplash.com/photo-1617766376513-148515e5d3b8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFybGFudGUlMjBzb255fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
                { rate: 4.6, count: 89 }
            ),
            new Product(
                3,
                "Mini Parlante Anker Soundcore",
                25.99,
                "Parlante compacto con calidad de sonido premium",
                "parlantes",
                "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
                { rate: 4.7, count: 156 }
            ),
            new Product(
                4,
                "Audífonos Inalámbricos Sony WH-1000XM4",
                89.99,
                "Audífonos noise cancelling con calidad de sonido excepcional",
                "audifonos",
                "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXVkaWZvbm9zJTIwc29ueXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
                { rate: 4.9, count: 203 }
            ),
            new Product(
                5,
                "AirPods Pro 2da Generación",
                79.50,
                "Audífonos true wireless con cancelación activa de ruido",
                "audifonos",
                "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEFpclBvZHMlMjBQcm98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
                { rate: 4.8, count: 178 }
            ),
            new Product(
                6,
                "Audífonos Gamer Razer Kraken",
                42.75,
                "Audífonos para gaming con iluminación RGB y micrófono",
                "audifonos",
                "https://images.unsplash.com/photo-1673669236244-60f764c15f27?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXVyaWN1bGFyZXMlMjBibHVldG90aHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
                { rate: 4.5, count: 95 }
            ),
            new Product(
                7,
                "Taza Personalizada Cerámica 350ml",
                8.99,
                "Taza de cerámica para personalizar con tu foto o diseño",
                "personalizacion",
                "https://media.istockphoto.com/id/1466645776/photo/white-cup-with-spanish-writing-life-is-better-with-you.jpg?s=612x612&w=0&k=20&c=pnFx-_lDi4kO90YI7Ni9rawQwgbZ-3CBDyQwhbVRiMg=",
                { rate: 4.7, count: 312 }
            ),
            new Product(
                8,
                "Taza Térmica Acero Inoxidable",
                15.50,
                "Taza térmica para personalizar, mantiene temperatura 12 horas",
                "personalizacion",
                "https://media.istockphoto.com/id/2234404077/photo/blue-mug-with-heart-and-up-to-50-off-tag-prominent-discount-discount-season.jpg?s=1024x1024&w=is&k=20&c=WcxS_H0WasdlBod90OgaZZm2CkAm2P-wTRS8BJ_k768=",
                { rate: 4.6, count: 145 }
            ),
            new Product(
                9,
                "Retrato Digital Personalizado",
                24.99,
                "Retrato digital profesional a partir de tu foto",
                "personalizacion",
                "https://media.istockphoto.com/id/688307378/photo/picture-of-a-beautiful-happy-family-on-a-frame-at-home.jpg?s=612x612&w=0&k=20&c=3Akk69aszJaQB4jjtIcTwNynCQsqJ7F242lC9Tlw6eE=",
                { rate: 4.9, count: 87 }
            ),
            new Product(
                10,
                "Targetas personalizadas ",
                45.00,
                "Targetas personalizadas en PBC",
                "personalizacion",
                "https://media.istockphoto.com/id/171267440/es/foto/tarjeta-de-identidad.webp?a=1&b=1&s=612x612&w=0&k=20&c=pB1_H1Z4tDZvobo-HRWhjFi-CyzEQnjYtsP-gFL6QEU=",
                { rate: 4.8, count: 64 }
            ),
            new Product(
                11,
                "Llavero Personalizado Acrílico",
                5.99,
                "Llavero de acrílico con tu diseño o foto",
                "personalizacion",
                "https://media.istockphoto.com/id/881702394/photo/blank-metal-round-black-and-white-key-chain-mock-up.jpg?s=1024x1024&w=is&k=20&c=bDuTnRAoa_oKKdwN7VUT58qbEzWIWt2-uVcmADPCAYo=",
                { rate: 4.4, count: 198 }
            ),
            new Product(
                12,
                "Llavero Metálico Grabado",
                7.50,
                "Llavero de metal con grabado láser personalizado",
                "personalizacion",
                "https://media.istockphoto.com/id/2173135811/photo/branded-plastic-hotel-keychain-mockup-3d-rendering.jpg?s=1024x1024&w=is&k=20&c=6suHtfQBXYRvCfJElh20F5LSf2n39C0faBOFZcwsVx8=",
                { rate: 4.5, count: 123 }
            )
        ];
    }
    async getProductDetail(productId) {
        try {
            this.apiStats.incrementRequest('products');
            const products = this.getCustomProducts();
            const productData = products.find(p => p.id === parseInt(productId));
            
            if (!productData) {
                throw new Error('Producto no encontrado');
            }

            const product = new Product(
                productData.id,
                productData.title,
                productData.price,
                productData.description,
                productData.category,
                productData.image,
                productData.rating
            );

            product.stockQuantity = Math.floor(Math.random() * 50) + 10;
            
            return product;
        } catch (error) {
            console.error('Error fetching product detail:', error);
            throw error;
        }
    }
    async getCategories() {
        try {
            this.apiStats.incrementRequest('categories');
            
            const categories = [
                new Category(1, 'parlantes', 'Parlantes y sistemas de audio portátiles', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop'),
                new Category(2, 'audifonos', 'Audífonos inalámbricos y con cable', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop'),
                new Category(3, 'personalizacion', 'Productos personalizados: tazas, retratos y llaveros', 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop')
            ];
            const products = this.getCustomProducts();
            categories.forEach(category => {
                category.productCount = products.filter(p => 
                    p.category === category.name
                ).length;
            });

            return categories;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
    async getProductsByCategory(category) {
        try {
            this.apiStats.incrementRequest('products');
            const products = this.getCustomProducts();
            return products.filter(product => product.category === category);
        } catch (error) {
            console.error('Error fetching products by category:', error);
            throw error;
        }
    }
    async getProductReviews(productId) {
        try {
            this.apiStats.incrementRequest('reviews');
            const reviews = [];
            const reviewCount = Math.floor(Math.random() * 8) + 3;
            
            const reviewTexts = [
                "Excelente producto, superó mis expectativas!",
                "Muy buena calidad, lo recomiendo",
                "Buen producto por el precio",
                "Llegó rápido y en perfecto estado",
                "No es lo que esperaba, calidad regular",
                "Increíble relación calidad-precio",
                "El color es diferente en persona",
                "Perfecto, exactamente lo que necesitaba"
            ];
            
            for (let i = 0; i < reviewCount; i++) {
                reviews.push(new Review(
                    `rev_${productId}_${i}`,
                    productId,
                    `user_${i}`,
                    `Cliente ${i + 1}`,
                    Math.floor(Math.random() * 5) + 1,
                    reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
                    new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
                ));
            }
            
            return reviews;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    }
async getUserProfile(userId = 1) {
    try {
        this.apiStats.incrementRequest('users');
        const response = await fetch(`${this.baseUrls.users}/users/${userId}`);
        const userData = await response.json();
        
        return new User(
            userData.id,
            "Teodocio Ali Laura",      
            "teodocio.ali@uab.edu.bo",      
            '+591 63260860',
            {
                street: 'Oficina central El Alto - Bolivia',
                city: 'La Paz',
                zipcode: 'Ciudad Satellite'
            }
        );
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}
    async getCart(userId = 1) {
        try {
            this.apiStats.incrementRequest('cart');
            const products = this.getCustomProducts().slice(0, 3);
            const cart = new Cart(userId);
            
            products.forEach((product, index) => {
                cart.addItem(product, index + 1);
            });
            
            return cart;
        } catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    }
    async getOrderHistory(userId = 1) {
        try {
            this.apiStats.incrementRequest('orders');
            const orders = [];
            const orderCount = Math.floor(Math.random() * 5) + 2;
            const products = this.getCustomProducts().slice(0, 6);
            
            const statuses = ['delivered', 'pending', 'shipped'];
            
            for (let i = 0; i < orderCount; i++) {
                const orderItems = [];
                const itemCount = Math.floor(Math.random() * 2) + 1;
                
                for (let j = 0; j < itemCount; j++) {
                    const product = products[Math.floor(Math.random() * products.length)];
                    orderItems.push({
                        product: product,
                        quantity: Math.floor(Math.random() * 2) + 1,
                        price: product.price
                    });
                }
                
                const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const status = statuses[Math.floor(Math.random() * statuses.length)];
                
                const order = new Order(
                    `ORD-${Date.now()}-${i}`,
                    userId,
                    orderItems,
                    total,
                    {
                        street: 'Av. Las Palmas 123',
                        city: 'La Paz',
                        zipcode: '12345'
                    },
                    ['credit_card', 'paypal', 'cash'][Math.floor(Math.random() * 3)]
                );
                
                order.status = status;
                order.orderDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
                
                if (status === 'shipped') {
                    order.trackingNumber = `TRK${Math.random().toString(36).substr(2, 10).toUpperCase()}`;
                }
                
                orders.push(order);
            }
            
            return orders.sort((a, b) => b.orderDate - a.orderDate);
        } catch (error) {
            console.error('Error fetching order history:', error);
            throw error;
        }
    }
    async getExchangeRate() {
        try {
            this.apiStats.incrementRequest('exchange');
            const response = await fetch(`${this.baseUrls.exchange}/USD`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            throw error;
        }
    }

    async getRandomQuote() {
        try {
            const response = await fetch(`${this.baseUrls.quotes}/random`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching quote:', error);
            throw error;
        }
    }

    getApiStats() {
        return this.apiStats;
    }
}
