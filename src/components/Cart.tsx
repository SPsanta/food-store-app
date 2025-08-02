import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus, Trash2, MapPin } from 'lucide-react';

interface CartProps {
  items: any[];
  onBack: () => void;
  onRemove: (dishId: string) => void;
}

export const Cart: React.FC<CartProps> = ({ items, onBack, onRemove }) => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const getQuantity = (id: string) => quantities[id] || 1;

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity > 0) {
      setQuantities(prev => ({ ...prev, [id]: quantity }));
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + (item.price * getQuantity(item.id));
    }, 0);
  };

  const deliveryFee = 150;
  const serviceFee = Math.round(getTotalPrice() * 0.05);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100">
      {/* Header */}
      <header className="flex items-center p-4 bg-white/80 backdrop-blur-lg">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-orange-100 hover:bg-orange-200 transition-colors mr-4"
        >
          <ArrowLeft size={24} className="text-orange-600" />
        </button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Корзина
        </h1>
      </header>

      <div className="p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Корзина пуста</h2>
            <p className="text-gray-600 text-center">Добавьте блюда, которые вам понравились</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <h2 className="font-bold text-gray-800 mb-4">Ваши блюда</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 text-sm">от {item.chef?.name || 'Chef'}</p>
                      <div className="text-lg font-bold text-orange-600">₽{item.price}</div>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, getQuantity(item.id) - 1)}
                        className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 transition-colors"
                      >
                        <Minus size={16} className="text-orange-600" />
                      </button>
                      <span className="w-8 text-center font-semibold">{getQuantity(item.id)}</span>
                      <button
                        onClick={() => updateQuantity(item.id, getQuantity(item.id) + 1)}
                        className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 transition-colors"
                      >
                        <Plus size={16} className="text-orange-600" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <MapPin size={20} className="text-orange-600" />
                <h3 className="font-bold text-gray-800">Адрес доставки</h3>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="font-medium text-gray-800">ул. Тверская, 15, кв. 42</p>
                <p className="text-gray-600 text-sm">Москва, Центральный район</p>
              </div>
              <button className="mt-3 text-orange-600 font-medium text-sm">
                Изменить адрес
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <h3 className="font-bold text-gray-800 mb-4">Итого</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Блюда</span>
                  <span className="font-medium">₽{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Доставка</span>
                  <span className="font-medium">₽{deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Сервисный сбор</span>
                  <span className="font-medium">₽{serviceFee}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-800">К оплате</span>
                    <span className="text-xl font-bold text-orange-600">
                      ₽{getTotalPrice() + deliveryFee + serviceFee}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Button */}
            <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              Оформить заказ
            </button>
          </>
        )}
      </div>
    </div>
  );
};