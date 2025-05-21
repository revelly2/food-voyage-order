
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingCart, Menu as MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  isLoggedIn: boolean;
  userRole?: 'user' | 'admin';
  cartItemCount?: number;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isLoggedIn = false, 
  userRole,
  cartItemCount = 0,
  onLogout 
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="food-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Site Title */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-food-orange p-2 rounded-full">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-food-dark">FastFood</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/menu" className="text-gray-600 hover:text-food-orange transition-colors">
              Menu
            </Link>
            {isLoggedIn && userRole === 'user' && (
              <Link to="/orders" className="text-gray-600 hover:text-food-orange transition-colors">
                My Orders
              </Link>
            )}
            {isLoggedIn && userRole === 'admin' && (
              <Link to="/admin" className="text-gray-600 hover:text-food-orange transition-colors">
                Admin Dashboard
              </Link>
            )}
          </nav>

          {/* Auth and Cart Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {userRole === 'user' && (
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/cart')}
                    className="relative"
                  >
                    <ShoppingCart className="h-5 w-5 mr-1" />
                    <span>Cart</span>
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-food-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                )}
                <Button 
                  variant="ghost"
                  onClick={() => navigate(userRole === 'admin' ? '/admin' : '/user')}
                  className="text-gray-600"
                >
                  <User className="h-5 w-5 mr-1" />
                  <span>Account</span>
                </Button>
                <Button onClick={onLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
                <Button onClick={() => navigate('/signup')}>Sign up</Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/menu" 
                className="text-gray-600 hover:text-food-orange transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              {isLoggedIn && userRole === 'user' && (
                <>
                  <Link 
                    to="/orders" 
                    className="text-gray-600 hover:text-food-orange transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link 
                    to="/cart" 
                    className="text-gray-600 hover:text-food-orange transition-colors py-2 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart {cartItemCount > 0 && `(${cartItemCount})`}
                  </Link>
                </>
              )}
              {isLoggedIn && userRole === 'admin' && (
                <Link 
                  to="/admin" 
                  className="text-gray-600 hover:text-food-orange transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              {isLoggedIn ? (
                <>
                  <Link 
                    to={userRole === 'admin' ? '/admin' : '/user'} 
                    className="text-gray-600 hover:text-food-orange transition-colors py-2 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Account
                  </Link>
                  <Button onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }} className="w-full">
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate('/signup');
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
