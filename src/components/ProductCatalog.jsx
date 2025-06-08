
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Zap, Shield, Snowflake, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ProductCatalog = ({ recommendedSystem, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    // Mock product data
    const mockProducts = [
      {
        id: 1,
        name: "Carrier Infinity 24ANB1",
        category: "heat-pump",
        tonnage: 2,
        seer: 20,
        price: 4299,
        image: "High-efficiency heat pump system",
        features: ["Variable Speed", "Smart Thermostat", "10 Year Warranty"],
        description: "Premium heat pump with industry-leading efficiency"
      },
      {
        id: 2,
        name: "Trane XR16",
        category: "air-conditioner",
        tonnage: 3,
        seer: 16,
        price: 3599,
        image: "Reliable central air conditioning unit",
        features: ["Single Stage", "R-410A Refrigerant", "12 Year Warranty"],
        description: "Reliable and efficient cooling solution"
      },
      {
        id: 3,
        name: "Lennox XP25",
        category: "heat-pump",
        tonnage: 4,
        seer: 23,
        price: 6899,
        image: "Ultra-efficient variable speed heat pump",
        features: ["Variable Speed", "Solar Ready", "10 Year Warranty"],
        description: "Most efficient heat pump on the market"
      },
      {
        id: 4,
        name: "Goodman GSX16",
        category: "air-conditioner",
        tonnage: 2.5,
        seer: 16,
        price: 2899,
        image: "Budget-friendly air conditioning system",
        features: ["Single Stage", "10 Year Parts Warranty", "Energy Star"],
        description: "Affordable and reliable cooling"
      },
      {
        id: 5,
        name: "Rheem RP20",
        category: "heat-pump",
        tonnage: 3.5,
        seer: 20,
        price: 5299,
        image: "High-performance heat pump with smart controls",
        features: ["Two Stage", "Smart Controls", "10 Year Warranty"],
        description: "Smart and efficient year-round comfort"
      },
      {
        id: 6,
        name: "York YXV",
        category: "air-conditioner",
        tonnage: 5,
        seer: 18,
        price: 4799,
        image: "Commercial-grade air conditioning system",
        features: ["Variable Speed", "Commercial Grade", "5 Year Warranty"],
        description: "Heavy-duty cooling for large homes"
      }
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const handleAddToCart = (product) => {
    onAddToCart(product);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`
    });
  };

  const getRecommendedBadge = (product) => {
    if (!recommendedSystem) return null;
    
    const tonnageDiff = Math.abs(product.tonnage - recommendedSystem.tonnage);
    if (tonnageDiff <= 0.5) {
      return <Badge className="bg-green-500 text-white">Recommended</Badge>;
    }
    return null;
  };

  const categories = [
    { id: 'all', name: 'All Systems', icon: Filter },
    { id: 'air-conditioner', name: 'Air Conditioners', icon: Snowflake },
    { id: 'heat-pump', name: 'Heat Pumps', icon: Zap }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <ShoppingCart className="h-12 w-12 text-green-500 mr-3" />
          <h2 className="text-4xl font-bold gradient-text">Product Catalog</h2>
        </div>
        <p className="text-xl text-muted-foreground">
          Choose from our premium HVAC systems
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="flex space-x-2 bg-muted/20 p-2 rounded-lg">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </Button>
            );
          })}
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="glass-effect border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </div>
                  {getRecommendedBadge(product)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center">
                  <img  alt={product.name} className="w-full h-full object-cover rounded-lg" src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-semibold">{product.tonnage} Tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SEER:</span>
                    <span className="font-semibold">{product.seer}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {product.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-2xl font-bold text-green-400">
                    ${product.price.toLocaleString()}
                  </div>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>

                <div className="flex items-center space-x-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">(4.8/5)</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
