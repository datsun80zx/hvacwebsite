
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calculator, Home, Thermometer, Zap } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SystemSizer = ({ onSystemSized }) => {
  const [formData, setFormData] = useState({
    squareFootage: '',
    ceilingHeight: [8],
    homeType: '',
    insulation: '',
    windows: '',
    climate: '',
    currentSystem: ''
  });
  const [recommendation, setRecommendation] = useState(null);
  const { toast } = useToast();

  const calculateSystem = () => {
    if (!formData.squareFootage || !formData.homeType || !formData.climate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to calculate your system size.",
        variant: "destructive"
      });
      return;
    }

    // Basic BTU calculation logic
    const baseLoad = parseInt(formData.squareFootage) * 25; // Base 25 BTU per sq ft
    const ceilingMultiplier = formData.ceilingHeight[0] > 8 ? 1.1 : 1.0;
    const insulationMultiplier = formData.insulation === 'poor' ? 1.3 : formData.insulation === 'good' ? 0.9 : 1.0;
    const climateMultiplier = formData.climate === 'hot' ? 1.2 : formData.climate === 'cold' ? 1.1 : 1.0;
    
    const totalBTU = Math.round(baseLoad * ceilingMultiplier * insulationMultiplier * climateMultiplier);
    const tonnage = Math.round((totalBTU / 12000) * 2) / 2; // Round to nearest 0.5 ton

    const systemRec = {
      btu: totalBTU,
      tonnage: tonnage,
      efficiency: tonnage <= 2 ? 16 : tonnage <= 3 ? 17 : 18,
      estimatedCost: tonnage * 3500 + Math.random() * 1000,
      type: tonnage <= 2 ? 'Standard Split System' : tonnage <= 4 ? 'High Efficiency Split System' : 'Multi-Zone System'
    };

    setRecommendation(systemRec);
    onSystemSized(systemRec);

    toast({
      title: "System Calculated!",
      description: `We recommend a ${tonnage} ton system for your home.`
    });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <Calculator className="h-12 w-12 text-blue-500 mr-3" />
          <h2 className="text-4xl font-bold gradient-text">System Sizer</h2>
        </div>
        <p className="text-xl text-muted-foreground">
          Get the perfect HVAC system size for your home
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-effect border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="h-5 w-5 mr-2 text-blue-500" />
                Home Details
              </CardTitle>
              <CardDescription>Tell us about your home</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="squareFootage">Square Footage *</Label>
                <Input
                  id="squareFootage"
                  type="number"
                  placeholder="e.g., 2000"
                  value={formData.squareFootage}
                  onChange={(e) => setFormData({...formData, squareFootage: e.target.value})}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label>Ceiling Height: {formData.ceilingHeight[0]} ft</Label>
                <Slider
                  value={formData.ceilingHeight}
                  onValueChange={(value) => setFormData({...formData, ceilingHeight: value})}
                  max={12}
                  min={7}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Home Type *</Label>
                <Select onValueChange={(value) => setFormData({...formData, homeType: value})}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select home type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-family">Single Family</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="condo">Condo/Apartment</SelectItem>
                    <SelectItem value="mobile">Mobile Home</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Insulation Quality</Label>
                <Select onValueChange={(value) => setFormData({...formData, insulation: value})}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select insulation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poor">Poor (Pre-1980)</SelectItem>
                    <SelectItem value="average">Average (1980-2000)</SelectItem>
                    <SelectItem value="good">Good (Post-2000)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-effect border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Thermometer className="h-5 w-5 mr-2 text-purple-500" />
                Environment
              </CardTitle>
              <CardDescription>Climate and efficiency factors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Climate Zone *</Label>
                <Select onValueChange={(value) => setFormData({...formData, climate: value})}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select climate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot">Hot & Humid (South)</SelectItem>
                    <SelectItem value="moderate">Moderate (Central)</SelectItem>
                    <SelectItem value="cold">Cold (North)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Window Type</Label>
                <Select onValueChange={(value) => setFormData({...formData, windows: value})}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select windows" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Pane</SelectItem>
                    <SelectItem value="double">Double Pane</SelectItem>
                    <SelectItem value="energy">Energy Efficient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Current System</Label>
                <Select onValueChange={(value) => setFormData({...formData, currentSystem: value})}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Current HVAC type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="central">Central Air</SelectItem>
                    <SelectItem value="window">Window Units</SelectItem>
                    <SelectItem value="none">No AC</SelectItem>
                    <SelectItem value="heat-pump">Heat Pump</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculateSystem}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate My System
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {recommendation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-effect border-green-500/20 pulse-glow">
            <CardHeader>
              <CardTitle className="flex items-center text-green-400">
                <Zap className="h-5 w-5 mr-2" />
                Your Recommended System
              </CardTitle>
              <CardDescription>Based on your home's specifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">System Size:</span>
                    <span className="font-semibold text-green-400">{recommendation.tonnage} Tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">BTU Capacity:</span>
                    <span className="font-semibold">{recommendation.btu.toLocaleString()} BTU/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Efficiency Rating:</span>
                    <span className="font-semibold">{recommendation.efficiency} SEER</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">System Type:</span>
                    <span className="font-semibold">{recommendation.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Cost:</span>
                    <span className="font-semibold text-green-400">${recommendation.estimatedCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default SystemSizer;
