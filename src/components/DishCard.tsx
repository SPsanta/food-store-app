import React, { forwardRef, useState } from 'react';
import { Star, Clock, Info, ChefHat as Chef } from 'lucide-react';
import { Dish } from '../types';

interface DishCardProps {
  dish: Dish;
  swipeDirection: 'left' | 'right' | null;
  onSwipe: (direction: 'left' | 'right') => void;
  onShowDetails: () => void;
  onShowChef: (chef: any) => void;
}

export const DishCard = forwardRef<HTMLDivElement, DishCardProps>(
  ({ dish, swipeDirection, onSwipe, onShowDetails, onShowChef }, ref) => {
    const [isDoubleTouch, setIsDoubleTouch] = useState(false);
    let touchStartX = 0;
    let touchStartY = 0;
    let lastTouchTime = 0;

    const handleTouchStart = (e: React.TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const currentTime = Date.now();

      // Check for double tap
      if (currentTime - lastTouchTime < 300 && Math.abs(deltaX) < 30 && Math.abs(deltaY) < 30) {
        onShowDetails();
        return;
      }
      lastTouchTime = currentTime;

      // Check for swipe
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 100) {
        if (deltaX > 0) {
          onSwipe('right');
        } else {
          onSwipe('left');
        }
      }
    };

    const cardTransform = swipeDirection === 'left' 
      ? 'translateX(-100%) rotate(-10deg)' 
      : swipeDirection === 'right'
      ? 'translateX(100%) rotate(10deg)'
      : 'translateX(0) rotate(0)';

    return (
      <div
        ref={ref}
        className="relative w-full h-96 bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 transform cursor-grab active:cursor-grabbing"
        style={{ transform: cardTransform }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dish.image})` }}
        >
          <div className="absolutae inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          {/* Top Info */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
              <Clock size={14} className="text-orange-600" />
              <span className="text-sm font-medium text-gray-800">{dish.cookTime}</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
              <Star size={14} className="text-yellow-500 fill-current" />
              <span className="text-sm font-bold text-gray-800">{dish.rating}</span>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white mb-2">{dish.name}</h2>
              <p className="text-white/80 text-sm mb-3">{dish.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {dish.tags.map((tag) => (
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
                onClick={() => onShowChef(dish.chef)}
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 mb-4 hover:bg-white/20 transition-colors w-full"
              >
                <img
                  src={dish.chef.avatar}
                  alt={dish.chef.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 text-left">
                  <div className="font-semibold text-white">{dish.chef.name}</div>
                  <div className="text-white/70 text-sm">{dish.chef.speciality}</div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span className="text-white font-medium">{dish.chef.rating}</span>
                </div>
              </button>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-white">
                  ₽{dish.price}
                </div>
                
                <button
                  onClick={onShowDetails}
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

        {/* Double Tap Hint */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 opacity-0 animate-pulse">
            <span className="text-white text-sm">Двойной тап для деталей</span>
          </div>
        </div>
      </div>
    );
  }
);