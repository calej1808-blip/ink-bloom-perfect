import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface HeaderProps {
  onAddPoem: () => void;
}

export const Header = ({ onAddPoem }: HeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-parchment/80 backdrop-blur-md border-b border-bronze/20"
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-12 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse shadow-glow" />
            <span className="font-serif text-lg font-bold text-bronze">
              Ink Bloom
            </span>
          </motion.div>
          
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddPoem}
              className="flex items-center gap-2 text-sm font-sans text-copper hover:text-bronze transition-colors bg-gold/10 hover:bg-gold/20 px-4 py-2 rounded-xl border border-gold/30"
            >
              <Plus className="w-4 h-4" />
              Agregar Poema
            </motion.button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};
