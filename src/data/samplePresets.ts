import pizzaImg from '@/src/assets/images/sample_pizza_margherita_1791715086102.jpg';
import sushiImg from '@/src/assets/images/sample_sushi_platter_1791715097596.jpg';
import saladImg from '@/src/assets/images/sample_caesar_salad_1791715110795.jpg';
import cakeImg from '@/src/assets/images/sample_chocolate_cake_1791715121305.jpg';

export interface SamplePreset {
  id: string;
  name: string;
  foodClass: string;
  imageSrc: string;
  description: string;
  suggestedMeal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  topPredictions: {
    foodClass: string;
    confidence: number;
  }[];
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'sample-pizza',
    name: 'Margherita Pizza',
    foodClass: 'pizza',
    imageSrc: pizzaImg,
    description: 'Fresh wood-fired pizza with mozzarella, tomato sauce, and fresh basil.',
    suggestedMeal: 'dinner',
    topPredictions: [
      { foodClass: 'pizza', confidence: 0.942 },
      { foodClass: 'garlic_bread', confidence: 0.038 },
      { foodClass: 'bruschetta', confidence: 0.012 },
    ],
  },
  {
    id: 'sample-sushi',
    name: 'Sushi & Maki Platter',
    foodClass: 'sushi',
    imageSrc: sushiImg,
    description: 'Fresh salmon nigiri, avocado tuna rolls, and pickled ginger on slate.',
    suggestedMeal: 'lunch',
    topPredictions: [
      { foodClass: 'sushi', confidence: 0.915 },
      { foodClass: 'sashimi', confidence: 0.062 },
      { foodClass: 'sea_urchin_roe', confidence: 0.015 },
    ],
  },
  {
    id: 'sample-salad',
    name: 'Classic Caesar Salad',
    foodClass: 'caesar_salad',
    imageSrc: saladImg,
    description: 'Crisp romaine lettuce, shaved parmesan, garlic croutons, and creamy dressing.',
    suggestedMeal: 'lunch',
    topPredictions: [
      { foodClass: 'caesar_salad', confidence: 0.887 },
      { foodClass: 'greek_salad', confidence: 0.074 },
      { foodClass: 'caprese_salad', confidence: 0.021 },
    ],
  },
  {
    id: 'sample-cake',
    name: 'Chocolate Fudge Cake',
    foodClass: 'chocolate_cake',
    imageSrc: cakeImg,
    description: 'Decadent multi-layer chocolate fudge cake with dark chocolate ganache.',
    suggestedMeal: 'snack',
    topPredictions: [
      { foodClass: 'chocolate_cake', confidence: 0.893 },
      { foodClass: 'chocolate_mousse', confidence: 0.081 },
      { foodClass: 'tiramisu', confidence: 0.018 },
    ],
  },
];
