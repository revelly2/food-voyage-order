
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FoodCard from '@/components/FoodCard';
import { FoodItem, CartItem, mockFoodItems } from '@/utils/types';
import { Search, ShoppingCart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface MenuProps {
  isLoggedIn: boolean;
  cartItems: CartItem[];
  addToCart: (food: FoodItem) => void;
}

const Menu: React.FC<MenuProps> = ({ isLoggedIn, cartItems, addToCart }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [foodItems, setFoodItems] = useState<FoodItem[]>(mockFoodItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>(mockFoodItems);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(mockFoodItems.map(item => item.category)))];

  // Handle filtering and searching
  useEffect(() => {
    let items = foodItems;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      items = items.filter(item => item.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      items = items.filter(
        item => 
          item.name.toLowerCase().includes(term) || 
          item.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredItems(items);
  }, [foodItems, selectedCategory, searchTerm]);

  const handleAddToCart = (food: FoodItem) => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please log in to add items to your cart",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    addToCart(food);
    toast({
      title: "Item added",
      description: `${food.name} has been added to your cart`,
    });
  };

  const isInCart = (id: string) => {
    return cartItems.some(item => item.foodItem.id === id);
  };

  return (
    <div className="food-container py-8">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Our Menu</h1>
          <p className="text-gray-600 mb-4 md:mb-0">
            Browse our delicious selection of food
          </p>
        </div>
        
        <div className="flex w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {isLoggedIn && (
            <Button 
              variant="outline"
              className="ml-2 relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-food-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
      
      {/* Categories */}
      <div className="flex overflow-x-auto py-4 mb-6 gap-2 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`whitespace-nowrap px-4 py-2 ${
              selectedCategory === category ? "bg-food-orange text-white" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      {/* Food Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onAddToCart={handleAddToCart}
              isInCart={isInCart(food.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-2">No results found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filter to find what you're looking for
          </p>
          <Button onClick={() => {
            setSearchTerm('');
            setSelectedCategory('All');
          }}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Menu;
