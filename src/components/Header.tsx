import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50"
    >
      <nav className="max-w-5xl mx-auto px-6 md:px-12 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="font-serif text-lg font-medium text-foreground">
              Ink Bloom
            </span>
          </motion.div>
          
          <div className="flex items-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/admin"
              className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
            >
              Admin
            </motion.a>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};
