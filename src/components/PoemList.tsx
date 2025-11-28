import { motion } from "framer-motion";
import { Calendar, Tag, ChevronRight, Trash2, Edit3 } from "lucide-react";

interface Poem {
  id: string;
  title: string;
  content: string;
  date?: string;
  categories?: string[];
}

interface PoemListProps {
  poems: Poem[];
  onPoemClick: (poem: Poem) => void;
  onPoemDelete: (poemId: string) => void;
  onPoemEdit?: (poem: Poem) => void;
}

export const PoemList = ({ poems, onPoemClick, onPoemDelete, onPoemEdit }: PoemListProps) => {
  const handleDeleteClick = (e: React.MouseEvent, poemId: string) => {
    e.stopPropagation(); // Evitar que se active el click del poema
    if (window.confirm('¿Estás seguro de que quieres eliminar este poema? Esta acción no se puede deshacer.')) {
      onPoemDelete(poemId);
    }
  };

  const handleEditClick = (e: React.MouseEvent, poem: Poem) => {
    e.stopPropagation();
    if (onPoemEdit) {
      onPoemEdit(poem);
    }
  };

  return (
    <div className="space-y-4">
      {poems.map((poem, index) => (
        <motion.article
          key={poem.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ x: 5, scale: 1.01 }}
          className="group cursor-pointer"
          onClick={() => onPoemClick(poem)}
        >
          {/* Tarjeta de título con acciones */}
          <div className="relative bg-vintage-brown-light/70 backdrop-blur-sm rounded-xl border border-metallic-gold/20 p-6 hover:bg-vintage-brown-light/90 hover:border-metallic-gold/30 transition-all duration-300 shadow-lg hover:shadow-xl shadow-black/20 hover:shadow-metallic-gold/10">
            
            <div className="flex items-center justify-between">
              {/* Información principal */}
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-metallic-gold vintage-bevel mb-2">
                  {poem.title}
                </h3>
                
                {/* Metadatos */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-warm-beige/80">
                  {poem.date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(poem.date).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {poem.categories && poem.categories.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-3 h-3" />
                      <div className="flex flex-wrap gap-1">
                        {poem.categories.slice(0, 2).map((category) => (
                          <span
                            key={category}
                            className="px-2 py-1 bg-metallic-gold/15 text-warm-beige rounded-full text-xs border border-metallic-gold/25"
                          >
                            {category}
                          </span>
                        ))}
                        {poem.categories.length > 2 && (
                          <span className="px-2 py-1 text-warm-beige/60 text-xs">
                            +{poem.categories.length - 2} más
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Acciones */}
              <div className="flex items-center gap-2">
                {/* Botón Editar (opcional) */}
                {onPoemEdit && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleEditClick(e, poem)}
                    className="p-2 text-metallic-gold/60 hover:text-metallic-gold hover:bg-metallic-gold/10 rounded-lg transition-all duration-200"
                    title="Editar poema"
                  >
                    <Edit3 className="w-4 h-4" />
                  </motion.button>
                )}
                
                {/* Botón Eliminar */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleDeleteClick(e, poem.id)}
                  className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200"
                  title="Eliminar poema"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
                
                {/* Indicador de click */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1 text-metallic-gold/60 group-hover:text-metallic-gold transition-colors"
                >
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </div>
            </div>

            {/* Línea decorativa inferior */}
            <motion.div
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-metallic-gold/50 to-transparent transition-all duration-300"
            />
          </div>
        </motion.article>
      ))}
    </div>
  );
};
