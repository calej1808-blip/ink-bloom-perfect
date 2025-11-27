import { Header } from "@/components/Header";
import { PoemCard } from "@/components/PoemCard";
import { getPoems } from "@/lib/getPoems";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const App = () => {
  const poems = getPoems();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Ambient background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          />
        </div>

        <main className="relative max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-24 text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <Sparkles className="w-4 h-4 text-primary animate-glow-pulse" />
              <span className="text-sm font-sans text-primary font-medium">Personal Poetry Collection</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight">
              <span className="text-gradient glow-text">
                A Collection
              </span>
              <br />
              <span className="text-foreground">of Words</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground font-serif italic leading-relaxed max-w-2xl mx-auto"
            >
              Fragments of thought, captured in verse—
              <br />
              moments crystallized into meaning
            </motion.p>
            
            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-12"
            />
          </motion.div>

          {/* Poems Grid */}
          <div className="space-y-10">
            {poems.map((poem, index) => (
              <PoemCard key={poem.id} poem={poem} index={index} />
            ))}
          </div>
        </main>
      </section>
    </div>
  );
};

export default App;
