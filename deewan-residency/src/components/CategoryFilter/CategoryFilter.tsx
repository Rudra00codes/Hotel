interface CategoryFilterProps {
  categories: readonly string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const categoryLabels = {
  dining: 'Dining',
  business: 'Business',
  recreation: 'Recreation'
};

const categoryIcons = {
  dining: '🍽️',
  business: '💼',
  recreation: '🏃‍♂️'
};

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
          activeCategory === null
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
        }`}
      >
        All Amenities
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
            activeCategory === category
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className="text-lg">
            {categoryIcons[category as keyof typeof categoryIcons]}
          </span>
          {categoryLabels[category as keyof typeof categoryLabels]}
        </button>
      ))}
    </div>
  );
}