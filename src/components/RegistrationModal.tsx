import React, { useState } from 'react';
import { User, Phone, X, Check, AlertTriangle, CheckCircle } from 'lucide-react';

interface RegistrationModalProps {
  onClose: () => void;
  onRegister: (userData: { firstName: string; lastName: string; phone: string; allergies: string[] }) => void;
}

export const RegistrationModal = ({ onClose, onRegister }: RegistrationModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    allergies: [] as string[]
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllergies, setShowAllergies] = useState(false);

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

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Введите имя';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'Имя должно содержать минимум 2 символа';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Введите фамилию';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Фамилия должна содержать минимум 2 символа';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Введите 10 цифр номера телефона';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Имитация отправки данных на сервер
    setTimeout(() => {
      onRegister(formData);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAllergyToggle = (allergy: string) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  const handleCategoryToggle = (category: typeof allergyCategories[0]) => {
    const allItemsSelected = category.items.every(item => formData.allergies.includes(item));
    
    if (allItemsSelected) {
      // Если все выбрано - убираем все
      setFormData(prev => ({
        ...prev,
        allergies: prev.allergies.filter(item => !category.items.includes(item))
      }));
    } else {
      // Если не все выбрано - добавляем все недостающие
      const missingItems = category.items.filter(item => !formData.allergies.includes(item));
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, ...missingItems]
      }));
    }
  };

  const formatPhone = (value: string) => {
    // Убираем все нецифровые символы
    const cleaned = value.replace(/\D/g, '');
    
    // Если ничего не введено
    if (cleaned.length === 0) return '';
    
    // Если введено меньше 10 цифр, не форматируем
    if (cleaned.length < 10) return cleaned;
    
    // Форматируем полный номер
    const code = cleaned.slice(0, 3);
    const first = cleaned.slice(3, 6);
    const second = cleaned.slice(6, 8);
    const third = cleaned.slice(8, 10);
    
    return `+7 (${code}) ${first}-${second}-${third}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-black text-white p-4 rounded-t-lg sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Регистрация</h2>
                <p className="text-sm text-gray-300">Создайте аккаунт</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Введите ваше имя"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Фамилия *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Введите вашу фамилию"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Номер телефона *
            </label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, '');
                  if (rawValue.length <= 10) {
                    handleInputChange('phone', rawValue);
                  }
                }}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Введите 10 цифр номера"
                maxLength={10}
              />
            </div>
            {formData.phone && formData.phone.length === 10 && (
              <p className="text-green-600 text-xs mt-1">
                {formatPhone(formData.phone)}
              </p>
            )}
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Allergies Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <AlertTriangle size={16} className="text-orange-500" />
                <span>Аллергии и ограничения</span>
              </label>
              <button
                type="button"
                onClick={() => setShowAllergies(!showAllergies)}
                className="text-sm text-orange-500 hover:text-orange-600 transition-colors"
              >
                {showAllergies ? 'Скрыть' : 'Показать'}
              </button>
            </div>
            
            {showAllergies && (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle size={16} className="text-orange-500" />
                    <p className="text-xs text-gray-600 font-medium">
                      Отметьте продукты, которые вам нельзя употреблять
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Мы исключим блюда с этими ингредиентами из ваших рекомендаций
                  </p>
                </div>

                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {allergyCategories.map((category) => {
                    const allItemsSelected = category.items.every(item => formData.allergies.includes(item));
                    const someItemsSelected = category.items.some(item => formData.allergies.includes(item));
                    
                    return (
                      <div key={category.name} className="border border-gray-200 rounded-lg p-3 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-800">{category.name}</h4>
                          <button
                            type="button"
                            onClick={() => handleCategoryToggle(category)}
                            className="flex items-center space-x-2 p-1 rounded text-xs transition-all duration-200 hover:bg-gray-100"
                          >
                            <div className={`w-3 h-3 rounded border transition-all duration-200 ${
                              allItemsSelected 
                                ? 'bg-orange-500 border-orange-500' 
                                : someItemsSelected 
                                  ? 'bg-orange-200 border-orange-300' 
                                  : 'bg-white border-gray-300'
                            }`}>
                              {allItemsSelected && (
                                <CheckCircle size={12} className="text-white" />
                              )}
                            </div>
                            <span className="text-xs text-gray-600">
                              {allItemsSelected ? 'Все' : someItemsSelected ? 'Частично' : 'Выбрать все'}
                            </span>
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {category.items.map((item) => (
                            <button
                              key={item}
                              type="button"
                              onClick={() => handleAllergyToggle(item)}
                              className={`flex items-center space-x-1 p-1 rounded text-xs transition-all duration-200 ${
                                formData.allergies.includes(item)
                                  ? 'bg-red-100 border border-red-300 text-red-700'
                                  : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              {formData.allergies.includes(item) ? (
                                <CheckCircle size={12} className="text-red-500" />
                              ) : (
                                <div className="w-3 h-3 rounded-full border border-gray-300" />
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
                {formData.allergies.length > 0 && (
                  <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-orange-700">
                        Выбрано ограничений: <strong>{formData.allergies.length}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, allergies: [] }))}
                        className="text-xs text-orange-600 hover:text-orange-800 underline"
                      >
                        Сбросить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              Я согласен с <span className="text-orange-500 cursor-pointer">условиями использования</span> и 
              <span className="text-orange-500 cursor-pointer"> политикой конфиденциальности</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Регистрация...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Check size={16} />
                <span>Зарегистрироваться</span>
              </div>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="p-4 bg-gray-50 rounded-b-lg">
          <p className="text-center text-sm text-gray-600">
            Уже есть аккаунт? <span className="text-orange-500 cursor-pointer">Войти</span>
          </p>
        </div>
      </div>
    </div>
  );
}; 