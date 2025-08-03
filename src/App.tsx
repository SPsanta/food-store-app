import React, { useState } from 'react';
import { MainScreen } from './components/MainScreen';
import { MenuScreen } from './components/MenuScreen';
import { ChefProfile } from './components/ChefProfile';
import { Cart } from './components/Cart';
import { RoleSelection } from './components/RoleSelection';
import { UserPreferences, Dish, Chef } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'role-selection' | 'main' | 'menu' | 'chef' | 'cart'>('role-selection');
  const [userPreferences] = useState<UserPreferences | null>({
    name: 'Пользователь',
    cuisine: 'all',
    dietaryRestrictions: [],
    spiceLevel: 'medium'
  });
  const [cartItems, setCartItems] = useState<Dish[]>([]);
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);



  const handleAddToCart = (dish: Dish) => {
    setCartItems(prev => [...prev, dish]);
  };

  const handleRemoveFromCart = (dishId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== dishId));
  };

  const handleShowChef = (chef: Chef) => {
    setSelectedChef(chef);
    setCurrentScreen('chef');
  };

  const handleRoleSelection = (role: 'chef' | 'consumer') => {
    if (role === 'consumer') {
      setCurrentScreen('main');
    }
    // Для роли 'chef' пока ничего не делаем, так как она неактивна
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'role-selection':
        return (
          <RoleSelection
            onSelectRole={handleRoleSelection}
          />
        );
      case 'main':
        return (
          <MainScreen
            onAddToCart={handleAddToCart}
            cartCount={cartItems.length}
          />
        );
      case 'menu':
        return (
          <MenuScreen
            onBack={() => setCurrentScreen('main')}
            onShowChef={handleShowChef}
          />
        );
      case 'chef':
        return (
          <ChefProfile
            chef={selectedChef}
            onBack={() => setCurrentScreen('main')}
            onAddToCart={handleAddToCart}
          />
        );
      case 'cart':
        return (
          <Cart
            items={cartItems}
            onBack={() => setCurrentScreen('main')}
            onRemove={handleRemoveFromCart}
          />
        );
      default:
        return (
          <MainScreen
            onAddToCart={handleAddToCart}
            cartCount={cartItems.length}
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
    </div>
  );
}

export default App;