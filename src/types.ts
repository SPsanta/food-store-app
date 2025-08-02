export interface UserPreferences {
  cuisines: string[];
  frequency: number;
  budget: [number, number];
}

export interface Chef {
  id: string;
  name: string;
  image: string;
  specialty: string;
  rating: number;
  experience: string;
  location: string;
  bio: string;
  dishes: string[];
}

export interface Dish {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  price: number;
  rating: number;
  cookTime: string;
  chef: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    speciality: string;
  };
  tags: string[];
  description: string;
  ingredients: string[];
}