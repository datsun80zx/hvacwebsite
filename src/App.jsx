
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Toaster } from '@/components/ui/toaster';
import SystemSizer from '@/components/SystemSizer';
import ProductCatalog from '@/components/ProductCatalog';
import InstallationScheduler from '@/components/InstallationScheduler';
import { 
  Calculator, 
  ShoppingCart, 
  Calendar, 
  Snowflake, 
  Zap, 
  Shield, 
  Star,
  Phone,
  Mail,
  MapPin,
  Trash2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

function App() {
  const [activeTab, setActiveTab] = useState('sizer');
  const [recommendedSystem, setRecommendedSystem] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const { toast } = useToast();

  const handleSystemSized = (system) => {
    setRecommendedSystem(system);
    setActiveTab('catalog');
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart."
    });
  };

  const getTotalCartValue = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-white hvac-pattern">
      {/* Header */}
      <header className="border-b border-slate-200/70 glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Snowflake className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">HVAC Pro Shop</h1>
                <p className="text-sm text-muted-foreground">Professional HVAC Solutions</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="relative">
                <Button
                  variant="outline"
                  className="glass-effect border-blue-500/30 hover:bg-blue-500/10"
                  onClick={() => setActiveTab('scheduler')}
                >
                  <ShoppingCart className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-primary">Cart ({cartItems.length})</span>
                </Button>
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                    {cartItems.length}
                  </Badge>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 hvac-grid opacity-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10"
        >
          <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-6 floating-animation">
            Perfect Climate
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            Size, purchase, and schedule installation of your ideal HVAC system in three simple steps
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-700">1. Size Your System</h3>
              <p className="text-muted-foreground">Get the perfect system size for your home</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-700">2. Choose Equipment</h3>
              <p className="text-muted-foreground">Browse premium HVAC systems</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-700">3. Schedule Install</h3>
              <p className="text-muted-foreground">Book professional installation</p>
            </motion.div>
          </div>

          <Button
            onClick={() => setActiveTab('sizer')}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Get Started Now
          </Button>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 glass-effect border border-slate-200/70">
            <TabsTrigger value="sizer" className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Calculator className="h-4 w-4" />
              <span>System Sizer</span>
            </TabsTrigger>
            <TabsTrigger value="catalog" className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ShoppingCart className="h-4 w-4" />
              <span>Products</span>
            </TabsTrigger>
            <TabsTrigger value="scheduler" className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Calendar className="h-4 w-4" />
              <span>Installation</span>
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="sizer" className="space-y-8">
              <SystemSizer onSystemSized={handleSystemSized} />
            </TabsContent>

            <TabsContent value="catalog" className="space-y-8">
              <ProductCatalog 
                recommendedSystem={recommendedSystem}
                onAddToCart={handleAddToCart}
              />
            </TabsContent>

            <TabsContent value="scheduler" className="space-y-8">
              {cartItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="glass-effect border-blue-500/20 mb-8 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-600">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Your Cart
                      </CardTitle>
                      <CardDescription>Review your selected items</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {cartItems.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-lg border border-slate-200">
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-700">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.tonnage} Tons • {item.seer} SEER
                              </p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="font-semibold text-green-600">
                                ${item.price.toLocaleString()}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveFromCart(index)}
                                className="text-red-500 hover:text-red-400 border-red-300 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="border-t border-slate-200 pt-4">
                          <div className="flex justify-between text-xl font-bold text-slate-800">
                            <span>Total Equipment Cost:</span>
                            <span className="text-green-600">${getTotalCartValue().toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
              <InstallationScheduler cartItems={cartItems} />
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </main>

      {/* Features Section */}
      <section className="py-20 border-t border-slate-200/70 bg-slate-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">Why Choose HVAC Pro Shop?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional-grade equipment with expert installation services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-effect border-blue-500/20 text-center h-full shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-slate-700">Premium Quality</CardTitle>
                  <CardDescription>
                    Top-tier HVAC equipment from trusted manufacturers
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-effect border-green-500/20 text-center h-full shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-slate-700">Expert Installation</CardTitle>
                  <CardDescription>
                    Certified technicians with years of experience
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-effect border-purple-500/20 text-center h-full shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-slate-700">Satisfaction Guaranteed</CardTitle>
                  <CardDescription>
                    100% satisfaction guarantee on all installations
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 glass-effect">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <Snowflake className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">HVAC Pro Shop</span>
              </div>
              <p className="text-muted-foreground">
                Your trusted partner for premium HVAC solutions and professional installation services.
              </p>
            </div>

            <div>
              <span className="font-semibold text-lg mb-4 block text-slate-700">Services</span>
              <ul className="space-y-2 text-muted-foreground">
                <li>System Sizing</li>
                <li>Equipment Sales</li>
                <li>Professional Installation</li>
                <li>Maintenance Plans</li>
              </ul>
            </div>

            <div>
              <span className="font-semibold text-lg mb-4 block text-slate-700">Products</span>
              <ul className="space-y-2 text-muted-foreground">
                <li>Heat Pumps</li>
                <li>Air Conditioners</li>
                <li>Furnaces</li>
                <li>Smart Thermostats</li>
              </ul>
            </div>

            <div>
              <span className="font-semibold text-lg mb-4 block text-slate-700">Contact</span>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>(555) 123-HVAC</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>info@hvacproshop.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Nationwide Service</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200/70 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} HVAC Pro Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}

export default App;
