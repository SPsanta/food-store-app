import React from 'react';
import { X, Star, MapPin, Clock, Award, ChefHat, Users, Calendar } from 'lucide-react';

interface ChefPresentationCardProps {
  chef: {
    name: string;
    avatar: string;
    speciality: string;
    rating: number;
    experience?: string;
    location?: string;
    bio?: string;
    awards?: string[];
    followers?: number;
    dishes?: string[];
  };
  onClose: () => void;
}

export const ChefPresentationCard: React.FC<ChefPresentationCardProps> = ({ chef, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Закрыть карточку шефа"
          >
            <X size={24} />
          </button>
          
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={chef.avatar}
                alt={chef.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-orange-100"
              />
              <div className="absolute -bottom-2 -right-2 bg-orange-500 rounded-full p-2">
                <ChefHat size={16} className="text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-4">{chef.name}</h2>
            <p className="text-orange-600 font-semibold text-lg">{chef.speciality}</p>
            
            <div className="flex items-center justify-center space-x-1 mt-2">
              <Star size={16} className="text-yellow-400 fill-current" />
              <span className="font-bold text-gray-800">{chef.rating}</span>
              <span className="text-gray-500 text-sm">({Math.floor(Math.random() * 200) + 50} отзывов)</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 border-b border-gray-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-orange-600">
                {chef.experience || '8+ лет'}
              </div>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <Calendar size={12} className="mr-1" />
                Опыт
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-orange-600">
                {chef.followers || Math.floor(Math.random() * 5000) + 1000}
              </div>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <Users size={12} className="mr-1" />
                Подписчиков
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-orange-600">
                {chef.dishes?.length || 15}+
              </div>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <ChefHat size={12} className="mr-1" />
                Блюд
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        {chef.bio && (
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Award size={16} className="mr-2 text-orange-500" />
              О шефе
            </h3>
            <p className="text-gray-600 leading-relaxed">{chef.bio}</p>
          </div>
        )}

        {/* Location */}
        {chef.location && (
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-2 text-orange-500" />
              <span>{chef.location}</span>
            </div>
          </div>
        )}

        {/* Awards */}
        {chef.awards && chef.awards.length > 0 && (
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3">Награды</h3>
            <div className="space-y-2">
              {chef.awards.map((award, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Award size={14} className="text-yellow-500" />
                  <span className="text-sm text-gray-600">{award}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Specialties */}
        {chef.dishes && chef.dishes.length > 0 && (
          <div className="p-6">
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
        )}

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              Написать
            </button>
            <button className="bg-orange-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-orange-600 transition-colors">
              Заказать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 