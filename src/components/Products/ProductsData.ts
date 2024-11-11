import type { Product } from '../../types';


export interface ProductData extends Product {
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

export const mockProducts: Record<string, ProductData[]> = {
    dth: [
        {
            id: '1',
            name: 'HD Set-Top Box',
            description: 'High-definition set-top box with recording capabilities',
            price: 2499,
            category: 'dth',
            stock: 50,
            image: 'https://images.unsplash.com/photo-1540821924489-7690c70c4eac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
            // specifications: {
            //     'Resolution': '1080p Full HD',
            //     'Storage': '500GB HDD',
            //     'Connectivity': 'HDMI, USB',
            //     'Power': 'DC 12V',
            //     'Warranty': '1 Year',
            // },
            // features: [
            //     'Live TV Recording',
            //     'Pause & Rewind Live TV',
            //     'Program Guide',
            //     'Parental Control',
            //     'Multi-language Support'
            // ]
        },
        {
            id: '2',
            name: 'Premium DTH Dish',
            description: '90cm dish antenna with mounting kit',
            price: 1999,
            category: 'dth',
            stock: 30,
            image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
        },
    ],
    networking: [
        {
            id: '3',
            name: 'Dual-Band Router',
            description: 'High-speed WiFi 6 router for seamless streaming',
            price: 3499,
            category: 'networking',
            stock: 25,
            image: 'https://images.unsplash.com/photo-1544408945-2ed27873c8c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
        },
        {
            id: '4',
            name: 'Network Cable Kit',
            description: 'CAT6 cable kit with connectors and crimping tool',
            price: 999,
            category: 'networking',
            stock: 100,
            image: 'https://images.unsplash.com/photo-1551498406-76c7c4a51c93?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
        },
    ],
    accessories: [
        {
            id: '5',
            name: 'HDMI Cable Pack',
            description: '4K-ready HDMI cables, 2m length',
            price: 499,
            category: 'accessories',
            stock: 200,
            image: 'https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
        },
        {
            id: '6',
            name: 'Universal Remote',
            description: 'Compatible with all major DTH brands',
            price: 299,
            category: 'accessories',
            stock: 150,
            image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
        },
    ],
};