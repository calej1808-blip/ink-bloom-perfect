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
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-copper/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
      
      <div className="relative bg-parchment/80 backdrop-blur-sm rounded-2xl border border-bronze/30 p-8 md:p-12 shadow-lg shadow-gold/10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <motion.h2 
            className="text-2xl md:text-3xl font-serif font-bold text-bronze leading-tight"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {poem.title}
          </motion.h2>
          
          {poem.date && (
            <motion.div 
              className="flex items-center gap-2 text-sm text-copper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Calendar className="w-4 h-4" />
              <span>{new Date(poem.date).toLocaleDateString()}</span>
            </motion.div>
          )}
        </div>

        {/* Categories */}
        {poem.categories && poem.categories.length > 0 && (
          <motion.div 
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <Tag className="w-4 h-4 text-copper mt-1" />
            {poem.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-gold/20 text-bronze rounded-full text-xs border border-gold/30"
              >
                {category}
              </span>
            ))}
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <pre className="font-serif text-copper leading-relaxed whitespace-pre-wrap text-lg">
            {poem.content}
          </pre>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
          className="absolute -bottom-2 -right-2 w-6 h-6 bg-gold/30 rounded-full"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="absolute -top-2 -left-2 w-4 h-4 bg-copper/40 rounded-full"
        />
      </div>
    </motion.article>
  );
};
