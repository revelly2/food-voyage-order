
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShoppingCart, User, Clock, Check } from 'lucide-react';
import { Order, mockOrders } from '@/utils/types';

interface UserDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const [orders, setOrders] = useState<Order[]>(
    mockOrders.filter(order => order.userId === user.id)
  );
  
  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-food-orange';
      case 'approved':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-food-green';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="food-container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold">My Account</h1>
        <Button variant="outline">Log Out</Button>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="" alt={user.name} />
                  <AvatarFallback className="text-2xl bg-food-orange text-white">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-500 mb-4">{user.email}</p>
                <Button className="w-full">Edit Profile</Button>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Account Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="mr-4 bg-food-orange/20 p-3 rounded-full">
                      <ShoppingCart className="h-6 w-6 text-food-orange" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Orders</p>
                      <p className="text-2xl font-bold">{orders.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="mr-4 bg-food-green/20 p-3 rounded-full">
                      <Check className="h-6 w-6 text-food-green" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Completed Orders</p>
                      <p className="text-2xl font-bold">
                        {orders.filter(order => order.status === 'completed').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-4">Recent Activity</h3>
                  {orders.length > 0 ? (
                    <div className="space-y-3">
                      {orders.slice(0, 3).map(order => (
                        <div key={order.id} className="flex items-center justify-between border-b pb-3">
                          <div className="flex items-center">
                            <div className="mr-3 bg-gray-100 p-2 rounded-full">
                              <ShoppingCart className="h-4 w-4 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium">Order #{order.id}</p>
                              <p className="text-xs text-gray-500">
                                {formatDate(order.createdAt)}
                              </p>
                            </div>
                          </div>
                          <Badge className={getOrderStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No recent activities</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View and track your orders</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="border rounded-lg overflow-hidden">
                      <div className="p-4 bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between border-b">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">Order #{order.id}</h3>
                            <Badge className={getOrderStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <p className="font-bold text-lg mt-2 sm:mt-0">${order.total.toFixed(2)}</p>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium mb-2">Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className="flex items-center">
                                <img 
                                  src={item.foodItem.image} 
                                  alt={item.foodItem.name} 
                                  className="w-12 h-12 object-cover rounded mr-3"
                                />
                                <div>
                                  <p className="font-medium">{item.foodItem.name}</p>
                                  <p className="text-sm text-gray-500">
                                    x{item.quantity} at ${item.foodItem.price.toFixed(2)} each
                                  </p>
                                </div>
                              </div>
                              <p className="font-medium">
                                ${(item.foodItem.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="border-t mt-4 pt-4">
                          <div className="flex justify-between text-sm">
                            <p>Subtotal:</p>
                            <p>${order.total.toFixed(2)}</p>
                          </div>
                          <div className="flex justify-between text-sm">
                            <p>Delivery Fee:</p>
                            <p>$2.99</p>
                          </div>
                          <div className="flex justify-between font-bold mt-2">
                            <p>Total:</p>
                            <p>${(order.total + 2.99).toFixed(2)}</p>
                          </div>
                        </div>
                        {order.status === 'pending' && (
                          <div className="mt-4 flex items-center justify-center text-gray-500 bg-gray-50 p-3 rounded">
                            <Clock className="h-4 w-4 mr-2" />
                            <p className="text-sm">Your order is waiting for approval</p>
                          </div>
                        )}
                        {order.status === 'approved' && (
                          <div className="mt-4 flex items-center justify-center text-blue-500 bg-blue-50 p-3 rounded">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            <p className="text-sm">Your order is being prepared</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gray-100 p-6 rounded-full mx-auto w-20 h-20 flex items-center justify-center mb-4">
                    <ShoppingCart className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No orders yet</h3>
                  <p className="text-gray-500 mb-6">You haven't placed any orders yet</p>
                  <Button onClick={() => window.location.href = '/menu'}>Browse Menu</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
