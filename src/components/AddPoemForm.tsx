import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Calendar, Tag, Save } from 'lucide-react';

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
  onPoemUpdated?: (updatedPoem: Poem) => void;
  existingCategories?: string[];
  poemToEdit?: Poem | null;
  isEditMode?: boolean;
}

export const AddPoemForm = ({ 
  isOpen, 
  onClose, 
  onPoemAdded, 
  onPoemUpdated,
  existingCategories = [], 
  poemToEdit = null,
  isEditMode = false 
}: AddPoemFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Resetear formulario cuando se abre/cierra o cambia el poema a editar
  useEffect(() => {
    if (isOpen) {
      if (isEditMode && poemToEdit) {
        // Modo edición: cargar datos del poema
        setTitle(poemToEdit.title);
        setContent(poemToEdit.content);
        setCategories(poemToEdit.categories || []);
      } else {
        // Modo creación: resetear formulario
        setTitle('');
        setContent('');
        setCategories([]);
        setNewCategory('');
      }
    }
  }, [isOpen, isEditMode, poemToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Por favor completa tanto el título como el contenido del poema.');
      return;
    }

    setIsSubmitting(true);

    // Simular proceso de guardado
    setTimeout(() => {
      const poemData: Poem = {
        id: isEditMode && poemToEdit ? poemToEdit.id : Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        date: isEditMode && poemToEdit ? poemToEdit.date : new Date().toISOString().split('T')[0],
        categories: categories.length > 0 ? categories : undefined
      };

      if (isEditMode && onPoemUpdated) {
        onPoemUpdated(poemData);
      } else {
        onPoemAdded(poemData);
      }
      
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
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-vintage-brown-light rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-metallic-gold/30 vintage-border"
      >
        {/* Header del formulario */}
        <div className="flex items-center justify-between p-6 border-b border-metallic-gold/20 bg-vintage-brown-light/80">
          <div className="flex items-center gap-3">
            <div className={`p-2 ${isEditMode ? 'bg-bronze-gold/20' : 'bg-metallic-gold/20'} rounded-lg`}>
              {isEditMode ? (
                <Save className="w-5 h-5 text-bronze-gold" />
              ) : (
                <Plus className="w-5 h-5 text-metallic-gold" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-metallic-gold vintage-bevel">
                {isEditMode ? 'Editar Poema' : 'Nuevo Poema'}
              </h2>
              <p className="text-sm text-warm-beige">
                {isEditMode ? 'Modifica tu poema existente' : 'Comparte tus palabras con el mundo'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-metallic-gold/10 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-warm-beige" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-warm-beige mb-2">
              Título del Poema *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-vintage-brown border border-metallic-gold/30 rounded-xl focus:ring-2 focus:ring-metallic-gold focus:border-transparent transition-all duration-200 font-serif text-lg placeholder:text-warm-beige/60 text-warm-beige"
              placeholder="¿Cómo se llamará tu poema?"
              required
              maxLength={100}
            />
            <div className="text-right text-xs text-warm-beige/80 mt-1">
              {title.length}/100 caracteres
            </div>
          </div>

          {/* Categories Field */}
          <div>
            <label className="block text-sm font-medium text-warm-beige mb-3">
              <Tag className="w-4 h-4 inline mr-2" />
              Categorías y Etiquetas
            </label>
            
            {/* Categorías existentes */}
            {existingCategories.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-warm-beige/80 mb-2">Categorías existentes:</p>
                <div className="flex flex-wrap gap-2">
                  {existingCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleExistingCategoryClick(category)}
                      className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 ${
                        categories.includes(category)
                          ? 'bg-metallic-gold text-vintage-brown border-metallic-gold shadow-lg shadow-metallic-gold/30'
                          : 'bg-vintage-brown text-warm-beige border-metallic-gold/30 hover:bg-metallic-gold/10'
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
                className="flex-1 px-3 py-2 bg-vintage-brown border border-metallic-gold/30 rounded-lg focus:ring-2 focus:ring-metallic-gold focus:border-transparent text-sm placeholder:text-warm-beige/60 text-warm-beige"
                placeholder="Nueva categoría..."
                maxLength={20}
              />
              <button
                type="button"
                onClick={handleAddCategory}
                disabled={!newCategory.trim()}
                className="px-4 py-2 bg-metallic-gold/20 text-warm-beige rounded-lg hover:bg-metallic-gold/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-metallic-gold/30"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Categorías seleccionadas */}
            {categories.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-warm-beige/80 mb-2">Categorías seleccionadas:</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center gap-1 px-3 py-1 bg-metallic-gold/20 text-warm-beige rounded-full text-sm border border-metallic-gold/30"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(category)}
                        className="hover:text-metallic-gold transition-colors"
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
            <label className="block text-sm font-medium text-warm-beige mb-2">
              Contenido *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 bg-vintage-brown border border-metallic-gold/30 rounded-xl focus:ring-2 focus:ring-metallic-gold focus:border-transparent transition-all duration-200 resize-none font-serif text-lg leading-relaxed placeholder:text-warm-beige/60 text-warm-beige"
              placeholder="Escribe tu poema aquí...

Cada línea se convertirá en un verso.
Puedes usar espacios para separar estrofas."
              required
              maxLength={2000}
            />
            <div className="text-right text-xs text-warm-beige/80 mt-1">
              {content.length}/2000 caracteres
            </div>
          </div>

          {/* Date Info */}
          {!isEditMode && (
            <div className="flex items-center gap-2 text-sm text-warm-beige/80 p-3 bg-metallic-gold/10 rounded-lg border border-metallic-gold/20">
              <Calendar className="w-4 h-4" />
              <span>Se agregará automáticamente la fecha de hoy</span>
            </div>
          )}

          {/* Edit Info */}
          {isEditMode && poemToEdit && (
            <div className="flex items-center gap-2 text-sm text-warm-beige/80 p-3 bg-bronze-gold/10 rounded-lg border border-bronze-gold/20">
              <Calendar className="w-4 h-4" />
              <span>Poema creado el {new Date(poemToEdit.date).toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-metallic-gold/20">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-warm-beige hover:text-metallic-gold hover:bg-metallic-gold/10 rounded-xl transition-colors duration-200 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className={`px-6 py-3 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center gap-2 shadow-lg ${
                isEditMode 
                  ? 'bg-bronze-gold text-vintage-brown shadow-bronze-gold/30' 
                  : 'bg-metallic-gold text-vintage-brown shadow-metallic-gold/30'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-vintage-brown border-t-transparent rounded-full animate-spin" />
                  {isEditMode ? 'Guardando...' : 'Creando...'}
                </>
              ) : (
                <>
                  {isEditMode ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {isEditMode ? 'Guardar Cambios' : 'Crear Poema'}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
