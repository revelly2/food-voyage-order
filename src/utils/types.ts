
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

export type OrderStatus = 'pending' | 'approved' | 'completed';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface SalesRecord {
  totalOrders: number;
  totalRevenue: number;
  completedOrders: number;
}

// Mock data
export const mockFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, and special sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    category: 'Burgers',
    available: true
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella cheese, and basil on thin crust',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    category: 'Pizza',
    available: true
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce, croutons, parmesan cheese with Caesar dressing',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    category: 'Salads',
    available: true
  },
  {
    id: '4',
    name: 'Chicken Wings',
    description: 'Spicy buffalo wings served with blue cheese dip',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    category: 'Appetizers',
    available: true
  },
  {
    id: '5',
    name: 'Chocolate Brownie',
    description: 'Rich chocolate brownie with vanilla ice cream',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    category: 'Desserts',
    available: true
  },
  {
    id: '6',
    name: 'Pasta Carbonara',
    description: 'Creamy pasta with bacon and parmesan cheese',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
    category: 'Pasta',
    available: true
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    items: [
      {
        foodItem: mockFoodItems[0],
        quantity: 2
      },
      {
        foodItem: mockFoodItems[4],
        quantity: 1
      }
    ],
    total: 32.97,
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    userId: '2',
    items: [
      {
        foodItem: mockFoodItems[1],
        quantity: 1
      }
    ],
    total: 14.99,
    status: 'approved',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    userId: '1',
    items: [
      {
        foodItem: mockFoodItems[2],
        quantity: 1
      },
      {
        foodItem: mockFoodItems[3],
        quantity: 1
      }
    ],
    total: 21.98,
    status: 'completed',
    createdAt: new Date().toISOString()
  }
];

export const mockSalesRecord: SalesRecord = {
  totalOrders: 38,
  totalRevenue: 876.45,
  completedOrders: 32
};

// Mock authentication data
export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  }
];
