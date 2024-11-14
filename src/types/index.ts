export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image: string;
    addImages: string[];
    specifications: string[];
    features: string[];
  }
  
  export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    type: 'installation' | 'repair' | 'support';
    duration: string;
  }

  export interface User {
    _id: string;
    email: string;
    username: string;
    phone: string;
    address: string;
    avatar: string;
    role: 'admin' | 'customer';
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    createdAt: string;
    shippingAddress: string;
  }