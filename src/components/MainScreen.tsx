import React, { useState } from 'react';
import { Search, Star, ChevronDown } from 'lucide-react';
import { ChefCard } from './ChefCard';
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
      {/* Top Header */}
      <div className="bg-gray-100 px-2 sm:px-4 py-2 text-xs sm:text-sm">
        <div className="flex justify-between items-center">
          <div className="text-gray-600">
            Добро пожаловать, Пользователь (выйти)
          </div>
          <div className="hidden sm:flex items-center space-x-2 sm:space-x-4 text-gray-600">
            <span>Ваш аккаунт</span>
            <span>Валюты</span>
            <span className="font-semibold">RUB Рубль</span>
            <span>Ru | En</span>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="flex justify-center py-2 sm:py-4">
        <div className="bg-orange-500 text-white px-4 sm:px-8 py-2 sm:py-4 rounded-full font-bold text-lg sm:text-xl">
          ПРОДУКТОВЫЙ МАГАЗИН
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-800 py-2 sm:py-3">
        <div className="flex justify-center space-x-2 sm:space-x-8 text-xs sm:text-sm">
          <a href="#" className="text-white font-semibold flex items-center">
            ГЛАВНАЯ <Star size={10} className="ml-1 sm:w-3 sm:h-3" />
          </a>
          <a href="#" className="text-white font-semibold flex items-center">
            АКЦИИ <Star size={10} className="ml-1 sm:w-3 sm:h-3" />
          </a>
          <a href="#" className="text-white font-semibold flex items-center">
            ДОСТАВКА <Star size={10} className="ml-1 sm:w-3 sm:h-3" />
          </a>
          <a href="#" className="text-white font-semibold flex items-center">
            КОНТАКТЫ <Star size={10} className="ml-1 sm:w-3 sm:h-3" />
          </a>
        </div>
      </nav>

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
      <div className="flex flex-col lg:flex-row px-2 sm:px-4 gap-4 lg:gap-6">
        {/* Left Sidebar */}
        <div className="w-full lg:w-64 space-y-4 order-2 lg:order-1">
          {/* Categories */}
          <div className="bg-gray-800 text-white p-3 sm:p-4 rounded-lg">
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">КАТЕГОРИИ</h3>
            <div className="space-y-1 sm:space-y-2">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between cursor-pointer hover:text-orange-300">
                  <span className="text-xs sm:text-sm">{category}</span>
                  {category === 'МЯСО' && <ChevronDown size={12} className="sm:w-4 sm:h-4" />}
                </div>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="bg-orange-500 text-white p-3 sm:p-4 rounded-lg">
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">КОРЗИНА</h3>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <div>Нет товаров</div>
              <div>Доставка: ₽0</div>
              <div className="font-bold">Итого: ₽0</div>
            </div>
            <div className="flex justify-between mt-3 sm:mt-4">
              <button className="bg-white text-orange-500 px-2 sm:px-4 py-1 sm:py-2 rounded font-semibold text-xs sm:text-sm">
                КОРЗИНА
              </button>
              <span className="text-white">•</span>
              <button className="bg-white text-orange-500 px-2 sm:px-4 py-1 sm:py-2 rounded font-semibold text-xs sm:text-sm">
                ОФОРМИТЬ
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 order-1 lg:order-2">
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

      {/* Footer */}
      <footer className="mt-8 sm:mt-12 bg-gray-100 py-4 sm:py-8 px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600">
          <div className="space-y-1 sm:space-y-2">
            <div>КОНТАКТЫ</div>
            <div>ДОСТАВКА</div>
            <div>ПРАВОВАЯ ИНФОРМАЦИЯ</div>
            <div>УСЛОВИЯ ИСПОЛЬЗОВАНИЯ</div>
            <div>О НАС</div>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <div>ВАШ АККАУНТ</div>
            <div>ЛИЧНАЯ ИНФОРМАЦИЯ</div>
            <div>АДРЕСА</div>
            <div>СКИДКИ</div>
            <div>ИСТОРИЯ ЗАКАЗОВ</div>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <div>ВОЙТИ</div>
            <div>ВАША КОРЗИНА</div>
            <div>ИЗБРАННОЕ</div>
            <div>ОТСЛЕДИТЬ ЗАКАЗ</div>
            <div>ПОМОЩЬ</div>
          </div>
        </div>
        <div className="mt-4 sm:mt-8 text-xs text-gray-500">
          © 2012 Powered by PrestaShop™ Все права защищены.
        </div>
      </footer>

      {/* Chef Card Modal */}
      {selectedChef && (
        <ChefCard
          chef={selectedChef}
          onClose={() => setSelectedChef(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
};