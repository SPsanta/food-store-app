import React from 'react';
import { ArrowLeft, Star, MapPin, Clock, Award } from 'lucide-react';

interface ChefProfileProps {
  chef: any;
  onBack: () => void;
  onAddToCart: (dish: any) => void;
}

export const ChefProfile: React.FC<ChefProfileProps> = ({ chef, onBack, onAddToCart }) => {
  const chefDishes = [
    {
      id: '1',
      name: 'Паста Карбонара',
      image: '', // Убрал изображение
      price: 850,
      rating: 4.8,
      cookTime: '25 мин'
    },
    {
      id: '2',
      name: 'Ризотто с грибами',
      image: '', // Убрал изображение
      price: 950,
      rating: 4.7,
      cookTime: '30 мин'
    },
    {
      id: '3',
      name: 'Тирамису',
      image: '', // Убрал изображение
      price: 450,
      rating: 4.9,
      cookTime: '15 мин'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100">
      {/* Header */}
      <header className="flex items-center p-4 bg-white/80 backdrop-blur-lg">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-orange-100 hover:bg-orange-200 transition-colors mr-4"
          aria-label="Назад"
        >
          <ArrowLeft size={24} className="text-orange-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Профиль повара</h1>
      </header>

      <div className="p-4">
        {/* Chef Header */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={chef?.avatar || ''}
              alt={chef?.name || 'Chef'}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">{chef?.name || 'Марко Росси'}</h2>
              <p className="text-gray-600">{chef?.speciality || 'Итальянская кухня'}</p>
              <div className="flex items-center space-x-1 mt-1">
                <Star size={16} className="text-yellow-400 fill-current" />
                <span className="font-bold text-gray-800">{chef?.rating || 4.9}</span>
                <span className="text-gray-600">(247 отзывов)</span>
              </div>
            </div>
          </div>

          {/* Video Preview */}
          <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl p-4 mb-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold mb-1">Видео-визитка</h3>
                <p className="text-sm opacity-90">10 секунд о моем подходе к готовке</p>
              </div>
              <button 
                className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
                aria-label="Воспроизвести видео"
              >
                <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">156</div>
              <div className="text-sm text-gray-600">Блюд</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-sm text-gray-600">Довольных</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.1k</div>
              <div className="text-sm text-gray-600">Заказов</div>
            </div>
          </div>
        </div>

        {/* Kitchen Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <h3 className="font-bold text-gray-800 mb-3">Моя кухня</h3>
          <div 
            className="h-32 bg-cover bg-center rounded-xl"
            style={{ backgroundImage: 'url()' }}
          >
            <div className="h-full bg-black/20 rounded-xl flex items-end p-4">
              <p className="text-white text-sm">Чистота и качество — мои принципы</p>
            </div>
          </div>
        </div>

        {/* Chef's Dishes */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <h3 className="font-bold text-gray-800 mb-4">Мои блюда</h3>
          <div className="space-y-4">
            {chefDishes.map((dish) => (
              <div key={dish.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{dish.name}</h4>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex items-center space-x-1">
                      <Star size={12} className="text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{dish.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={12} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{dish.cookTime}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-orange-600">₽{dish.price}</div>
                  <button
                    onClick={() => onAddToCart(dish)}
                    className="mt-1 bg-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-600 transition-colors"
                  >
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};