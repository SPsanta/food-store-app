import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';

interface AllergyScreenProps {
  onBack: () => void;
  onNext: (allergies: string[]) => void;
}

export const AllergyScreen: React.FC<AllergyScreenProps> = ({ onBack, onNext }) => {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const allergyCategories = [
    {
      name: 'Молочные продукты',
      items: [
        'Молоко',
        'Сыр',
        'Творог',
        'Сметана',
        'Сливочное масло',
        'Йогурт',
        'Кефир',
        'Сливки'
      ]
    },
    {
      name: 'Глютен',
      items: [
        'Пшеница',
        'Рожь',
        'Ячмень',
        'Овес',
        'Манная крупа',
        'Булгур',
        'Кускус',
        'Спагетти'
      ]
    },
    {
      name: 'Орехи и семена',
      items: [
        'Арахис',
        'Грецкие орехи',
        'Миндаль',
        'Кешью',
        'Фисташки',
        'Фундук',
        'Семена подсолнечника',
        'Семена кунжута'
      ]
    },
    {
      name: 'Морепродукты',
      items: [
        'Креветки',
        'Крабы',
        'Лобстеры',
        'Мидии',
        'Устрицы',
        'Кальмары',
        'Осетрина',
        'Тунец'
      ]
    },
    {
      name: 'Яйца',
      items: [
        'Куриные яйца',
        'Перепелиные яйца',
        'Утиные яйца',
        'Гусиные яйца'
      ]
    },
    {
      name: 'Бобовые',
      items: [
        'Соя',
        'Чечевица',
        'Нут',
        'Фасоль',
        'Горох',
        'Бобы',
        'Люпин'
      ]
    },
    {
      name: 'Фрукты',
      items: [
        'Клубника',
        'Цитрусовые',
        'Киви',
        'Ананас',
        'Манго',
        'Папайя',
        'Авокадо'
      ]
    },
    {
      name: 'Овощи',
      items: [
        'Помидоры',
        'Баклажаны',
        'Перец',
        'Сельдерей',
        'Морковь',
        'Свекла',
        'Шпинат'
      ]
    }
  ];

  const handleAllergyToggle = (allergy: string) => {
    setSelectedAllergies(prev =>
      prev.includes(allergy)
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy]
    );
  };

  const handleNext = () => {
    onNext(selectedAllergies);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Аллергии и ограничения</h2>
            <button
              onClick={onBack}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              aria-label="Назад"
            >
              <ArrowLeft size={16} className="text-gray-600" />
            </button>
          </div>

                     {/* Description */}
           <div className="mb-6">
             <div className="flex items-center space-x-2 mb-3">
               <AlertTriangle size={20} className="text-orange-500" />
               <p className="text-sm text-gray-600 font-medium">
                 Отметьте продукты, которые вам нельзя употреблять
               </p>
             </div>
             <p className="text-xs text-gray-500 mb-4">
               Мы исключим блюда с этими ингредиентами из ваших рекомендаций
             </p>
             <button
               onClick={handleNext}
               className="w-full bg-gray-100 text-gray-600 font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:bg-gray-200 text-sm"
             >
               Пропустить
             </button>
           </div>

                     {/* Allergy Categories */}
           <div className="space-y-6">
             {allergyCategories.map((category) => {
               const allItemsSelected = category.items.every(item => selectedAllergies.includes(item));
               const someItemsSelected = category.items.some(item => selectedAllergies.includes(item));
               
               const handleCategoryToggle = () => {
                 if (allItemsSelected) {
                   // Если все выбрано - убираем все
                   setSelectedAllergies(prev => prev.filter(item => !category.items.includes(item)));
                 } else {
                   // Если не все выбрано - добавляем все недостающие
                   const missingItems = category.items.filter(item => !selectedAllergies.includes(item));
                   setSelectedAllergies(prev => [...prev, ...missingItems]);
                 }
               };
               
               return (
                 <div key={category.name} className="border border-gray-200 rounded-xl p-4">
                   <div className="flex items-center justify-between mb-3">
                     <h3 className="font-semibold text-gray-800">{category.name}</h3>
                     <button
                       onClick={handleCategoryToggle}
                       className="flex items-center space-x-2 p-2 rounded-lg text-sm transition-all duration-200 hover:bg-gray-100"
                       aria-label={`Выбрать все ${category.name}`}
                     >
                       <div className={`w-4 h-4 rounded border-2 transition-all duration-200 ${
                         allItemsSelected 
                           ? 'bg-orange-500 border-orange-500' 
                           : someItemsSelected 
                             ? 'bg-orange-200 border-orange-300' 
                             : 'bg-white border-gray-300'
                       }`}>
                         {allItemsSelected && (
                           <CheckCircle size={16} className="text-white" />
                         )}
                       </div>
                       <span className="text-xs text-gray-600">
                         {allItemsSelected ? 'Все' : someItemsSelected ? 'Частично' : 'Выбрать все'}
                       </span>
                     </button>
                   </div>
                   <div className="grid grid-cols-2 gap-2">
                     {category.items.map((item) => (
                       <button
                         key={item}
                         onClick={() => handleAllergyToggle(item)}
                         className={`flex items-center space-x-2 p-2 rounded-lg text-sm transition-all duration-200 ${
                           selectedAllergies.includes(item)
                             ? 'bg-red-100 border border-red-300 text-red-700'
                             : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
                         }`}
                       >
                         {selectedAllergies.includes(item) ? (
                           <CheckCircle size={16} className="text-red-500" />
                         ) : (
                           <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                         )}
                         <span className="text-xs">{item}</span>
                       </button>
                     ))}
                   </div>
                 </div>
               );
             })}
           </div>

          {/* Selected Count */}
          {selectedAllergies.length > 0 && (
            <div className="mt-6 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-orange-700">
                  Выбрано ограничений: <strong>{selectedAllergies.length}</strong>
                </span>
                <button
                  onClick={() => setSelectedAllergies([])}
                  className="text-xs text-orange-600 hover:text-orange-800 underline"
                >
                  Сбросить
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 space-y-3">
            <button
              onClick={handleNext}
              className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:bg-orange-600 shadow-lg"
            >
              <span>Далее</span>
              <ArrowRight size={20} />
            </button>
            
            <button
              onClick={handleNext}
              className="w-full bg-gray-100 text-gray-600 font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:bg-gray-200"
            >
              Пропустить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
