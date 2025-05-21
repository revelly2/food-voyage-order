
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FoodItem } from '@/utils/types';

interface FoodCardProps {
  food: FoodItem;
  onAddToCart: (food: FoodItem) => void;
  isInCart?: boolean;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onAddToCart, isInCart = false }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={food.image} 
          alt={food.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        {!food.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{food.name}</h3>
            <p className="text-gray-500 text-sm">{food.category}</p>
          </div>
          <span className="text-food-orange font-bold">${food.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-700 text-sm mt-2 line-clamp-2">{food.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full"
          variant={isInCart ? "secondary" : "default"}
          onClick={() => onAddToCart(food)}
          disabled={!food.available || isInCart}
        >
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
