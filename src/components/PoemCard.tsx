import { motion } from "framer-motion";
import { Calendar, Tag } from "lucide-react";

interface Poem {
  id: string;
  title: string;
  content: string;
  date?: string;
  categories?: string[];
}

interface PoemCardProps {
  poem: Poem;
  index: number;
}

export const PoemCard = ({ poem, index }: PoemCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group relative"
    >
      {/* Efecto de fondo sutil al hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-metallic-gold/3 to-bronze-gold/5 rounded-2xl transform group-hover:scale-105 transition-all duration-300" />
      
      {/* Tarjeta principal con colores vintage */}
      <div className="relative bg-vintage-brown-light/80 backdrop-blur-sm rounded-2xl border border-metallic-gold/25 p-8 md:p-10 shadow-xl shadow-black/30">
        
        {/* Encabezado con título y fecha */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <motion.h2 
            className="text-2xl md:text-3xl font-serif font-bold text-metallic-gold leading-tight vintage-bevel flex-1"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {poem.title}
          </motion.h2>
          
          {poem.date && (
            <motion.div 
              className="flex items-center gap-2 text-sm text-warm-beige/90 shrink-0"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{new Date(poem.date).toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </motion.div>
          )}
        </div>

        {/* Categorías - Solo mostrar si existen */}
        {poem.categories && poem.categories.length > 0 && (
          <motion.div 
            className="flex flex-wrap items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <Tag className="w-4 h-4 text-metallic-gold/70" />
            <div className="flex flex-wrap gap-2">
              {poem.categories.map((category, catIndex) => (
                <span
                  key={category}
                  className="px-3 py-1.5 bg-metallic-gold/15 text-warm-beige rounded-full text-sm border border-metallic-gold/25 font-medium hover:bg-metallic-gold/25 transition-colors duration-200"
                >
                  {category}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Contenido del poema */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.15 }}
          className="relative"
        >
          <pre className="font-serif text-warm-beige/95 leading-relaxed whitespace-pre-wrap text-lg tracking-wide">
            {poem.content}
          </pre>
        </motion.div>

        {/* Elementos decorativos vintage */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
          className="absolute -bottom-3 -right-3 w-8 h-8 bg-metallic-gold/20 rounded-full border border-metallic-gold/30"
        />
        <motion.div
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
          className="absolute -top-3 -left-3 w-6 h-6 bg-bronze-gold/25 rounded-full border border-bronze-gold/35"
        />

        {/* Línea decorativa inferior */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: index * 0.1 + 0.6, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-metallic-gold/40 to-transparent"
        />
      </div>
    </motion.article>
  );
};
