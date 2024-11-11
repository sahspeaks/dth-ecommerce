export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image: string;
    // specifications: Record<string, string>;
    // features: string[];
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
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    createdAt: string;
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