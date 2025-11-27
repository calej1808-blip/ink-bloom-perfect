import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (category: string) => void;
  categories: string[];
}

export const SearchAndFilter = ({ onSearch, onFilter, categories }: SearchAndFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleCategoryChange = (category: string) => {
    const newCategory = category === selectedCategory ? '' : category;
    setSelectedCategory(newCategory);
    onFilter(newCategory);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    onSearch('');
    onFilter('');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 p-6 bg-parchment/50 rounded-2xl border border-gold/20">
      {/* Barra de búsqueda */}
      <div className="relative flex-1 w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-copper" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar en poemas..."
          className="w-full pl-10 pr-4 py-3 bg-cream border border-bronze/30 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200 font-serif placeholder:text-copper/60"
        />
      </div>

      {/* Filtros y controles */}
      <div className="flex gap-3 items-center">
        {/* Botón filtro móvil */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="sm:hidden p-3 bg-gold/10 border border-gold/30 rounded-xl text-bronze hover:bg-gold/20 transition-colors"
        >
          <Filter className="w-4 h-4" />
        </motion.button>

        {/* Filtros desktop */}
        <div className="hidden sm:flex gap-2 flex-wrap">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full border transition-all duration-200 font-medium text-sm ${
                selectedCategory === category
                  ? 'bg-gold text-white border-gold shadow-lg shadow-gold/30'
                  : 'bg-cream text-bronze border-bronze/30 hover:bg-gold/10 hover:border-gold/50'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Botón limpiar */}
        {(searchQuery || selectedCategory) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={clearFilters}
            className="p-2 text-bronze hover:text-copper transition-colors"
            title="Limpiar filtros"
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {/* Filtros móvil desplegable */}
      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="sm:hidden w-full mt-4 p-4 bg-cream border border-bronze/30 rounded-xl"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  selectedCategory === category
                    ? 'bg-gold text-white border-gold'
                    : 'bg-white text-bronze border-bronze/30 hover:bg-gold/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
