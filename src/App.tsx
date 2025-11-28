import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { PoemCard } from "@/components/PoemCard";
import { AddPoemForm } from "@/components/AddPoemForm";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { getPoems } from "@/lib/getPoems";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Poem {
  id: string;
  title: string;
  content: string;
  date: string;
  categories?: string[];
}

const App = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [filteredPoems, setFilteredPoems] = useState<Poem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Cargar poemas al iniciar
  useEffect(() => {
    const savedPoems = localStorage.getItem('ink-bloom-poems');
    if (savedPoems) {
      setPoems(JSON.parse(savedPoems));
    } else {
      setPoems(getPoems());
    }
  }, []);

  // Guardar poemas cuando cambien
  useEffect(() => {
    if (poems.length > 0) {
      localStorage.setItem('ink-bloom-poems', JSON.stringify(poems));
    }
  }, [poems]);

  // Filtrar poemas basado en búsqueda y categoría
  useEffect(() => {
    let filtered = poems;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(poem => 
        poem.title.toLowerCase().includes(query) ||
        poem.content.toLowerCase().includes(query) ||
        poem.categories?.some(cat => cat.toLowerCase().includes(query))
      );
    }

    if (filterCategory) {
      filtered = filtered.filter(poem => 
        poem.categories?.includes(filterCategory)
      );
    }

    setFilteredPoems(filtered);
  }, [poems, searchQuery, filterCategory]);

  // Obtener todas las categorías únicas
  const allCategories = Array.from(new Set(
    poems.flatMap(poem => poem.categories || [])
  )).sort();

  const handleAddPoem = () => {
    setIsFormOpen(true);
  };

  const handlePoemAdded = (newPoem: Poem) => {
    setPoems(prev => [newPoem, ...prev]);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (category: string) => {
    setFilterCategory(category);
  };

  return (
    <div className="min-h-screen bg-vintage-brown bg-paper-texture">
      {/* Efectos de partículas vintage sutiles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-metallic-gold/20 rounded-full animate-float-vintage"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-3/4 right-1/3 w-2 h-2 bg-bronze-gold/30 rounded-full animate-float-vintage"
        />
        <motion.div
          animate={{ 
            x: [0, 120, 0],
            y: [0, 30, 0],
            rotate: [0, 270, 540]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-metallic-gold/40 rounded-full animate-float-vintage"
        />
      </div>

      <Header onAddPoem={handleAddPoem} />
      
      <AddPoemForm 
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onPoemAdded={handlePoemAdded}
        existingCategories={allCategories}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Efectos de fondo vintage */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-metallic-gold/10 rounded-full blur-3xl vintage-glow"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.03, 0.08, 0.03]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-bronze-gold/15 rounded-full blur-3xl vintage-glow"
          />
        </div>

        <main className="relative max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-16 text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-metallic-gold/10 border border-metallic-gold/20 vintage-border"
            >
              <Sparkles className="w-4 h-4 text-metallic-gold animate-glow-pulse" />
              <span className="text-sm font-sans text-warm-beige font-medium">
                {filteredPoems.length} {filteredPoems.length === 1 ? 'Poema' : 'Poemas'} en la Colección
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight">
              <span className="text-vintage-gold vintage-bevel">
                A Collection
              </span>
              <br />
              <span className="text-vintage-gold vintage-bevel">of Words</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl text-warm-beige font-serif italic leading-relaxed max-w-2xl mx-auto"
            >
              Fragments of thought, captured in verse—
              <br />
              moments crystallized into meaning
            </motion.p>
            
            {/* Línea decorativa dorada vintage */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-px bg-gradient-to-r from-transparent via-metallic-gold to-transparent mx-auto mt-12"
            />
          </motion.div>

          {/* Búsqueda y Filtros */}
          {poems.length > 0 && (
            <SearchAndFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              categories={allCategories}
            />
          )}

          {/* Grid de Poemas */}
          {filteredPoems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-warm-beige font-serif italic text-lg mb-4">
                {poems.length === 0 
                  ? "Aún no hay poemas en la colección..." 
                  : "No se encontraron poemas con los filtros actuales."
                }
              </div>
              {searchQuery || filterCategory ? (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterCategory('');
                  }}
                  className="px-6 py-2 bg-metallic-gold/10 text-warm-beige rounded-xl hover:bg-metallic-gold/20 transition-colors vintage-border"
                >
                  Limpiar filtros
                </button>
              ) : null}
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {filteredPoems.map((poem, index) => (
                <PoemCard key={poem.id} poem={poem} index={index} />
              ))}
            </motion.div>
          )}
        </main>
      </section>
    </div>
  );
};

export default App;
