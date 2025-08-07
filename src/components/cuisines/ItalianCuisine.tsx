import React, { useState, useRef } from 'react';
import { ArrowLeft, Star, Clock, Info, ChefHat } from 'lucide-react';
import { ChefPresentationCard } from '../ChefPresentationCard';

interface ItalianCuisineProps {
  onBack: () => void;
}

interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  cookTime: string;
  rating: number;
  tags: string[];
  chef: {
    name: string;
    avatar: string;
    speciality: string;
    rating: number;
  };
}

export const ItalianCuisine: React.FC<ItalianCuisineProps> = ({ onBack }) => {
  const [currentDishIndex, setCurrentDishIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [showChefCard, setShowChefCard] = useState(false);
  const [selectedChef, setSelectedChef] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const italianDishes: Dish[] = [
    {
      id: '1',
      name: 'Паста Карбонара',
      description: 'Классическая паста с беконом, яйцами и сыром пармезан',
      image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
      price: 1200,
      cookTime: '25 мин',
      rating: 4.8,
      tags: ['паста', 'бекон', 'сыр'],
      chef: {
        name: 'Марко Росси',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        speciality: 'Итальянская кухня',
        rating: 4.9
      }
    },
    {
      id: '2',
      name: 'Пицца Маргарита',
      description: 'Традиционная пицца с томатным соусом, моцареллой и базиликом',
      image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
      price: 950,
      cookTime: '20 мин',
      rating: 4.7,
      tags: ['пицца', 'томаты', 'моцарелла'],
      chef: {
        name: 'Джулия Бертолини',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        speciality: 'Пицца',
        rating: 4.8
      }
    },
    {
      id: '3',
      name: 'Ризотто с грибами',
      description: 'Кремовое ризотто с лесными грибами и пармезаном',
      image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg',
      price: 1100,
      cookTime: '30 мин',
      rating: 4.6,
      tags: ['ризотто', 'грибы', 'пармезан'],
      chef: {
        name: 'Антонио Феррари',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        speciality: 'Ризотто',
        rating: 4.7
      }
    },
    {
      id: '4',
      name: 'Лазанья Болоньезе',
      description: 'Слоеная лазанья с мясным соусом и бешамель',
      image: 'https://images.pexels.com/photos/5949890/pexels-photo-5949890.jpeg',
      price: 1400,
      cookTime: '45 мин',
      rating: 4.9,
      tags: ['лазанья', 'мясо', 'соус'],
      chef: {
        name: 'Карло Манчини',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        speciality: 'Лазанья',
        rating: 4.9
      }
    },
    {
      id: '5',
      name: 'Оссобуко',
      description: 'Тушеная телячья голень с овощами и ризотто',
      image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg',
      price: 1800,
      cookTime: '90 мин',
      rating: 4.8,
      tags: ['телятина', 'тушение', 'ризотто'],
      chef: {
        name: 'Лука Спагетти',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        speciality: 'Мясные блюда',
        rating: 4.8
      }
    },
    {
      id: '6',
      name: 'Тирамису',
      description: 'Классический десерт с кофе, маскарпоне и савоярди',
      image: 'https://images.pexels.com/photos/3071821/pexels-photo-3071821.jpeg',
      price: 650,
      cookTime: '15 мин',
      rating: 4.9,
      tags: ['десерт', 'кофе', 'маскарпоне'],
      chef: {
        name: 'София Эспозито',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        speciality: 'Десерты',
        rating: 4.9
      }
    },
    {
      id: '7',
      name: 'Паста Аматричана',
      description: 'Паста с гуанчале, томатами и пекорино романо',
      image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
      price: 1150,
      cookTime: '25 мин',
      rating: 4.7,
      tags: ['паста', 'гуанчале', 'пекорино'],
      chef: {
        name: 'Роберто Бруно',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        speciality: 'Паста',
        rating: 4.8
      }
    },
    {
      id: '8',
      name: 'Пицца Четыре Сыра',
      description: 'Пицца с моцареллой, горгонзолой, пармезаном и рикоттой',
      image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
      price: 1200,
      cookTime: '20 мин',
      rating: 4.6,
      tags: ['пицца', 'сыры', 'моцарелла'],
      chef: {
        name: 'Мария Конти',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        speciality: 'Пицца',
        rating: 4.7
      }
    },
    {
      id: '9',
      name: 'Ризотто с морепродуктами',
      description: 'Кремовое ризотто с креветками, кальмарами и мидиями',
      image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg',
      price: 1600,
      cookTime: '35 мин',
      rating: 4.8,
      tags: ['ризотто', 'морепродукты', 'креветки'],
      chef: {
        name: 'Джанни Морелли',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        speciality: 'Морепродукты',
        rating: 4.8
      }
    },
    {
      id: '10',
      name: 'Панна Котта',
      description: 'Нежный десерт с ванилью и ягодным соусом',
      image: 'https://images.pexels.com/photos/3071821/pexels-photo-3071821.jpeg',
      price: 550,
      cookTime: '10 мин',
      rating: 4.7,
      tags: ['десерт', 'ваниль', 'ягоды'],
      chef: {
        name: 'Элена Россо',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        speciality: 'Десерты',
        rating: 4.7
      }
    }
  ];

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    
    setTimeout(() => {
      setSwipeDirection(null);
      if (direction === 'right') {
        // Лайк - переходим к следующему блюду
        setCurrentDishIndex(prev => Math.min(prev + 1, italianDishes.length - 1));
      } else {
        // Дизлайк - тоже переходим к следующему
        setCurrentDishIndex(prev => Math.min(prev + 1, italianDishes.length - 1));
      }
    }, 300);
  };

  const handleShowDetails = () => {
    // Показать детали блюда
    console.log('Показать детали:', italianDishes[currentDishIndex]);
  };

  const handleShowChef = (chef: any) => {
    setSelectedChef({
      ...chef,
      experience: '12+ лет',
      location: 'Рим, Италия',
      bio: 'Мастер итальянской кухни с глубоким пониманием традиционных рецептов. Специализируется на пасте, пицце и ризотто. Работал в лучших ресторанах Италии и получил множество наград за свои кулинарные шедевры.',
      awards: ['Лучший шеф Италии 2023', 'Золотая вилка 2022', 'Мастер пасты 2021'],
      dishes: ['Паста', 'Пицца', 'Ризотто', 'Лазанья', 'Оссобуко', 'Тирамису']
    });
    setShowChefCard(true);
  };

  const currentDish = italianDishes[currentDishIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-red-50 to-white">
      {/* Header */}
      <header className="flex items-center p-4 bg-white/80 backdrop-blur-lg">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors mr-4"
          aria-label="Назад"
        >
          <ArrowLeft size={24} className="text-green-600" />
        </button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-red-500 bg-clip-text text-transparent">
          🍕 Итальянская кухня
        </h1>
      </header>

      {/* Dish Selection Section */}
      <div className="p-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Выберите блюдо</h2>
          <p className="text-gray-600">Свайп вправо для лайка, влево для пропуска</p>
        </div>

        {/* Dish Card */}
        <div className="relative w-full h-96 bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 transform cursor-grab active:cursor-grabbing"
          ref={cardRef}
          style={{ 
            transform: swipeDirection === 'left' 
              ? 'translateX(-100%) rotate(-10deg)' 
              : swipeDirection === 'right'
              ? 'translateX(100%) rotate(10deg)'
              : 'translateX(0) rotate(0)'
          }}
          onTouchStart={(e) => {
            const touchStartX = e.touches[0].clientX;
            const touchStartY = e.touches[0].clientY;
            
            const handleTouchEnd = (e: TouchEvent) => {
              const touchEndX = e.changedTouches[0].clientX;
              const touchEndY = e.changedTouches[0].clientY;
              const deltaX = touchEndX - touchStartX;
              const deltaY = touchEndY - touchStartY;

              if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 100) {
                if (deltaX > 0) {
                  handleSwipe('right');
                } else {
                  handleSwipe('left');
                }
              }
              
              document.removeEventListener('touchend', handleTouchEnd);
            };
            
            document.addEventListener('touchend', handleTouchEnd);
          }}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentDish.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
            {/* Top Info */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                <Clock size={14} className="text-orange-600" />
                <span className="text-sm font-medium text-gray-800">{currentDish.cookTime}</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                <Star size={14} className="text-yellow-500 fill-current" />
                <span className="text-sm font-bold text-gray-800">{currentDish.rating}</span>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-4 right-4 pb-4">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">{currentDish.name}</h2>
                <p className="text-white/80 text-sm mb-3">{currentDish.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentDish.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-orange-500/80 text-white text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Chef Info */}
                <button
                  onClick={() => handleShowChef(currentDish.chef)}
                  className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 mb-4 hover:bg-white/20 transition-colors w-full"
                >
                  <img
                    src={currentDish.chef.avatar}
                    alt={currentDish.chef.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-white">{currentDish.chef.name}</div>
                    <div className="text-white/70 text-sm">{currentDish.chef.speciality}</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-white font-medium">{currentDish.chef.rating}</span>
                  </div>
                </button>

                {/* Price and Details */}
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-white">
                    ₽{currentDish.price}
                  </div>
                  
                  <button
                    onClick={handleShowDetails}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                    aria-label="Подробности о блюде"
                  >
                    <Info size={20} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Swipe Animation Overlay */}
          {swipeDirection && (
            <div className={`absolute inset-0 flex items-center justify-center ${
              swipeDirection === 'right' ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              <div className={`text-6xl ${
                swipeDirection === 'right' ? 'text-green-500' : 'text-red-500'
              }`}>
                {swipeDirection === 'right' ? '❤️' : '✕'}
              </div>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {italianDishes.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentDishIndex ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

                 {/* Navigation Buttons */}
         <div className="flex justify-center mt-6 space-x-4">
           <button
             onClick={() => handleSwipe('left')}
             className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition-colors"
             aria-label="Пропустить блюдо"
           >
             ✕
           </button>
           <button
             onClick={() => handleSwipe('right')}
             className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
             aria-label="Понравилось блюдо"
           >
             ❤️
           </button>
         </div>
      </div>

      {/* Chef Presentation Card */}
      {showChefCard && selectedChef && (
        <ChefPresentationCard
          chef={selectedChef}
          onClose={() => {
            setShowChefCard(false);
            setSelectedChef(null);
          }}
        />
      )}
    </div>
  );
}; 