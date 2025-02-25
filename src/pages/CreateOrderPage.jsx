import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { useToast } from '../hooks/useToast';
import api from '../services/api';

const CreateOrderPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
    address: ''
  });
  const [cities] = useState([
    'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 
    'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Diyarbakır'
  ]);

  const history = useHistory();
  const { toast } = useToast();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await api.get('/user/address');
      setAddresses(response.data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Adresler yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAddress) {
        await api.put('/user/address', {
          id: editingAddress.id,
          ...formData
        });
      } else {
        await api.post('/user/address', formData);
      }
      
      await fetchAddresses();
      setIsAddingAddress(false);
      setEditingAddress(null);
      setFormData({
        title: '',
        name: '',
        surname: '',
        phone: '',
        city: '',
        district: '',
        neighborhood: '',
        address: ''
      });
      
      toast({
        title: "Başarılı",
        description: editingAddress ? "Adres güncellendi." : "Yeni adres eklendi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Adres kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setFormData({
      title: address.title,
      name: address.name,
      surname: address.surname,
      phone: address.phone,
      city: address.city,
      district: address.district,
      neighborhood: address.neighborhood,
      address: address.address
    });
    setIsAddingAddress(true);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await api.delete(`/user/address/${addressId}`);
      await fetchAddresses();
      toast({
        title: "Başarılı",
        description: "Adres silindi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Adres silinirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleContinue = () => {
    if (!selectedShippingAddress) {
      toast({
        title: "Uyarı",
        description: "Lütfen bir teslimat adresi seçin.",
        variant: "warning",
      });
      return;
    }
    if (!selectedBillingAddress) {
      toast({
        title: "Uyarı",
        description: "Lütfen bir fatura adresi seçin.",
        variant: "warning",
      });
      return;
    }
    // Navigate to payment step
    history.push('/order/payment', {
      shippingAddress: selectedShippingAddress,
      billingAddress: selectedBillingAddress
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Sipariş Oluştur - Adres Bilgileri</h1>
          <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingAddress(null);
                setFormData({
                  title: '',
                  name: '',
                  surname: '',
                  phone: '',
                  city: '',
                  district: '',
                  neighborhood: '',
                  address: ''
                });
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Adres Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Adres Başlığı</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ad</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">Soyad</Label>
                    <Input
                      id="surname"
                      name="surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">İl</Label>
                  <Select
                    name="city"
                    value={formData.city}
                    onValueChange={(value) => handleInputChange({ target: { name: 'city', value } })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="İl seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city.toLowerCase()}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">İlçe</Label>
                  <Input
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Mahalle</Label>
                  <Input
                    id="neighborhood"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adres Detayı</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingAddress ? 'Adresi Güncelle' : 'Adresi Kaydet'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Shipping Address Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Teslimat Adresi</h2>
            <RadioGroup
              value={selectedShippingAddress?.id?.toString()}
              onValueChange={(value) => {
                const address = addresses.find(a => a.id.toString() === value);
                setSelectedShippingAddress(address);
              }}
            >
              <div className="space-y-4">
                {addresses.map((address) => (
                  <Card key={address.id} className="p-4">
                    <div className="flex items-start">
                      <RadioGroupItem
                        value={address.id.toString()}
                        id={`shipping-${address.id}`}
                        className="mt-1"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor={`shipping-${address.id}`}
                            className="font-medium cursor-pointer"
                          >
                            {address.title}
                          </label>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditAddress(address)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.name} {address.surname}
                        </p>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.neighborhood}, {address.district}, {address.city}
                        </p>
                        <p className="text-sm text-gray-600">{address.address}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Billing Address Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Fatura Adresi</h2>
            <RadioGroup
              value={selectedBillingAddress?.id?.toString()}
              onValueChange={(value) => {
                const address = addresses.find(a => a.id.toString() === value);
                setSelectedBillingAddress(address);
              }}
            >
              <div className="space-y-4">
                {addresses.map((address) => (
                  <Card key={address.id} className="p-4">
                    <div className="flex items-start">
                      <RadioGroupItem
                        value={address.id.toString()}
                        id={`billing-${address.id}`}
                        className="mt-1"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor={`billing-${address.id}`}
                            className="font-medium cursor-pointer"
                          >
                            {address.title}
                          </label>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditAddress(address)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.name} {address.surname}
                        </p>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.neighborhood}, {address.district}, {address.city}
                        </p>
                        <p className="text-sm text-gray-600">{address.address}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedShippingAddress || !selectedBillingAddress}
          >
            Devam Et
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;
