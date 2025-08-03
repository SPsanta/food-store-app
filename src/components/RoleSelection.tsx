import React, { useState } from 'react';
import { ChefHat, Utensils } from 'lucide-react';
import { UserProfile } from './UserProfile';

interface RoleSelectionProps {
  onSelectRole: (role: 'chef' | 'consumer') => void;
}

export const RoleSelection = ({ onSelectRole }: RoleSelectionProps) => {
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleConsumerSelection = () => {
    setShowUserProfile(true);
  };

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

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Добро пожаловать в U COOK
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Выберите вашу роль в приложении
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full max-w-md">
          {/* Chef Option - Inactive */}
          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg opacity-50 cursor-not-allowed">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <ChefHat size={40} className="text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-500 mb-2">Я ГОТОВЛЮ</h3>
            <p className="text-xs text-gray-400 text-center">
              Для шеф-поваров и продавцов
            </p>
            <div className="mt-3 px-3 py-1 bg-gray-200 rounded-full">
              <span className="text-xs text-gray-400">Скоро</span>
            </div>
          </div>

          {/* Consumer Option - Active */}
                     <div 
             className="flex flex-col items-center p-6 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors border-2 border-orange-200 hover:border-orange-300"
             onClick={handleConsumerSelection}
           >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-orange-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Utensils size={40} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-orange-600 mb-2">Я ЕМ</h3>
            <p className="text-xs text-gray-600 text-center">
              Для любителей вкусной еды
            </p>
            <div className="mt-3 px-3 py-1 bg-orange-500 rounded-full">
              <span className="text-xs text-white font-medium">Доступно</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs text-gray-500 max-w-sm">
            Выберите "Я ЕМ" для доступа к карточке клиента и заказу блюд от лучших шефов
          </p>
                 </div>
       </div>

       {/* User Profile Modal */}
       {showUserProfile && (
         <UserProfile
           onClose={() => setShowUserProfile(false)}
         />
       )}
     </div>
   );
 }; 