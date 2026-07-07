const fs = require('fs');
const path = require('path');

const pagePath = path.resolve(__dirname, 'src/app/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Remove the misplaced architectureSteps at the bottom
const badStepsIndex = content.indexOf('const architectureSteps = [');
if (badStepsIndex !== -1) {
  const fileEndIndex = content.indexOf('];', badStepsIndex) + 2;
  const extraBrace = content.indexOf('}', fileEndIndex);
  if (extraBrace !== -1 && extraBrace < fileEndIndex + 10) {
    content = content.slice(0, badStepsIndex);
  } else {
    content = content.slice(0, badStepsIndex);
  }
}

// 2. Define it with types and insert above ArchitectureSection
const correctSteps = `
interface ArchitectureStep {
  id: string;
  title: string;
  description: string;
  visual: React.ReactNode;
}

const architectureSteps: ArchitectureStep[] = [
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

function ArchitectureSection() {`;

content = content.replace('function ArchitectureSection() {', correctSteps);
content = content.replace('{architectureSteps.map((step, index) => {', '{architectureSteps.map((step: ArchitectureStep, index: number) => {');

fs.writeFileSync(pagePath, content, 'utf8');
console.log("Fixed page.tsx");
