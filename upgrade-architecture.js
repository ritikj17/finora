const fs = require('fs');
const path = require('path');

const pagePath = path.resolve(__dirname, 'src/app/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Locate the old ArchitectureSection
const archStart = content.indexOf('function ArchitectureSection() {');
const ctaStart = content.indexOf('function CTASection() {');

if (archStart !== -1 && ctaStart !== -1) {
  const newArchitecture = `
function ArchitectureSection() {
  return (
    <section id="architecture" className="w-full max-w-6xl mx-auto py-24 px-4 relative">
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="text-center mb-24"
      >
        <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">
          System Architecture
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
          How Finora processes raw transaction matrices into structured financial intelligence, securely and reliably.
        </motion.p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Animated Background Connector Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-purple-500/50 to-transparent -translate-x-1/2 hidden md:block" />
        
        {/* Animated Arrow moving down the line */}
        <motion.div 
          className="absolute left-1/2 top-0 w-6 h-6 -translate-x-1/2 -mt-3 hidden md:flex items-center justify-center text-primary"
          animate={{ y: [0, 800] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </motion.div>

        <div className="flex flex-col gap-12 md:gap-24 relative">
          {architectureSteps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={step.id} 
                initial={{ opacity: 0, y: 40, x: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={\`flex flex-col md:flex-row items-center gap-8 md:gap-16 \${!isEven ? 'md:flex-row-reverse' : ''}\`}
              >
                {/* Content Side */}
                <div className={\`flex-1 flex flex-col \${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} space-y-4\`}>
                  <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider mb-2">
                    STEP {step.id}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>

                {/* Center Node (Timeline Dot) */}
                <div className="hidden md:flex relative z-10 w-12 h-12 rounded-full bg-background border-4 border-primary items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                   <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                </div>

                {/* Visual Side */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex-1 w-full max-w-[280px] aspect-square relative group"
                >
                   <div className="absolute -inset-2 bg-gradient-to-r from-primary/40 to-purple-600/40 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
                   <div className="relative z-10 size-full bg-zinc-900/90 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-2xl">
                     {step.visual}
                   </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

`;
  
  const before = content.slice(0, archStart);
  const after = content.slice(ctaStart);
  content = before + newArchitecture + after;
  fs.writeFileSync(pagePath, content, 'utf8');
  console.log("Updated page.tsx with new Architecture Timeline Design");
}
