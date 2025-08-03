import React, { useState } from 'react';
import { Search, Star, ChevronDown } from 'lucide-react';
import { ChefCard } from './ChefCard';
import { UserProfile } from './UserProfile';
import { UserPreferences, Dish, Chef } from '../types';

interface MainScreenProps {
  userPreferences: UserPreferences | null;
  onAddToCart: (dish: Dish) => void;
  onShowMenu: () => void;
  onShowCart: () => void;
  onShowChef: (chef: any) => void;
  cartCount: number;
}

export const MainScreen = ({
  userPreferences,
  onAddToCart,
  onShowMenu,
  onShowCart,
  onShowChef,
  cartCount
}: MainScreenProps) => {
  const [selectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);
  const [showUserProfile, setShowUserProfile] = useState(false);

  // Моковые данные продуктов
  const products = [
    {
      id: '1',
      name: 'СВЕЖИЕ МОРЕПРОДУКТЫ ПРЕМИУМ КАЧЕСТВА',
      image: '/images/Seafood.jpg',
      chefImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      chefName: 'Шеф Александр',
      price: 1899,
      category: 'seafood'
    },
    {
      id: '2',
      name: 'ИТАЛЬЯНСКАЯ ПАСТА С ДОМАШНИМ СОУСОМ',
      image: '/images/pasta.jpg',
      chefImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      chefName: 'Шеф Мария',
      price: 1299,
      category: 'pasta'
    },
    {
      id: '3',
      name: 'ГРИЛЬ ЛОСОСЬ С ОВОЩАМИ И ЛИМОНОМ',
      image: '/images/salmon.jpeg',
      chefImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      chefName: 'Шеф Дмитрий',
      price: 2499,
      category: 'seafood'
    },
    {
      id: '4',
      name: 'СТЕЙК ИЗ ГОВЯДИНЫ С ГАРНИРОМ',
      image: '/images/steak.jpg',
      chefImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      chefName: 'Шеф Анна',
      price: 1899,
      category: 'meat'
    },
    {
      id: '5',
      name: 'ПАСТА КАРБОНАРА С БЕКОНОМ И СЫРОМ',
      image: '/images/carbonara.jpg',
      chefImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      chefName: 'Шеф Марко',
      price: 1499,
      category: 'pasta'
    },
    {
      id: '6',
      name: 'КУРИНАЯ ГРУДКА С ОВОЩАМИ И ТРАВАМИ',
      image: '/images/chicken.jpg',
      chefImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      chefName: 'Шеф Елена',
      price: 999,
      category: 'meat'
    }
  ];

  const categories = [
    'ФРУКТЫ/ОВОЩИ',
    'МЯСО',
    'МОРЕПРОДУКТЫ',
    'ЗАКУСКИ',
    'ПИЦЦА/ПАСТА',
    'ГАРНИРЫ',
    'АПЕРИТИВЫ',
    'СНЕКИ',
    'МОРОЖЕНОЕ'
  ];

  // Данные шеф-поваров
  const chefs = [
    {
      id: '1',
      name: 'Шеф Александр',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      specialty: 'Морепродукты',
      rating: 4.9,
      experience: '15 лет',
      location: 'Москва',
      bio: 'Эксперт по морепродуктам с 15-летним опытом работы в лучших ресторанах. Специализируется на приготовлении свежих морепродуктов и рыбных блюд.',
      dishes: ['Морепродукты', 'Рыба', 'Устрицы', 'Креветки']
    },
    {
      id: '2',
      name: 'Шеф Мария',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      specialty: 'Итальянская кухня',
      rating: 4.8,
      experience: '12 лет',
      location: 'Санкт-Петербург',
      bio: 'Мастер итальянской кухни с глубоким пониманием традиционных рецептов. Готовит аутентичные пасты и соусы.',
      dishes: ['Паста', 'Пицца', 'Ризотто', 'Соусы']
    },
    {
      id: '3',
      name: 'Шеф Дмитрий',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      specialty: 'Рыба и морепродукты',
      rating: 4.7,
      experience: '10 лет',
      location: 'Сочи',
      bio: 'Специалист по приготовлению рыбы и морепродуктов. Использует только свежие ингредиенты и современные техники приготовления.',
      dishes: ['Лосось', 'Тунец', 'Морепродукты', 'Гриль']
    },
    {
      id: '4',
      name: 'Шеф Анна',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      specialty: 'Мясные блюда',
      rating: 4.9,
      experience: '18 лет',
      location: 'Казань',
      bio: 'Эксперт по приготовлению мясных блюд. Создает изысканные стейки и мясные блюда с использованием лучших сортов мяса.',
      dishes: ['Стейки', 'Говядина', 'Баранина', 'Свинина']
    },
    {
      id: '5',
      name: 'Шеф Марко',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      specialty: 'Итальянская кухня',
      rating: 4.8,
      experience: '14 лет',
      location: 'Ростов-на-Дону',
      bio: 'Настоящий итальянец с глубокими знаниями традиционной кухни. Специализируется на пастах и классических итальянских блюдах.',
      dishes: ['Карбонара', 'Болоньезе', 'Карбонара', 'Лазанья']
    },
    {
      id: '6',
      name: 'Шеф Елена',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      specialty: 'Здоровое питание',
      rating: 4.6,
      experience: '8 лет',
      location: 'Новосибирск',
      bio: 'Специалист по здоровому питанию и диетическим блюдам. Создает вкусные и полезные блюда из качественных ингредиентов.',
      dishes: ['Курица', 'Овощи', 'Диетические блюда', 'Салаты']
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative group cursor-pointer">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-32 sm:h-48 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="w-full h-32 sm:h-48 bg-gradient-to-br from-orange-200 to-red-200 rounded-lg hidden flex items-center justify-center text-gray-600 font-semibold">
                    {product.name.split(' ')[0]}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                    ₽{product.price}
                  </div>
                  {/* Chef Image */}
                  <div className="absolute top-3 right-3">
                    <div className="relative">
                      <img 
                        src={product.chefImage} 
                        alt={product.chefName}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-[0_0_10px_rgba(255,255,255,0.8)] object-cover cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => {
                          const chef = chefs.find(c => c.name === product.chefName);
                          if (chef) setSelectedChef(chef);
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-white shadow-[0_0_5px_rgba(255,255,255,0.6)]"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs sm:text-sm text-gray-600 leading-tight">
                    {product.name}
                  </p>
                  <p className="text-xs text-orange-600 font-medium mt-1">
                    {product.chefName}
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
                       <div className="flex flex-col items-center space-y-1 cursor-pointer" onClick={() => setShowUserProfile(true)}>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm">👤</span>
              </div>
              <span className="text-xs text-gray-600">Профиль</span>
            </div>
         </div>
       </div>

       

             {/* Chef Card Modal */}
       {selectedChef && (
         <ChefCard
           chef={selectedChef}
           onClose={() => setSelectedChef(null)}
           onAddToCart={onAddToCart}
         />
       )}

       {/* User Profile Modal */}
       {showUserProfile && (
         <UserProfile
           onClose={() => setShowUserProfile(false)}
         />
       )}
    </div>
  );
};