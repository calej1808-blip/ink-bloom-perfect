import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Calendar, Tag } from 'lucide-react';

interface Poem {
  id: string;
  title: string;
  content: string;
  date: string;
  categories?: string[];
}

interface AddPoemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onPoemAdded: (newPoem: Poem) => void;
  existingCategories?: string[];
}

export const AddPoemForm = ({ isOpen, onClose, onPoemAdded, existingCategories = [] }: AddPoemFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Por favor completa tanto el título como el contenido del poema.');
      return;
    }

    setIsSubmitting(true);

    // Simular proceso de guardado
    setTimeout(() => {
      const newPoem: Poem = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        date: new Date().toISOString().split('T')[0],
        categories: categories.length > 0 ? categories : undefined
      };

      onPoemAdded(newPoem);
      
      // Resetear formulario
      setTitle('');
      setContent('');
      setCategories([]);
      setNewCategory('');
      setIsSubmitting(false);
      
      // Cerrar modal
      onClose();
    }, 1000);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories(prev => [...prev, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    setCategories(prev => prev.filter(cat => cat !== categoryToRemove));
  };

  const handleExistingCategoryClick = (category: string) => {
    if (categories.includes(category)) {
      handleRemoveCategory(category);
    } else {
      setCategories(prev => [...prev, category]);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-parchment rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-gold/30"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-bronze/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gold/20 rounded-lg">
              <Plus className="w-5 h-5 text-bronze" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-bronze">
                Nuevo Poema
              </h2>
              <p className="text-sm text-copper">
                Comparte tus palabras con el mundo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gold/10 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-copper" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-bronze mb-2">
              Título del Poema *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-cream border border-bronze/30 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200 font-serif text-lg placeholder:text-copper/60"
              placeholder="¿Cómo se llamará tu poema?"
              required
              maxLength={100}
            />
            <div className="text-right text-xs text-copper mt-1">
              {title.length}/100 caracteres
            </div>
          </div>

          {/* Categories Field */}
          <div>
            <label className="block text-sm font-medium text-bronze mb-3">
              <Tag className="w-4 h-4 inline mr-2" />
              Categorías y Etiquetas
            </label>
            
            {/* Categorías existentes */}
            {existingCategories.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-copper mb-2">Categorías existentes:</p>
                <div className="flex flex-wrap gap-2">
                  {existingCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleExistingCategoryClick(category)}
                      className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 ${
                        categories.includes(category)
                          ? 'bg-gold text-white border-gold shadow-lg shadow-gold/30'
                          : 'bg-cream text-bronze border-bronze/30 hover:bg-gold/10'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Agregar nueva categoría */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                className="flex-1 px-3 py-2 bg-cream border border-bronze/30 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent text-sm placeholder:text-copper/60"
                placeholder="Nueva categoría..."
                maxLength={20}
              />
              <button
                type="button"
                onClick={handleAddCategory}
                disabled={!newCategory.trim()}
                className="px-4 py-2 bg-gold/20 text-bronze rounded-lg hover:bg-gold/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gold/30"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Categorías seleccionadas */}
            {categories.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-copper mb-2">Categorías seleccionadas:</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center gap-1 px-3 py-1 bg-gold/20 text-bronze rounded-full text-sm border border-gold/30"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(category)}
                        className="hover:text-copper transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Content Field */}
          <div>
            <label className="block text-sm font-medium text-bronze mb-2">
              Contenido *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 bg-cream border border-bronze/30 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200 resize-none font-serif text-lg leading-relaxed placeholder:text-copper/60"
              placeholder="Escribe tu poema aquí...

Cada línea se convertirá en un verso.
Puedes usar espacios para separar estrofas."
              required
              maxLength={2000}
            />
            <div className="text-right text-xs text-copper mt-1">
              {content.length}/2000 caracteres
            </div>
          </div>

          {/* Date Info */}
          <div className="flex items-center gap-2 text-sm text-copper p-3 bg-gold/10 rounded-lg border border-gold/20">
            <Calendar className="w-4 h-4" />
            <span>Se agregará automáticamente la fecha de hoy</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-bronze/20">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-copper hover:text-bronze hover:bg-gold/10 rounded-xl transition-colors duration-200 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="px-6 py-3 bg-gold text-white rounded-xl hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center gap-2 shadow-lg shadow-gold/30"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Crear Poema
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
