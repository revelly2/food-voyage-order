
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { 
  FoodItem, 
  Order, 
  OrderStatus, 
  SalesRecord, 
  mockFoodItems, 
  mockOrders,
  mockSalesRecord
} from '@/utils/types';
import { 
  User, 
  Pizza, 
  ShoppingCart, 
  DollarSign,
  Check,
  X,
  Edit,
  Trash,
  Plus
} from 'lucide-react';

interface AdminProps {
  userId: string;
}

const Admin: React.FC<AdminProps> = ({ userId }) => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [foods, setFoods] = useState<FoodItem[]>(mockFoodItems);
  const [salesRecord, setSalesRecord] = useState<SalesRecord>(mockSalesRecord);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [newFood, setNewFood] = useState<Partial<FoodItem>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    available: true
  });

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    
    setOrders(updatedOrders);
    
    toast({
      title: "Order updated",
      description: `Order #${orderId} status changed to ${status}`,
    });
    
    // Update sales record if status is "completed"
    if (status === 'completed') {
      const completedOrder = orders.find(order => order.id === orderId);
      if (completedOrder) {
        setSalesRecord({
          ...salesRecord,
          completedOrders: salesRecord.completedOrders + 1,
          totalRevenue: salesRecord.totalRevenue + completedOrder.total
        });
      }
    }
  };

  const toggleFoodAvailability = (foodId: string) => {
    const updatedFoods = foods.map(food => 
      food.id === foodId ? { ...food, available: !food.available } : food
    );
    setFoods(updatedFoods);
    
    const foodName = foods.find(food => food.id === foodId)?.name;
    toast({
      title: "Food availability updated",
      description: `${foodName} is now ${updatedFoods.find(food => food.id === foodId)?.available ? 'available' : 'unavailable'}`,
    });
  };

  const handleEditFood = () => {
    if (!editingFood) return;
    
    const updatedFoods = foods.map(food => 
      food.id === editingFood.id ? editingFood : food
    );
    
    setFoods(updatedFoods);
    setEditingFood(null);
    
    toast({
      title: "Food updated",
      description: `${editingFood.name} has been updated successfully`,
    });
  };

  const handleDeleteFood = (foodId: string) => {
    const updatedFoods = foods.filter(food => food.id !== foodId);
    setFoods(updatedFoods);
    
    toast({
      title: "Food deleted",
      description: "The food item has been removed from the menu",
    });
  };

  const handleAddNewFood = () => {
    if (!newFood.name || !newFood.description || !newFood.price || !newFood.category) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const newFoodItem: FoodItem = {
      id: `${foods.length + 1}`,
      name: newFood.name,
      description: newFood.description,
      price: Number(newFood.price),
      image: newFood.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80',
      category: newFood.category,
      available: true
    };
    
    setFoods([...foods, newFoodItem]);
    setNewFood({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      available: true
    });
    
    toast({
      title: "Food added",
      description: `${newFoodItem.name} has been added to the menu`,
    });
  };

  return (
    <div className="food-container py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="foods">Menu Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${salesRecord.totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+10% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{salesRecord.totalOrders}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
                <Check className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{salesRecord.completedOrders}</div>
                <p className="text-xs text-muted-foreground">{((salesRecord.completedOrders / salesRecord.totalOrders) * 100).toFixed(1)}% completion rate</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Overview of the most recent orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.slice(0, 5).map(order => (
                  <div key={order.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                      <Badge className={
                        order.status === 'completed' ? 'bg-food-green' : 
                        order.status === 'approved' ? 'bg-blue-500' : 
                        'bg-food-orange'
                      }>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>All Orders</CardTitle>
                  <CardDescription>Manage customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div 
                        key={order.id} 
                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border ${
                          selectedOrder?.id === order.id ? 'border-food-orange bg-orange-50' : ''
                        } cursor-pointer`}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Order #{order.id}</p>
                            <Badge className={
                              order.status === 'completed' ? 'bg-food-green' : 
                              order.status === 'approved' ? 'bg-blue-500' : 
                              'bg-food-orange'
                            }>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                          <p className="text-sm">{order.items.length} items</p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex flex-col items-end">
                          <p className="font-bold">${order.total.toFixed(2)}</p>
                          <div className="flex gap-2 mt-2">
                            {order.status === 'pending' && (
                              <Button 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateOrderStatus(order.id, 'approved');
                                }}
                              >
                                Approve
                              </Button>
                            )}
                            {order.status === 'approved' && (
                              <Button 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateOrderStatus(order.id, 'completed');
                                }}
                              >
                                Complete
                              </Button>
                            )}
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                const updatedOrders = orders.filter(o => o.id !== order.id);
                                setOrders(updatedOrders);
                                if (selectedOrder?.id === order.id) {
                                  setSelectedOrder(null);
                                }
                                toast({
                                  title: "Order deleted",
                                  description: `Order #${order.id} has been deleted`,
                                });
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:w-1/3">
              {selectedOrder ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Order Details</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedOrder(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      Order #{selectedOrder.id} - {new Date(selectedOrder.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Items</h3>
                        <div className="space-y-2">
                          {selectedOrder.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <div>
                                <p>{item.foodItem.name} x {item.quantity}</p>
                                <p className="text-sm text-muted-foreground">
                                  ${item.foodItem.price.toFixed(2)} each
                                </p>
                              </div>
                              <p className="font-medium">
                                ${(item.foodItem.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between">
                          <p>Subtotal</p>
                          <p>${selectedOrder.total.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                          <p>Delivery Fee</p>
                          <p>$2.99</p>
                        </div>
                        <div className="flex justify-between font-bold mt-2">
                          <p>Total</p>
                          <p>${(selectedOrder.total + 2.99).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <h3 className="font-medium mb-2">Status</h3>
                        <div className="flex flex-col gap-2">
                          <Button
                            className={selectedOrder.status === 'pending' ? 'bg-food-orange' : ''}
                            variant={selectedOrder.status === 'pending' ? 'default' : 'outline'}
                            onClick={() => updateOrderStatus(selectedOrder.id, 'pending')}
                          >
                            Pending
                          </Button>
                          <Button
                            className={selectedOrder.status === 'approved' ? 'bg-blue-500' : ''}
                            variant={selectedOrder.status === 'approved' ? 'default' : 'outline'}
                            onClick={() => updateOrderStatus(selectedOrder.id, 'approved')}
                          >
                            Approved
                          </Button>
                          <Button
                            className={selectedOrder.status === 'completed' ? 'bg-food-green' : ''}
                            variant={selectedOrder.status === 'completed' ? 'default' : 'outline'}
                            onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                          >
                            Completed
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    <ShoppingCart className="mx-auto h-12 w-12 mb-4" />
                    <p>Select an order to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="foods">
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="md:w-2/3">
              <CardHeader>
                <CardTitle>Menu Items</CardTitle>
                <CardDescription>Manage your food menu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {foods.map(food => (
                    <div 
                      key={food.id} 
                      className="flex items-center border rounded-lg p-3"
                    >
                      <img 
                        src={food.image} 
                        alt={food.name}
                        className="w-16 h-16 rounded object-cover mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium">{food.name}</h3>
                          <Badge className="ml-2 bg-gray-200 text-gray-800 hover:bg-gray-200">
                            {food.category}
                          </Badge>
                          {!food.available && (
                            <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-100">
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {food.description}
                        </p>
                        <p className="font-bold text-food-orange">${food.price.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleFoodAvailability(food.id)}
                        >
                          {food.available ? 'Mark Unavailable' : 'Mark Available'}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setEditingFood(food)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-500"
                          onClick={() => handleDeleteFood(food.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="md:w-1/3">
              {editingFood ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Edit Food Item</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditingFood(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="edit-name">Name</Label>
                        <Input 
                          id="edit-name"
                          value={editingFood.name}
                          onChange={(e) => setEditingFood({...editingFood, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-desc">Description</Label>
                        <Input 
                          id="edit-desc"
                          value={editingFood.description}
                          onChange={(e) => setEditingFood({...editingFood, description: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-price">Price ($)</Label>
                        <Input 
                          id="edit-price"
                          type="number"
                          value={editingFood.price}
                          onChange={(e) => setEditingFood({
                            ...editingFood, 
                            price: parseFloat(e.target.value) || 0
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-category">Category</Label>
                        <Input 
                          id="edit-category"
                          value={editingFood.category}
                          onChange={(e) => setEditingFood({...editingFood, category: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-image">Image URL</Label>
                        <Input 
                          id="edit-image"
                          value={editingFood.image}
                          onChange={(e) => setEditingFood({...editingFood, image: e.target.value})}
                        />
                      </div>
                      <div className="pt-2">
                        <Button 
                          onClick={handleEditFood}
                          className="w-full"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Food Item</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="new-name">Name</Label>
                        <Input 
                          id="new-name"
                          value={newFood.name}
                          onChange={(e) => setNewFood({...newFood, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-desc">Description</Label>
                        <Input 
                          id="new-desc"
                          value={newFood.description}
                          onChange={(e) => setNewFood({...newFood, description: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-price">Price ($)</Label>
                        <Input 
                          id="new-price"
                          type="number"
                          value={newFood.price}
                          onChange={(e) => setNewFood({
                            ...newFood, 
                            price: parseFloat(e.target.value) || 0
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-category">Category</Label>
                        <Input 
                          id="new-category"
                          value={newFood.category}
                          onChange={(e) => setNewFood({...newFood, category: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-image">Image URL (optional)</Label>
                        <Input 
                          id="new-image"
                          value={newFood.image}
                          onChange={(e) => setNewFood({...newFood, image: e.target.value})}
                        />
                      </div>
                      <div className="pt-2">
                        <Button 
                          onClick={handleAddNewFood}
                          className="w-full"
                        >
                          <Plus className="mr-2 h-4 w-4" /> Add Food Item
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
