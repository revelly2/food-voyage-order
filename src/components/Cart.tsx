
import React from 'react';
import { CartItem as CartItemType } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Minus, Trash, ShoppingCart } from 'lucide-react';

interface CartProps {
  items: CartItemType[];
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  checkout: () => void;
}

const Cart: React.FC<CartProps> = ({
  items,
  updateQuantity,
  removeItem,
  checkout
}) => {
  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.foodItem.price * item.quantity,
      0
    );
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <ShoppingCart className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some delicious items to your cart</p>
        <Button onClick={() => window.location.href = '/menu'}>Browse Menu</Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <CartItemCard
            key={item.foodItem.id}
            item={item}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        ))}
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>$2.99</span>
            </div>
            <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>${(calculateTotal() + 2.99).toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={checkout} className="w-full">
        Proceed to Checkout
      </Button>
    </div>
  );
};

interface CartItemCardProps {
  item: CartItemType;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  updateQuantity,
  removeItem
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <div className="w-24 h-24">
          <img
            src={item.foodItem.image}
            alt={item.foodItem.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4 flex-1">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium">{item.foodItem.name}</h3>
              <p className="text-sm text-gray-500">${item.foodItem.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => removeItem(item.foodItem.id)}
              className="text-gray-400 hover:text-food-red"
            >
              <Trash className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center mt-2">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => {
                  if (item.quantity > 1) {
                    updateQuantity(item.foodItem.id, item.quantity - 1);
                  }
                }}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-1">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.foodItem.id, item.quantity + 1)}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="ml-auto font-medium">
              ${(item.foodItem.price * item.quantity).toFixed(2)}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default Cart;
