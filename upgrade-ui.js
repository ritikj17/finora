const fs = require('fs');
const path = require('path');

const authLeftPanelMockup = `      <div className="relative hidden w-1/2 flex-col justify-between bg-zinc-950 p-10 text-white lg:flex border-r border-border overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-indigo-500/20 blur-[120px]"></div>
        
        <div className="relative z-10 flex items-center gap-2 font-bold text-2xl tracking-tight">
          <Logo className="size-8 shadow-none" showText={true} />
        </div>

        {/* Animated Bento Box Mockup */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center mt-12 perspective-1000">
          <div className="relative w-[120%] max-w-2xl rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-2xl rounded-3xl" />
            
            {/* Main Mockup Card */}
            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
              
              {/* Header Skeleton */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-32 bg-white/10 rounded-md" />
                  <div className="h-8 w-48 bg-white/20 rounded-md" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-indigo-500/20 rounded-full" />
                </div>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-3 gap-4">
                {/* Large Chart Area */}
                <div className="col-span-2 row-span-2 bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-end h-48 relative overflow-hidden">
                  <div className="absolute top-4 left-4 h-4 w-24 bg-white/10 rounded-md" />
                  <div className="w-full flex items-end justify-between gap-2 h-24">
                    {[40, 70, 45, 90, 65, 85, 55].map((h, i) => (
                      <div key={i} className="w-full bg-indigo-500/80 rounded-t-sm transition-all duration-1000 ease-out animate-pulse" style={{ height: h + "%", animationDelay: (i * 100) + "ms" }} />
                    ))}
                  </div>
                </div>

                {/* Small Stats */}
                <div className="col-span-1 bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-2">
                  <div className="h-3 w-16 bg-white/10 rounded-md" />
                  <div className="h-6 w-24 bg-emerald-400/80 rounded-md" />
                </div>
                <div className="col-span-1 bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-2">
                  <div className="h-3 w-16 bg-white/10 rounded-md" />
                  <div className="h-6 w-24 bg-rose-400/80 rounded-md" />
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-md mt-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
            Intelligent finance.
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Finora categorizes your transactions, visualizes your cash flow, and provides AI-driven insights directly from your secure data.
          </p>
        </div>
      </div>`;

function updateAuthPage(filePath, oldLeftPanelString, rightPanelString) {
  const fullPath = path.resolve(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  
  const oldLeftPanelStart = content.indexOf(oldLeftPanelString);
  const rightPanelStart = content.indexOf(rightPanelString);
  
  if (oldLeftPanelStart !== -1 && rightPanelStart !== -1) {
    const before = content.slice(0, oldLeftPanelStart);
    const after = content.slice(rightPanelStart);
    content = before + authLeftPanelMockup + "\n\n      " + after;
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log("Updated " + filePath);
  }
}

updateAuthPage('src/app/(auth)/sign-in/page.tsx', '{/* LEFT PANEL: Premium Dark Mode Showcase */}', '{/* RIGHT PANEL: Auth Form */}');
updateAuthPage('src/app/(auth)/sign-up/page.tsx', '{/* LEFT PANEL: Premium Dark Mode Showcase (Exact Match to Sign In) */}', '{/* RIGHT PANEL: Sign Up Form */}');
