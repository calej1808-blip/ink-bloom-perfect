import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface Poem {
  id: string;
  title: string;
  content: string;
  date?: string;
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
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
      
      <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8 md:p-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <motion.h2 
            className="text-2xl md:text-3xl font-serif font-bold text-foreground leading-tight"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {poem.title}
          </motion.h2>
          
          {poem.date && (
            <motion.div 
              className="flex items-center gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Calendar className="w-4 h-4" />
              <span>{new Date(poem.date).toLocaleDateString()}</span>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <pre className="font-serif text-muted-foreground leading-relaxed whitespace-pre-wrap text-lg">
            {poem.content}
          </pre>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
          className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary/20 rounded-full"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="absolute -top-2 -left-2 w-4 h-4 bg-accent/20 rounded-full"
        />
      </div>
    </motion.article>
  );
};
