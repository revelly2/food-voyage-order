
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { LoginForm, SignupForm } from "./components/AuthForms";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";
import UserDashboard from "./pages/UserDashboard";
import Cart from "./components/Cart";
import { CartItem, User, mockUsers } from "./utils/types";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Check if user is logged in from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Find user from mock data
    const foundUser = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      const userInfo = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      };
      setUser(userInfo);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(userInfo));
    }
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // Simulate user creation
    const newUser = {
      id: `${mockUsers.length + 1}`,
      name,
      email,
      role: 'user' as 'user' | 'admin'
    };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCartItems([]);
    localStorage.removeItem('user');
  };

  const addToCart = (food: any) => {
    setCartItems(prev => [...prev, { foodItem: food, quantity: 1 }]);
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.foodItem.id === itemId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.foodItem.id !== itemId));
  };

  const handleCheckout = () => {
    // Clear cart after checkout
    setCartItems([]);
  };

  const renderCartPage = () => {
    return (
      <div className="food-container py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <Cart 
          items={cartItems}
          updateQuantity={updateCartQuantity}
          removeItem={removeFromCart}
          checkout={handleCheckout}
        />
      </div>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar 
              isLoggedIn={isLoggedIn}
              userRole={user?.role}
              cartItemCount={cartItems.length}
              onLogout={handleLogout}
            />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/menu" element={
                  <Menu 
                    isLoggedIn={isLoggedIn}
                    cartItems={cartItems}
                    addToCart={addToCart}
                  />
                } />
                <Route path="/login" element={
                  <div className="food-container py-16">
                    <LoginForm onLogin={handleLogin} />
                  </div>
                } />
                <Route path="/signup" element={
                  <div className="food-container py-16">
                    <SignupForm onSignup={handleSignup} />
                  </div>
                } />
                <Route path="/admin" element={
                  isLoggedIn && user?.role === 'admin' ? (
                    <Admin userId={user.id} />
                  ) : (
                    <NotFound />
                  )
                } />
                <Route path="/user" element={
                  isLoggedIn && user?.role === 'user' ? (
                    <UserDashboard user={user} />
                  ) : (
                    <NotFound />
                  )
                } />
                <Route path="/cart" element={
                  isLoggedIn ? renderCartPage() : <NotFound />
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <footer className="bg-food-dark text-white py-8">
              <div className="food-container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">FastFood</h3>
                    <p className="text-gray-300">
                      Delicious food delivered fast to your doorstep.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4">Links</h3>
                    <ul className="space-y-2">
                      <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
                      <li><a href="/menu" className="text-gray-300 hover:text-white">Menu</a></li>
                      <li><a href="/login" className="text-gray-300 hover:text-white">Login</a></li>
                      <li><a href="/signup" className="text-gray-300 hover:text-white">Signup</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4">Contact</h3>
                    <p className="text-gray-300">123 Food Street</p>
                    <p className="text-gray-300">Foodville, FL 12345</p>
                    <p className="text-gray-300">info@fastfood.com</p>
                  </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                  <p>© {new Date().getFullYear()} FastFood. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
