import React, { useState } from 'react';
import { User, MapPin, Heart, Settings, Gift, Clock, Plus, Edit, AlertTriangle } from 'lucide-react';
import { RegistrationModal } from './RegistrationModal';

interface UserProfileProps {
  onClose: () => void;
}

export const UserProfile = ({ onClose }: UserProfileProps) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Гость',
    firstName: '',
    lastName: '',
    phone: '',
    address: 'Не указан',
    points: 0,
    orders: [],
    allergies: [] as string[]
  });

  const menuItems = [
    ...(isRegistered ? [] : [{
      id: 'registration',
      title: 'Регистрация клиента',
      icon: <User size={20} className="text-orange-500" />,
      description: 'Создайте аккаунт для доступа к бонусам',
      action: () => setShowRegistration(true)
    }]),
    {
      id: 'orders',
      title: 'История заказов',
      icon: <Clock size={20} className="text-blue-500" />,
      description: 'Просмотр всех ваших заказов',
      action: () => console.log('История заказов')
    },
    {
      id: 'address',
      title: 'Адрес доставки',
      icon: <MapPin size={20} className="text-green-500" />,
      description: 'Управление адресами доставки',
      action: () => console.log('Адрес доставки')
    },
    {
      id: 'favorites',
      title: 'Избранное',
      icon: <Heart size={20} className="text-red-500" />,
      description: 'Ваши избранные блюда',
      action: () => console.log('Избранное')
    },
    {
      id: 'settings',
      title: 'Настройки аккаунта',
      icon: <Settings size={20} className="text-gray-500" />,
      description: 'Персональные настройки',
      action: () => console.log('Настройки')
    },
    {
      id: 'bonuses',
      title: 'Баллы и бонусы',
      icon: <Gift size={20} className="text-purple-500" />,
      description: 'Ваши баллы и доступные бонусы',
      action: () => console.log('Бонусы')
    },
    ...(isRegistered && userData.allergies.length > 0 ? [{
      id: 'allergies',
      title: 'Аллергии и ограничения',
      icon: <AlertTriangle size={20} className="text-red-500" />,
      description: `У вас ${userData.allergies.length} ограничений`,
      action: () => console.log('Аллергии')
    }] : [])
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-black text-white p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <User size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">{userData.name}</h2>
                <p className="text-sm text-gray-300">
                  {isRegistered ? 'Зарегистрированный клиент' : 'Гость'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          
          {/* Points Display */}
          <div className="mt-4 bg-gray-800 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Gift size={16} className="text-yellow-400" />
                <span className="text-sm">Баллы:</span>
              </div>
              <span className="text-lg font-bold text-yellow-400">{userData.points}</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-3">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={item.action}
              className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
                             <div className="text-gray-400">
                 <Edit size={16} />
               </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">Быстрые действия</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-orange-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
              Оформить заказ
            </button>
            <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
              Поддержка
            </button>
          </div>
        </div>

                 {/* Footer */}
         <div className="p-4 bg-gray-50 rounded-b-lg">
           <div className="text-center text-sm text-gray-600">
             <p>U COOK - Ваш персональный шеф</p>
             <p className="mt-1">Версия 1.0</p>
           </div>
         </div>
       </div>

       {/* Registration Modal */}
       {showRegistration && (
         <RegistrationModal
           onClose={() => setShowRegistration(false)}
           onRegister={(userData) => {
             setUserData(prev => ({
               ...prev,
               firstName: userData.firstName,
               lastName: userData.lastName,
               phone: userData.phone,
               name: `${userData.firstName} ${userData.lastName}`,
               allergies: userData.allergies
             }));
             setIsRegistered(true);
             setShowRegistration(false);
           }}
         />
       )}
     </div>
   );
 }; 