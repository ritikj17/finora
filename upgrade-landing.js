const fs = require('fs');
const path = require('path');

const pagePath = path.resolve(__dirname, 'src/app/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. We need to add the architecture steps data at the top, under `const features = ...`
const stepsData = `
const architectureSteps = [
  {
    id: "01",
    title: "Data Ingestion Pipeline",
    description: "Users upload bulk CSV bank statements. Client-side workers parse and sanitize rows before transmitting them securely to our server actions, ensuring zero malformed payloads enter the database.",
    visual: (
      <div className="relative size-full bg-card rounded-2xl border flex items-center justify-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-500 relative z-10"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15l3-3 3 3"/></svg>
      </div>
    ),
  },
  {
    id: "02",
    title: "Autonomous AI Categorization",
    description: "Our Gemini-powered backend engine processes unorganized transaction records. It cleans up ambiguous merchant strings and assigns accurate spending categories structured as strictly typed JSON.",
    visual: (
      <div className="relative size-full bg-card rounded-2xl border flex items-center justify-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary relative z-10"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/></svg>
      </div>
    ),
  },
  {
    id: "03",
    title: "Real-Time Budget Aggregations",
    description: "Relational database queries continuously calculate total categorized spending against user-defined limits. Visual progress components update dynamically with custom CSS thresholds.",
    visual: (
      <div className="relative size-full bg-card rounded-2xl border flex items-center justify-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500 relative z-10"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      </div>
    ),
  },
  {
    id: "04",
    title: "Retrieval-Augmented Chat (RAG)",
    description: "When interacting with the AI Advisor, the application injects the user's latest 30-day financial summaries directly into the LLM context window to provide verifiable, mathematical guidance.",
    visual: (
      <div className="relative size-full bg-card rounded-2xl border flex items-center justify-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-500 relative z-10"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </div>
    ),
  },
];
`;

const dataEndIndex = content.indexOf('// ─── Components ─────────────────────────────────────────────────────────────');
content = content.slice(0, dataEndIndex) + stepsData + '\n' + content.slice(dataEndIndex);

// 2. Add ArchitectureSection component
const archSectionCode = `
function ArchitectureSection() {
  return (
    <section id="architecture" className="w-full max-w-6xl mx-auto py-24 px-4">
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="text-center mb-16"
      >
        <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          System Architecture
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
          How Finora processes raw transaction matrices into structured financial intelligence.
        </motion.p>
      </motion.div>

      <div className="flex flex-col gap-24 md:gap-32">
        {architectureSteps.map((step, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div 
              key={step.id} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={\`flex flex-col md:flex-row items-center gap-12 md:gap-24 \${!isEven ? 'md:flex-row-reverse' : ''}\`}
            >
              <div className="flex-1 space-y-6">
                <span className="text-6xl md:text-8xl font-black text-muted/30 -ml-2 select-none tracking-tighter">
                  {step.id}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex-1 w-full aspect-square md:aspect-[4/3] max-w-lg relative group"
              >
                 <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500" />
                 {step.visual}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
`;

const ctaSectionIndex = content.indexOf('function CTASection() {');
content = content.slice(0, ctaSectionIndex) + archSectionCode + '\n' + content.slice(ctaSectionIndex);

// 3. Include ArchitectureSection in LandingPage main
content = content.replace('<TestimonialsSection />', '<TestimonialsSection />\n        <ArchitectureSection />');

fs.writeFileSync(pagePath, content, 'utf8');
console.log("Updated page.tsx with ArchitectureSection");
