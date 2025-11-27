import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Calendar } from 'lucide-react';

interface Poem {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface AddPoemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onPoemAdded: (newPoem: Poem) => void;
}

export const AddPoemForm = ({ isOpen, onClose, onPoemAdded }: AddPoemFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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
        date: new Date().toISOString().split('T')[0]
      };

      onPoemAdded(newPoem);
      
      // Resetear formulario
      setTitle('');
      setContent('');
      setIsSubmitting(false);
      
      // Cerrar modal
      onClose();
    }, 1000);
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
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Plus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-foreground">
                Nuevo Poema
              </h2>
              <p className="text-sm text-muted-foreground">
                Comparte tus palabras con el mundo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título del Poema *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 font-serif text-lg"
              placeholder="¿Cómo se llamará tu poema?"
              required
              maxLength={100}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {title.length}/100 caracteres
            </div>
          </div>

          {/* Content Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenido *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none font-serif text-lg leading-relaxed"
              placeholder="Escribe tu poema aquí...

Cada línea se convertirá en un verso.
Puedes usar espacios para separar estrofas."
              required
              maxLength={2000}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {content.length}/2000 caracteres
            </div>
          </div>

          {/* Date Info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-4 h-4" />
            <span>Se agregará automáticamente la fecha de hoy</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors duration-200 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center gap-2"
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
