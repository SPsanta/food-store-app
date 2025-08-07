import React, { useState, useRef } from 'react';
import { ArrowLeft, Star, Clock, Info, ChefHat } from 'lucide-react';
import { ChefPresentationCard } from '../ChefPresentationCard';

interface RussianCuisineProps {
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

export const RussianCuisine: React.FC<RussianCuisineProps> = ({ onBack }) => {
  const [currentDishIndex, setCurrentDishIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [showChefCard, setShowChefCard] = useState(false);
  const [selectedChef, setSelectedChef] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const russianDishes: Dish[] = [
    {
      id: '1',
      name: 'Борщ',
      description: 'Традиционный суп со свеклой, капустой и мясом',
      image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg',
      price: 850,
      cookTime: '90 мин',
      rating: 4.9,
      tags: ['суп', 'свекла', 'мясо'],
      chef: {
        name: 'Анна Петрова',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        speciality: 'Борщ',
        rating: 4.9
      }
    },
    {
      id: '2',
      name: 'Пельмени',
      description: 'Пельмени с мясной начинкой и сметаной',
      image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
      price: 750,
      cookTime: '20 мин',
      rating: 4.8,
      tags: ['пельмени', 'мясо', 'сметана'],
      chef: {
        name: 'Михаил Иванов',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        speciality: 'Пельмени',
        rating: 4.8
      }
    },
    {
      id: '3',
      name: 'Блины',
      description: 'Тонкие блины с икрой, сметаной или медом',
      image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg',
      price: 450,
      cookTime: '15 мин',
      rating: 4.7,
      tags: ['блины', 'икра', 'сметана'],
      chef: {
        name: 'Елена Сидорова',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        speciality: 'Блины',
        rating: 4.7
      }
    },
    {
      id: '4',
      name: 'Голубцы',
      description: 'Капустные листья с мясной начинкой',
      image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
      price: 950,
      cookTime: '60 мин',
      rating: 4.6,
      tags: ['капуста', 'мясо', 'листья'],
      chef: {
        name: 'Ольга Козлова',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        speciality: 'Голубцы',
        rating: 4.6
      }
    },
    {
      id: '5',
      name: 'Солянка',
      description: 'Густой суп с мясом, колбасой и солеными огурцами',
      image: 'https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg',
      price: 1100,
      cookTime: '75 мин',
      rating: 4.8,
      tags: ['суп', 'мясо', 'огурцы'],
      chef: {
        name: 'Дмитрий Волков',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        speciality: 'Солянка',
        rating: 4.8
      }
    },
    {
      id: '6',
      name: 'Котлеты по-киевски',
      description: 'Куриные котлеты с маслом внутри',
      image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg',
      price: 1200,
      cookTime: '30 мин',
      rating: 4.7,
      tags: ['котлеты', 'курица', 'масло'],
      chef: {
        name: 'Наталья Морозова',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        speciality: 'Котлеты',
        rating: 4.7
      }
    },
    {
      id: '7',
      name: 'Уха',
      description: 'Рыбный суп с картофелем и овощами',
      image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg',
      price: 900,
      cookTime: '45 мин',
      rating: 4.5,
      tags: ['рыба', 'суп', 'картофель'],
      chef: {
        name: 'Алексей Соколов',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        speciality: 'Уха',
        rating: 4.5
      }
    },
    {
      id: '8',
      name: 'Сырники',
      description: 'Творожные оладьи со сметаной и вареньем',
      image: 'https://images.pexels.com/photos/3071821/pexels-photo-3071821.jpeg',
      price: 550,
      cookTime: '20 мин',
      rating: 4.4,
      tags: ['творог', 'оладьи', 'сметана'],
      chef: {
        name: 'Мария Новикова',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        speciality: 'Сырники',
        rating: 4.4
      }
    },
    {
      id: '9',
      name: 'Бефстроганов',
      description: 'Говядина в сметанном соусе с грибами',
      image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
      price: 1400,
      cookTime: '40 мин',
      rating: 4.8,
      tags: ['говядина', 'сметана', 'грибы'],
      chef: {
        name: 'Сергей Попов',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        speciality: 'Бефстроганов',
        rating: 4.8
      }
    },
    {
      id: '10',
      name: 'Медовик',
      description: 'Традиционный медовый торт со сметанным кремом',
      image: 'https://images.pexels.com/photos/3071821/pexels-photo-3071821.jpeg',
      price: 650,
      cookTime: '120 мин',
      rating: 4.6,
      tags: ['торт', 'мед', 'сметана'],
      chef: {
        name: 'Татьяна Лебедева',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        speciality: 'Медовик',
        rating: 4.6
      }
    }
  ];

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    
    setTimeout(() => {
      setSwipeDirection(null);
      if (direction === 'right') {
        setCurrentDishIndex(prev => Math.min(prev + 1, russianDishes.length - 1));
      } else {
        setCurrentDishIndex(prev => Math.min(prev + 1, russianDishes.length - 1));
      }
    }, 300);
  };

  const handleShowDetails = () => {
    console.log('Показать детали:', russianDishes[currentDishIndex]);
  };

  const handleShowChef = (chef: any) => {
    setSelectedChef({
      ...chef,
      experience: '22+ лет',
      location: 'Москва, Россия',
      bio: 'Мастер русской кухни с глубоким пониманием традиционных рецептов. Специализируется на борще, пельменях и блинах. Изучал кулинарное искусство в России и получил множество наград.',
      awards: ['Мастер борща 2023', 'Золотой пельмень 2022', 'Лучшие блины 2021'],
      dishes: ['Борщ', 'Пельмени', 'Блины', 'Солянка', 'Гречка']
    });
    setShowChefCard(true);
  };

  const currentDish = russianDishes[currentDishIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-red-50">
      {/* Header */}
      <header className="flex items-center p-4 bg-white/80 backdrop-blur-lg">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors mr-4"
          aria-label="Назад"
        >
          <ArrowLeft size={24} className="text-blue-600" />
        </button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
          🥘 Русская кухня
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
                <Clock size={14} className="text-blue-600" />
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
                      className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full"
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
          {russianDishes.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentDishIndex ? 'bg-blue-500' : 'bg-gray-300'
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