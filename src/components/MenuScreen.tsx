import React from 'react';
import { ArrowLeft, TrendingUp, User, Sprout, Star } from 'lucide-react';

interface MenuScreenProps {
  onBack: () => void;
  onShowChef: (chef: any) => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onBack, onShowChef }) => {
  const menuSections = [
    {
      id: 'for-you',
      title: 'Для вас',
      subtitle: 'Персональные рекомендации',
      icon: User,
      color: 'orange',
      dishes: [
        {
          id: '1',
          name: 'Паста с трюфелем',
          image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
          price: 1200,
          chef: 'Марко Росси'
        },
        {
          id: '2',
          name: 'Ризотто с грибами',
          image: 'https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg',
          price: 950,
          chef: 'Джулия Бертолини'
        }
      ]
    },
    {
      id: 'trends',
      title: 'Тренды',
      subtitle: 'Популярное в вашем городе',
      icon: TrendingUp,
      color: 'red',
      dishes: [
        {
          id: '3',
          name: 'Поке с лососем',
          image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
          price: 890,
          chef: 'Кейко Танака'
        },
        {
          id: '4',
          name: 'Авокадо тост',
          image: 'https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg',
          price: 620,
          chef: 'Анна Зеленская'
        }
      ]
    },
    {
      id: 'farm',
      title: 'Фермерское',
      subtitle: 'От партнеров U-COOK',
      icon: Sprout,
      color: 'green',
      dishes: [
        {
          id: '5',
          name: 'Салат с козьим сыром',
          image: 'https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg',
          price: 750,
          chef: 'Мария Фермина'
        },
        {
          id: '6',
          name: 'Суп-крем из тыквы',
          image: 'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg',
          price: 480,
          chef: 'Николай Огородников'
        }
      ]
    }
  ];

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
          Меню
        </h1>
      </header>

      <div className="p-4">
        {menuSections.map((section) => {
          const Icon = section.icon;
          
          return (
            <div key={section.id} className="mb-8">
              {/* Section Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-full bg-${section.color}-100`}>
                  <Icon size={24} className={`text-${section.color}-600`} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
                  <p className="text-gray-600 text-sm">{section.subtitle}</p>
                </div>
              </div>

              {/* Dishes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section.dishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div 
                      className="h-32 bg-cover bg-center"
                      style={{ backgroundImage: `url(${dish.image})` }}
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-1">{dish.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">от шефа {dish.chef}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-orange-600">₽{dish.price}</span>
                        <div className="flex items-center space-x-1">
                          <Star size={14} className="text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};