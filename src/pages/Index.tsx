
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-food-dark text-white">
        <div className="food-container py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Delicious Food,<br/>
                <span className="text-food-orange">Delivered Fast</span>
              </h1>
              <p className="text-lg text-gray-300">
                Order your favorite meals from the best restaurants in town and have them delivered right to your doorstep.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/menu')}
                  className="bg-food-orange hover:bg-food-orange/90 text-white"
                >
                  Browse Menu
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/signup')}
                  className="bg-transparent text-white border-white hover:bg-white/10"
                >
                  Sign Up Now
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <img 
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80" 
                alt="Delicious Food"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="bg-food-green p-2 rounded-full mr-4">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-bold">Fast Delivery</p>
                    <p className="text-gray-600 text-sm">30 min or less</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="food-container">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🍔",
                title: "Choose Your Food",
                description: "Browse our menu and select your favorite dishes"
              },
              {
                icon: "🛒",
                title: "Add to Cart",
                description: "Add items to your cart and proceed to checkout"
              },
              {
                icon: "🚚",
                title: "Fast Delivery",
                description: "Your food will be delivered quickly to your door"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16">
        <div className="food-container">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "Burgers",
                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80"
              },
              {
                name: "Pizza",
                image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80"
              },
              {
                name: "Salads",
                image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80"
              },
              {
                name: "Desserts",
                image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=400&q=80"
              }
            ].map((category, index) => (
              <div 
                key={index} 
                onClick={() => navigate('/menu')}
                className="relative rounded-lg overflow-hidden cursor-pointer group"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h3 className="text-white font-bold text-xl p-4">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-food-orange text-white">
        <div className="food-container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Sign up now and get free delivery on your first order
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/signup')}
            className="bg-white text-food-orange hover:bg-white/90"
          >
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
