import { motion } from "framer-motion";
import { X, Calendar, Tag, ArrowLeft, Trash2, Edit3 } from "lucide-react";

interface Poem {
  id: string;
  title: string;
  content: string;
  date?: string;
  categories?: string[];
}

interface PoemDetailProps {
  poem: Poem | null;
  isOpen: boolean;
  onClose: () => void;
  onPoemDelete?: (poemId: string) => void;
  onPoemEdit?: (poem: Poem) => void;
}

export const PoemDetail = ({ poem, isOpen, onClose, onPoemDelete, onPoemEdit }: PoemDetailProps) => {
  if (!isOpen || !poem) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDeleteClick = () => {
    if (onPoemDelete && window.confirm('¿Estás seguro de que quieres eliminar este poema? Esta acción no se puede deshacer.')) {
      onPoemDelete(poem.id);
      onClose();
    }
  };

  const handleEditClick = () => {
    if (onPoemEdit) {
      onPoemEdit(poem);
      onClose();
    }
  };

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
        className="bg-vintage-brown-light rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-metallic-gold/30 vintage-border"
      >
        {/* Header del detalle con acciones */}
        <div className="flex items-center justify-between p-6 border-b border-metallic-gold/20 bg-vintage-brown-light/80">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-warm-beige hover:text-metallic-gold transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Volver a la lista</span>
          </button>
          
          <div className="flex items-center gap-2">
            {/* Botón Editar (opcional) */}
            {onPoemEdit && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEditClick}
                className="flex items-center gap-2 px-4 py-2 bg-metallic-gold/20 text-metallic-gold rounded-lg hover:bg-metallic-gold/30 transition-colors border border-metallic-gold/30"
                title="Editar poema"
              >
                <Edit3 className="w-4 h-4" />
                <span className="text-sm font-medium">Editar</span>
              </motion.button>
            )}
            
            {/* Botón Eliminar */}
            {onPoemDelete && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDeleteClick}
                className="flex items-center gap-2 px-4 py-2 bg-red-400/20 text-red-400 rounded-lg hover:bg-red-400/30 transition-colors border border-red-400/30"
                title="Eliminar poema"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm font-medium">Eliminar</span>
              </motion.button>
            )}
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-metallic-gold/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-warm-beige" />
            </button>
          </div>
        </div>

        {/* Contenido del poema */}
        <div className="p-8 md:p-12 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-metallic-gold vintage-bevel mb-6 text-center"
          >
            {poem.title}
          </motion.h1>

          {/* Metadatos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 text-warm-beige/80"
          >
            {poem.date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{new Date(poem.date).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            )}
            
            {poem.categories && poem.categories.length > 0 && (
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4" />
                <div className="flex flex-wrap gap-2 justify-center">
                  {poem.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1.5 bg-metallic-gold/20 text-warm-beige rounded-full text-sm border border-metallic-gold/30 font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Línea decorativa */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-metallic-gold/50 to-transparent mx-auto mb-8"
          />

          {/* Contenido del poema */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <pre className="font-serif text-warm-beige/95 leading-relaxed whitespace-pre-wrap text-lg md:text-xl tracking-wide max-w-4xl mx-auto">
              {poem.content}
            </pre>
          </motion.div>

          {/* Elementos decorativos */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-6 right-6 w-8 h-8 bg-metallic-gold/20 rounded-full border border-metallic-gold/30"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute top-6 left-6 w-6 h-6 bg-bronze-gold/25 rounded-full border border-bronze-gold/35"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
