
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, MapPin, User, Phone, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const InstallationScheduler = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    preferredDate: '',
    timeSlot: '',
    specialInstructions: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const { toast } = useToast();

  const timeSlots = [
    { value: 'morning', label: '8:00 AM - 12:00 PM' },
    { value: 'afternoon', label: '12:00 PM - 4:00 PM' },
    { value: 'evening', label: '4:00 PM - 8:00 PM' }
  ];

  const handleDateChange = (date) => {
    setFormData({...formData, preferredDate: date});
    // Mock available contractors for the selected date
    const mockContractors = [
      { id: 1, name: "ABC HVAC Services", rating: 4.9, distance: "2.3 miles" },
      { id: 2, name: "Cool Comfort Solutions", rating: 4.8, distance: "3.1 miles" },
      { id: 3, name: "Elite Air Systems", rating: 4.7, distance: "4.5 miles" }
    ];
    setAvailableSlots(mockContractors);
  };

  const handleScheduleInstallation = () => {
    if (!formData.firstName || !formData.email || !formData.phone || !formData.preferredDate || !formData.timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to schedule installation.",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage
    const installationData = {
      ...formData,
      cartItems,
      scheduledAt: new Date().toISOString(),
      status: 'scheduled'
    };

    const existingInstallations = JSON.parse(localStorage.getItem('installations') || '[]');
    existingInstallations.push(installationData);
    localStorage.setItem('installations', JSON.stringify(existingInstallations));

    toast({
      title: "Installation Scheduled!",
      description: "Your HVAC installation has been scheduled. You'll receive a confirmation email shortly."
    });

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      preferredDate: '',
      timeSlot: '',
      specialInstructions: ''
    });
  };

  const getTotalCost = () => {
    const equipmentCost = cartItems.reduce((total, item) => total + item.price, 0);
    const installationCost = equipmentCost * 0.3; // 30% of equipment cost
    return equipmentCost + installationCost;
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <Calendar className="h-12 w-12 text-purple-500 mr-3" />
          <h2 className="text-4xl font-bold gradient-text">Schedule Installation</h2>
        </div>
        <p className="text-xl text-muted-foreground">
          Book your professional HVAC installation
        </p>
      </motion.div>

      {cartItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-effect border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">Installation Summary</CardTitle>
              <CardDescription>Equipment to be installed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.tonnage} Tons • {item.seer} SEER</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Cost (Equipment + Installation):</span>
                    <span className="text-green-400">${getTotalCost().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-effect border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-500" />
                Contact Information
              </CardTitle>
              <CardDescription>Your details for scheduling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="bg-background/50"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-effect border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-purple-500" />
                Installation Address
              </CardTitle>
              <CardDescription>Where should we install your system?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="bg-background/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                  className="bg-background/50"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="glass-effect border-orange-500/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-orange-500" />
              Schedule Details
            </CardTitle>
            <CardDescription>Choose your preferred installation time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date *</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label>Time Slot *</Label>
                <Select onValueChange={(value) => setFormData({...formData, timeSlot: value})}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot.value} value={slot.value}>
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {availableSlots.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold">Available Contractors:</h4>
                <div className="grid gap-3">
                  {availableSlots.map((contractor) => (
                    <div key={contractor.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div>
                        <h5 className="font-semibold">{contractor.name}</h5>
                        <p className="text-sm text-muted-foreground">
                          ⭐ {contractor.rating} • {contractor.distance} away
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Select
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <textarea
                id="specialInstructions"
                value={formData.specialInstructions}
                onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                className="w-full h-24 px-3 py-2 text-sm rounded-md border border-input bg-background/50 resize-none"
                placeholder="Any special requirements or access instructions..."
              />
            </div>

            <Button
              onClick={handleScheduleInstallation}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              disabled={cartItems.length === 0}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Installation
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default InstallationScheduler;
