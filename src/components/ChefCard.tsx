import React, { useState } from 'react';
import { X, Star, Clock, MapPin, Heart, Utensils } from 'lucide-react';

import { Chef, Dish } from '../types';

interface ChefCardProps {
  chef: Chef;
  onClose: () => void;
  onAddToCart: (dish: Dish) => void;
}

export const ChefCard: React.FC<ChefCardProps> = ({ chef, onClose, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-4 border-b">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Закрыть карточку шеф-повара"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center space-x-4">
            <img
              src={chef.image}
              alt={chef.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800">{chef.name}</h2>
              <p className="text-orange-600 font-medium">{chef.specialty}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-1">
              <Star size={16} className="text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{chef.rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock size={16} />
              <span className="text-sm">{chef.experience}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <MapPin size={16} />
              <span className="text-sm">{chef.location}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800 mb-2">О шеф-поваре</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{chef.bio}</p>
        </div>

                 {/* Specialties */}
         <div className="p-4 border-b">
           <h3 className="font-semibold text-gray-800 mb-3">Специализация</h3>
           <div className="flex flex-wrap gap-2">
             {chef.dishes.map((dish, index) => (
               <span
                 key={index}
                 className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
               >
                 {dish}
               </span>
             ))}
           </div>
         </div>

         {/* Action Buttons */}
         <div className="p-4">
           <div className="flex space-x-3">
             <button
               onClick={() => setIsLiked(!isLiked)}
               className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                 isLiked 
                   ? 'bg-red-500 text-white hover:bg-red-600' 
                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
               }`}
             >
               <Heart size={18} className={isLiked ? 'fill-current' : ''} />
               <span>{isLiked ? 'Нравится' : 'Нравится'}</span>
             </button>
             
             <button
               onClick={() => setShowMenu(!showMenu)}
               className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                 showMenu 
                   ? 'bg-orange-500 text-white hover:bg-orange-600' 
                   : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
               }`}
             >
               <Utensils size={18} />
               <span>Меню от шефа</span>
             </button>
           </div>
         </div>

         {/* Chef Menu */}
         {showMenu && (
           <div className="p-4 border-t bg-gray-50">
             <h3 className="font-semibold text-gray-800 mb-3">Меню от {chef.name}</h3>
             <div className="space-y-3">
               {chef.dishes.map((dish, index) => (
                 <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                   <div>
                     <h4 className="font-medium text-gray-800">{dish}</h4>
                     <p className="text-sm text-gray-600">Специальность шефа</p>
                   </div>
                   <button
                     onClick={() => onAddToCart({ id: `chef-${chef.id}-${index}`, name: dish, price: 1500 })}
                     className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-orange-600 transition-colors"
                   >
                     Заказать
                   </button>
                 </div>
               ))}
             </div>
           </div>
         )}
       </div>
     </div>
   );
}; 