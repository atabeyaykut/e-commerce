import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/useToast';
import api from '@/services/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CreditCardManager from '@/components/ui/credit-card';
import { useSelector } from 'react-redux';

const CreateOrderPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
    address: '',
    type: 'both' // 'shipping', 'billing', or 'both'
  });
  const [cities] = useState([
    'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 
    'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Diyarbakır'
  ]);
  const { toast } = useToast();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    fetchAddresses();
    fetchCards();
  }, []);

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/user/address');
      setAddresses(response.data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Adresler yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const requiredFields = ['title', 'name', 'surname', 'phone', 'city', 'district', 'neighborhood', 'address'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Uyarı",
        description: "Lütfen tüm zorunlu alanları doldurun.",
        variant: "warning",
      });
      return false;
    }

    // Basic phone number validation
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phone.replace(/[^0-9]/g, ''))) {
      toast({
        title: "Uyarı",
        description: "Lütfen geçerli bir telefon numarası girin.",
        variant: "warning",
      });
      return false;
    }

    return true;
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
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
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
        address: '',
        type: 'both'
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
    } finally {
      setIsSubmitting(false);
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
      address: address.address,
      type: address.type || 'both'
    });
    setIsAddingAddress(true);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      setIsLoading(true);
      await api.delete(`/user/address/${addressId}`);
      await fetchAddresses();
      
      // Clear selection if deleted address was selected
      if (selectedShippingAddress?.id === addressId) {
        setSelectedShippingAddress(null);
      }
      if (selectedBillingAddress?.id === addressId) {
        setSelectedBillingAddress(null);
      }
      
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
    } finally {
      setIsLoading(false);
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

  // Credit Card Management
  const fetchCards = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/user/card');
      setCards(response.data);
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Kayıtlı kartlar yüklenirken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCard = async (cardData) => {
    try {
      setIsSubmitting(true);
      const response = await api.post('/user/card', cardData);
      toast({
        title: 'Başarılı',
        description: 'Kart başarıyla eklendi',
        variant: 'success',
      });
      await fetchCards();
      setSelectedCard(response.data);
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Kart eklenirken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectCard = (card) => {
    setSelectedCard(card);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const subtotal = cart.total;
  const shippingCost = 29.99;
  const freeShippingThreshold = 150;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const finalShippingCost = isFreeShipping ? 0 : shippingCost;
  const total = subtotal + finalShippingCost;

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Sipariş Oluştur</h1>
      
      {/* Address Management Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Adres Bilgileri</h2>
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
                  address: '',
                  type: 'both'
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
                    pattern="[0-9]{10,11}"
                    title="Lütfen geçerli bir telefon numarası girin"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Adres Tipi</Label>
                  <Select
                    name="type"
                    value={formData.type}
                    onValueChange={(value) => handleInputChange({ target: { name: 'type', value } })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Adres tipi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shipping">Sadece Teslimat</SelectItem>
                      <SelectItem value="billing">Sadece Fatura</SelectItem>
                      <SelectItem value="both">Teslimat ve Fatura</SelectItem>
                    </SelectContent>
                  </Select>
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
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <LoadingSpinner className="w-4 h-4 mr-2" />
                  ) : null}
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
                {addresses
                  .filter(address => ['shipping', 'both'].includes(address.type || 'both'))
                  .map((address) => (
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
                {addresses
                  .filter(address => ['billing', 'both'].includes(address.type || 'both'))
                  .map((address) => (
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

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Ödeme Seçenekleri</h2>
          <div className="grid gap-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Banka/Kredi Kartı</span>
                  <span className="text-sm text-muted-foreground">veya</span>
                  <span className="font-medium">Alışveriş Kredisi</span>
                </div>
                <span className="text-sm text-muted-foreground">ile ödemenizi güvenle yapabilirsiniz.</span>
              </div>

              <CreditCardManager
                cards={cards}
                onAddCard={handleAddCard}
                onSelectCard={handleSelectCard}
                selectedCardId={selectedCard?.id}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h2 className="text-xl font-semibold mb-4">Sipariş Özeti</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Ürünün Toplamı</span>
                <span className="font-medium">{subtotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
              </div>
              <div className="flex justify-between">
                <span>Kargo Toplamı</span>
                <span className="font-medium">{shippingCost.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
              </div>
              {isFreeShipping && (
                <div className="flex justify-between text-success">
                  <span>{freeShippingThreshold} TL ve Üzeri Kargo Bedava (Satıcı Karşılar)</span>
                  <span>-{shippingCost.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Toplam</span>
                <span>{total.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
              </div>
            </div>
          </div>

          <Button
            className="w-full"
            size="lg"
            disabled={!selectedCard || !selectedShippingAddress || isSubmitting}
            onClick={handleContinue}
          >
            {isSubmitting ? <LoadingSpinner /> : 'Ödeme Yap'}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CreateOrderPage;
