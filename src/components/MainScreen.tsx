import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { ChefPresentationCard } from './ChefPresentationCard';
import { Dish, Chef } from '../types';
import { 
  JapaneseCuisine, 
  ChineseCuisine, 
  ItalianCuisine, 
  MexicanCuisine, 
  AmericanCuisine, 
  IndianCuisine, 
  RussianCuisine, 
  HealthyCuisine 
} from './cuisines';

interface MainScreenProps {
  onAddToCart: (dish: Dish) => void;
  cartCount: number;
  onShowRoleSelection: () => void;
}

export const MainScreen = ({
  onAddToCart,
  cartCount,
  onShowRoleSelection
}: MainScreenProps) => {
  const [selectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);
  const [isCuisineMenuOpen, setIsCuisineMenuOpen] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [showBudgetPage, setShowBudgetPage] = useState(false);
  const [budget, setBudget] = useState<[number, number]>([500, 2000]);
  const [showCuisinePage, setShowCuisinePage] = useState<string | null>(null);

  const cuisines = [
    { emoji: '🍣', name: 'Японская', value: 'japanese' },
    { emoji: '🥟', name: 'Китайская', value: 'chinese' },
    { emoji: '🍕', name: 'Итальянская', value: 'italian' },
    { emoji: '🌮', name: 'Мексиканская', value: 'mexican' },
    { emoji: '🍔', name: 'Американская', value: 'american' },
    { emoji: '🥘', name: 'Индийская', value: 'indian' },
    { emoji: '🍖', name: 'Русская', value: 'russian' },
    { emoji: '🥗', name: 'Здоровая', value: 'healthy' },
  ];

  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const handleStartCooking = () => {
    if (selectedCuisines.length === 1) {
      setShowCuisinePage(selectedCuisines[0]);
    } else {
      // Если выбрано несколько кухонь, показываем первую
      setShowCuisinePage(selectedCuisines[0]);
    }
    setShowBudgetPage(false);
    setIsCuisineMenuOpen(false);
  };

  const handleBackFromCuisine = () => {
    setShowCuisinePage(null);
  };

  // Моковые данные продуктов
  const products = [
    {
      id: 1,
      name: 'Морские дары',
      description: 'Свежие морепродукты с лимоном и травами',
      price: 1200,
      image: '', // Убрал изображение
      chef: {
        id: '1',
        name: 'Алексей Петров',
        image: '', // Убрал изображение
        avatar: '', // Убрал изображение
        specialty: 'Морепродукты',
        speciality: 'Морепродукты',
        rating: 4.8,
        experience: '8 лет',
        location: 'Москва',
        bio: 'Специалист по морепродуктам',
        dishes: ['Устрицы', 'Лобстер', 'Креветки']
      }
    },
    {
      id: 2,
      name: 'Паста Карбонара',
      description: 'Классическая итальянская паста с беконом и яйцом',
      price: 800,
      image: '', // Убрал изображение
      chef: {
        id: '2',
        name: 'Мария Сидорова',
        image: '', // Убрал изображение
        avatar: '', // Убрал изображение
        specialty: 'Итальянская кухня',
        speciality: 'Итальянская кухня',
        rating: 4.9,
        experience: '12 лет',
        location: 'Санкт-Петербург',
        bio: 'Мастер итальянской кухни',
        dishes: ['Паста', 'Пицца', 'Ризотто']
      }
    },
    {
      id: 3,
      name: 'Лосось на гриле',
      description: 'Филе лосося с овощами и соусом',
      price: 1500,
      image: '', // Убрал изображение
      chef: {
        id: '3',
        name: 'Дмитрий Козлов',
        image: '', // Убрал изображение
        avatar: '', // Убрал изображение
        specialty: 'Рыбные блюда',
        speciality: 'Рыбные блюда',
        rating: 4.7,
        experience: '10 лет',
        location: 'Казань',
        bio: 'Эксперт по рыбным блюдам',
        dishes: ['Лосось', 'Тунец', 'Морской окунь']
      }
    },
    {
      id: 4,
      name: 'Стейк Рибай',
      description: 'Сочный стейк с картофелем и овощами',
      price: 2000,
      image: '', // Убрал изображение
      chef: {
        id: '4',
        name: 'Анна Волкова',
        image: '', // Убрал изображение
        avatar: '', // Убрал изображение
        specialty: 'Мясные блюда',
        speciality: 'Мясные блюда',
        rating: 4.8,
        experience: '15 лет',
        location: 'Екатеринбург',
        bio: 'Мастер стейков',
        dishes: ['Стейк', 'Бургер', 'Ростбиф']
      }
    },
    {
      id: 5,
      name: 'Карбонара',
      description: 'Паста с беконом, яйцом и сыром',
      price: 900,
      image: '', // Убрал изображение
      chef: {
        id: '5',
        name: 'Сергей Иванов',
        image: '', // Убрал изображение
        avatar: '', // Убрал изображение
        specialty: 'Паста',
        speciality: 'Паста',
        rating: 4.6,
        experience: '9 лет',
        location: 'Новосибирск',
        bio: 'Специалист по пасте',
        dishes: ['Карбонара', 'Болоньезе', 'Альфредо']
      }
    },
    {
      id: 6,
      name: 'Курица по-французски',
      description: 'Куриная грудка с грибами и сыром',
      price: 700,
      image: '', // Убрал изображение
      chef: {
        id: '6',
        name: 'Елена Смирнова',
        image: '', // Убрал изображение
        avatar: '', // Убрал изображение
        specialty: 'Французская кухня',
        speciality: 'Французская кухня',
        rating: 4.5,
        experience: '11 лет',
        location: 'Ростов-на-Дону',
        bio: 'Эксперт французской кухни',
        dishes: ['Курица', 'Утка', 'Телятина']
      }
    }
  ];



  // Данные шеф-поваров
  const chefs = [
    {
      id: '1',
      name: 'Алексей Петров',
      image: '', // Убрал изображение
      avatar: '', // Убрал изображение
      specialty: 'Морепродукты',
      speciality: 'Морепродукты',
      rating: 4.8,
      experience: '8 лет',
      location: 'Москва',
      bio: 'Специалист по морепродуктам',
      dishes: ['Устрицы', 'Лобстер', 'Креветки']
    },
    {
      id: '2',
      name: 'Мария Сидорова',
      image: '', // Убрал изображение
      avatar: '', // Убрал изображение
      specialty: 'Итальянская кухня',
      speciality: 'Итальянская кухня',
      rating: 4.9,
      experience: '12 лет',
      location: 'Санкт-Петербург',
      bio: 'Мастер итальянской кухни',
      dishes: ['Паста', 'Пицца', 'Ризотто']
    },
    {
      id: '3',
      name: 'Дмитрий Козлов',
      image: '', // Убрал изображение
      avatar: '', // Убрал изображение
      specialty: 'Рыбные блюда',
      speciality: 'Рыбные блюда',
      rating: 4.7,
      experience: '10 лет',
      location: 'Казань',
      bio: 'Эксперт по рыбным блюдам',
      dishes: ['Лосось', 'Тунец', 'Морской окунь']
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

    // Если открыта страница кухни, показываем только её
  if (showCuisinePage) {
    return (
      <>
        {showCuisinePage === 'japanese' && (
          <JapaneseCuisine onBack={handleBackFromCuisine} />
        )}
        {showCuisinePage === 'chinese' && (
          <ChineseCuisine onBack={handleBackFromCuisine} />
        )}
        {showCuisinePage === 'italian' && (
          <ItalianCuisine onBack={handleBackFromCuisine} />
        )}
        {showCuisinePage === 'mexican' && (
          <MexicanCuisine onBack={handleBackFromCuisine} />
        )}
        {showCuisinePage === 'american' && (
          <AmericanCuisine onBack={handleBackFromCuisine} />
        )}
        {showCuisinePage === 'indian' && (
          <IndianCuisine onBack={handleBackFromCuisine} />
        )}
        {showCuisinePage === 'russian' && (
          <RussianCuisine onBack={handleBackFromCuisine} />
        )}
        {showCuisinePage === 'healthy' && (
          <HealthyCuisine onBack={handleBackFromCuisine} />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      
             {/* Menu Button */}
       {!isCuisineMenuOpen && !showBudgetPage && (
         <div className="fixed top-4 left-4 z-50">
           <button
             onClick={() => {
                               // Сброс состояний при открытии меню
                setSelectedCuisines([]);
                setShowBudgetPage(false);
                setBudget([500, 2000]);
                setShowCuisinePage(null);
                setIsCuisineMenuOpen(true);
              }}
              className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg"
              aria-label="Открыть меню кухонь"
            >
              <Menu size={20} className="text-white" />
            </button>
          </div>
        )}

      {/* Cuisine Selection Overlay */}
      {isCuisineMenuOpen && !showBudgetPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsCuisineMenuOpen(false)}>
          <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
                             <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-bold text-gray-800">Выберите кухню</h2>
                 <button
                   onClick={() => setIsCuisineMenuOpen(false)}
                   className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                   aria-label="Закрыть меню кухонь"
                 >
                   <X size={16} className="text-gray-600" />
                 </button>
               </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">Какие кухни вы любите?</p>
                <div className="grid grid-cols-2 gap-3">
                  {cuisines.map((cuisine) => (
                    <button
                      key={cuisine.value}
                      onClick={() => handleCuisineToggle(cuisine.value)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                        selectedCuisines.includes(cuisine.value)
                          ? 'border-orange-500 bg-orange-100 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-orange-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{cuisine.emoji}</div>
                      <div className="text-xs font-medium text-gray-700">{cuisine.name}</div>
                    </button>
                  ))}
                </div>
                
                {selectedCuisines.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Выбранные кухни:</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedCuisines.map((cuisine) => {
                        const cuisineData = cuisines.find(c => c.value === cuisine);
                        return (
                          <span
                            key={cuisine}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-800"
                          >
                            {cuisineData?.emoji} {cuisineData?.name}
                          </span>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setShowBudgetPage(true)}
                      className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:bg-orange-600 shadow-lg"
                    >
                      <span>Далее</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

             {/* Budget Selection Overlay */}
       {showBudgetPage && (
         <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
           <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50">
             <div className="p-6 pt-16">
                             <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-bold text-gray-800">Ваш бюджет?</h2>
                 <button
                   onClick={() => {
                     setShowBudgetPage(false);
                     setIsCuisineMenuOpen(false);
                   }}
                   className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                   aria-label="Закрыть"
                 >
                   <X size={16} className="text-gray-600" />
                 </button>
               </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">Покажем блюда в вашем диапазоне</p>
                
                                 <div className="bg-white rounded-2xl p-6 shadow-lg">
                   <div className="mb-6">
                     <div className="space-y-6">
                       <div>
                         <div className="flex justify-between mb-2">
                           <span className="text-sm text-gray-600">Минимальный бюджет</span>
                           <span className="text-lg font-semibold text-orange-600">
                             ₽{budget[0]}
                           </span>
                         </div>
                         <input
                           type="range"
                           min="100"
                           max="5000"
                           value={budget[0]}
                           onChange={(e) => setBudget([Number(e.target.value), budget[1]])}
                           className="w-full h-3 bg-gradient-to-r from-orange-200 to-orange-500 rounded-lg appearance-none cursor-pointer"
                           aria-label="Минимальный бюджет"
                         />
                       </div>
                       
                       <div>
                         <div className="flex justify-between mb-2">
                           <span className="text-sm text-gray-600">Максимальный бюджет</span>
                           <span className="text-lg font-semibold text-orange-600">
                             ₽{budget[1]}
                           </span>
                         </div>
                         <input
                           type="range"
                           min="100"
                           max="5000"
                           value={budget[1]}
                           onChange={(e) => setBudget([budget[0], Number(e.target.value)])}
                           className="w-full h-3 bg-gradient-to-r from-orange-200 to-orange-500 rounded-lg appearance-none cursor-pointer"
                           aria-label="Максимальный бюджет"
                         />
                       </div>
                     </div>
                   </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-orange-50 rounded-xl">
                      <div className="text-sm text-gray-600">Минимум</div>
                      <div className="font-bold text-orange-600">₽{budget[0]}</div>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-xl">
                      <div className="text-sm text-gray-600">Средний чек</div>
                      <div className="font-bold text-orange-600">₽{Math.round((budget[0] + budget[1]) / 2)}</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-xl">
                      <div className="text-sm text-gray-600">Максимум</div>
                      <div className="font-bold text-orange-600">₽{budget[1]}</div>
                    </div>
                  </div>
                </div>
                
                                 <button
                   onClick={handleStartCooking}
                   className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:bg-orange-600 shadow-lg"
                 >
                   <span>Начать готовить!</span>
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logo Section */}
      <div className="flex justify-center py-3 sm:py-5">
          <div className="bg-black text-white px-8 sm:px-13 py-4 sm:py-6 rounded-lg font-serif text-2xl sm:text-3xl font-bold relative">
            <span className="relative">
              U COOK
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-red-500 transform -translate-y-1" style={{ borderRadius: '50% 50% 0 0' }}></div>
            </span>
          </div>
        </div>

             

      {/* Hero Banner */}
      <div className="relative h-32 sm:h-64 bg-gray-200 mb-4 sm:mb-6">
        <img 
          src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg" 
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Search and Popular Products */}
      <div className="px-2 sm:px-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-300 pb-2 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Search size={16} className="text-orange-500 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none outline-none text-gray-600 text-sm sm:text-base"
            />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-gray-800">ПОПУЛЯРНЫЕ ТОВАРЫ</h2>
        </div>
      </div>

                        {/* Main Content */}
      <div className="px-2 sm:px-4">
        {/* Products Grid */}
        <div className="w-full">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative group cursor-pointer">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-24 sm:h-32 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="w-full h-24 sm:h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-lg hidden flex items-center justify-center text-gray-600 font-semibold text-xs">
                    {product.name.split(' ')[0]}
                  </div>
                  <div className="absolute bottom-1 left-1 bg-orange-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">
                    ₽{product.price}
                  </div>
                                     {/* Chef Image */}
                  <div className="absolute -top-1 -right-1">
                    <div className="relative">
                                              <img 
                         src={product.chef.avatar} 
                         alt={product.chef.name}
                         className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-[0_0_8px_rgba(255,255,255,0.8)] object-cover cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => {
                          const chef = chefs.find(c => c.name === product.chef.name);
                          if (chef) setSelectedChef(chef);
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border border-white shadow-[0_0_3px_rgba(255,255,255,0.6)]"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-xs text-gray-600 leading-tight line-clamp-2">
                    {product.name}
                  </p>
                  <p className="text-xs text-orange-600 font-medium mt-0.5">
                    {product.chef.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

             {/* Bottom Navigation Menu */}
       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
         <div className="flex justify-around items-center">
                       <div className="flex flex-col items-center space-y-1 cursor-pointer" onClick={() => window.location.reload()}>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🏠</span>
              </div>
              <span className="text-xs text-orange-500 font-medium">Главная</span>
            </div>
           <div className="flex flex-col items-center space-y-1">
             <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
               <span className="text-gray-600 text-sm">📋</span>
             </div>
             <span className="text-xs text-gray-600">Меню</span>
           </div>
           <div className="flex flex-col items-center space-y-1">
             <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
               <span className="text-gray-600 text-sm">👨‍🍳</span>
             </div>
             <span className="text-xs text-gray-600">Шефы</span>
           </div>
           <div className="flex flex-col items-center space-y-1 relative">
             <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
               <span className="text-gray-600 text-sm">🛒</span>
             </div>
             {cartCount > 0 && (
               <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                 <span className="text-white text-xs font-bold">{cartCount}</span>
               </div>
             )}
             <span className="text-xs text-gray-600">Корзина</span>
           </div>
                       <div className="flex flex-col items-center space-y-1 cursor-pointer" onClick={onShowRoleSelection}>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm">👤</span>
              </div>
              <span className="text-xs text-gray-600">Профиль</span>
            </div>
         </div>
       </div>

       

             {/* Chef Presentation Card Modal */}
                       {selectedChef && (
          <ChefPresentationCard
            chef={selectedChef}
            onClose={() => setSelectedChef(null)}
          />
        )}

               </div>
     );
};