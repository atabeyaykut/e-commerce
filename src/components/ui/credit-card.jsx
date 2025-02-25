import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/useToast';

const CreditCardForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    card_no: '',
    expire_month: '',
    expire_year: '',
    cvv: '',
    use3DSecure: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'card_no') {
      formattedValue = value.replace(/\D/g, '');
      formattedValue = formattedValue.slice(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      card_no: formData.card_no.replace(/\s/g, ''),
    };
    onSubmit(submitData);
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold">Kart Bilgileri</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="card_no">Kart Numarası</Label>
          <Input
            id="card_no"
            name="card_no"
            value={formData.card_no}
            onChange={handleChange}
            required
            placeholder="XXXX XXXX XXXX XXXX"
            maxLength={19}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Son Kullanma Tarihi</Label>
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={formData.expire_month}
                onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, expire_month: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Ay" />
                </SelectTrigger>
                <SelectContent>
                  {months.map(month => (
                    <SelectItem key={month} value={month.toString()}>
                      {month.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={formData.expire_year}
                onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, expire_year: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Yıl" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <div className="relative">
              <Input
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
                maxLength={3}
                className="pr-8"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                <span className="text-xs">ℹ️</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="3DSecure"
            checked={formData.use3DSecure}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, use3DSecure: checked }))
            }
          />
          <label
            htmlFor="3DSecure"
            className="text-sm font-medium leading-none flex items-center space-x-2"
          >
            <Shield className="h-4 w-4" />
            <span>3D Secure ile ödemek istiyorum</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            İptal
          </Button>
        )}
        <Button type="submit">
          Ödeme Yap
        </Button>
      </div>
    </form>
  );
};

const SavedCard = ({ card, isSelected, onSelect }) => {
  const expiryDate = `${card.expire_month.toString().padStart(2, '0')}/${card.expire_year}`;
  const lastFourDigits = card.card_no.slice(-4);
  
  return (
    <div
      className={`relative cursor-pointer rounded-lg border p-4 transition-all ${
        isSelected ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Bank logo would go here */}
          <div>
            <p className="font-medium">•••• •••• •••• {lastFourDigits}</p>
            <p className="text-sm text-muted-foreground">{expiryDate}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* Mastercard/Visa logo would go here */}
          <div className="w-12 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const CreditCardManager = ({ cards, onAddCard, onSelectCard, selectedCardId }) => {
  const [showNewCardForm, setShowNewCardForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Kart ile Öde</h2>
        <Button
          variant="link"
          className="text-primary"
          onClick={() => setShowNewCardForm(true)}
        >
          Başka bir Kart ile Ödeme Yap
        </Button>
      </div>

      {showNewCardForm ? (
        <CreditCardForm
          onSubmit={(data) => {
            onAddCard(data);
            setShowNewCardForm(false);
          }}
          onCancel={() => setShowNewCardForm(false)}
        />
      ) : (
        <div className="grid gap-4">
          {cards.map((card) => (
            <SavedCard
              key={card.id}
              card={card}
              isSelected={card.id === selectedCardId}
              onSelect={() => onSelectCard(card)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CreditCardManager;
