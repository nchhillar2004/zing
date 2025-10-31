import { Category } from "@prisma/client";

export type CategorySelection = {
  category: Category;
  name: string;
};

export const categories: CategorySelection[] = [
  { category: "TECHNOLOGY", name: "Technology" },
  { category: "SCIENCE", name: "Science" },
  { category: "HEALTH_AND_FITNESS", name: "Health & Fitness" },
  { category: "BUSINESS_AND_FINANCE", name: "Business & Finance" },
  { category: "EDUCATION", name: "Education" },
  { category: "ENTERTAINMENT", name: "Entertainment" },
  { category: "SPORTS", name: "Sports" },
  { category: "TRAVEL", name: "Travel" },
  { category: "FOOD_AND_COOKING", name: "Food & Cooking" },
  { category: "FASHION_AND_BEAUTY", name: "Fashion & Beauty" },
  { category: "ART_AND_DESIGN", name: "Art & Design" },
  { category: "GAMING", name: "Gaming" },
  { category: "POLITICS", name: "Politics" },
  { category: "ENVIRONMENT_AND_SUSTAINABILITY", name: "Environment & Sustainability" },
  { category: "BOOKS_AND_LITERATURE", name: "Books & Literature" },
  { category: "HISTORY", name: "History" },
  { category: "PHILOSOPHY_AND_RELIGION", name: "Philosophy & Religion" },
  { category: "AUTOMOTIVE", name: "Automotive" },
  { category: "PETS_AND_ANIMALS", name: "Pets & Animals" },
  { category: "HOME_AND_GARDEN", name: "Home & Garden" },
];
