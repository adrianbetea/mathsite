import { useLanguage } from "../contexts/LanguageContext";

const IndexDescriptionSection = () => {
  const { t } = useLanguage();

  return (
    <div className="relative w-full my-12 md:my-20">
      
      {/* BACKGROUND EFFECT: Keeps the subtle blue glow in both modes */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
         <div className="w-3/4 h-3/4 bg-blue-600/5 dark:bg-blue-600/10 blur-[100px] rounded-full opacity-50 pointer-events-none" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto gap-8 md:gap-16">
          
          {/* Logo Section */}
          <div className="shrink-0 relative">
            {/* Glow behind logo */}
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
            
            {/* LOGO CONTAINER: 
                - Light Mode: bg-white (White box)
                - Dark Mode: dark:bg-slate-900/50 (Dark transparent box) 
            */}
            <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-white dark:bg-slate-900/50 flex items-center justify-center border border-blue-100 dark:border-blue-500/30 shadow-xl backdrop-blur-sm">
              <span className="text-blue-600 dark:text-blue-500 font-bold text-4xl md:text-5xl drop-shadow-sm">∑</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left max-w-3xl">
            {/* TITLE: 
                - Light Mode: text-slate-900 (Dark Black/Blue)
                - Dark Mode: dark:text-white (White)
            */}
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              {t.nav.description_title}
            </h2>
            
            <div className="space-y-6">
              {/* PARAGRAPHS: 
                  - Light Mode: text-slate-600 (Darker Gray for readability)
                  - Dark Mode: dark:text-slate-400 (Lighter Gray)
              */}
              <p className="text-slate-600 dark:text-slate-400 text-base md:text-xl leading-relaxed">
                {t.nav.bottom_description1}
              </p>

              <p className="text-slate-600 dark:text-slate-400 text-base md:text-xl leading-relaxed">
                {t.nav.bottom_description2}
              </p>
              
              <p className="text-slate-600 dark:text-slate-400 text-base md:text-xl leading-relaxed">
                {t.nav.bottom_description3}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default IndexDescriptionSection;