import { useLanguage } from "../contexts/LanguageContext";

const CalculusInfoSection = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 text-muted-foreground">
      
      {/* SECTION 1: BASICS */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {t.calculusDescriptionSection.title}
        </h2>
        <p className="text-lg leading-relaxed">
          {t.calculusDescriptionSection.intro1}
        </p>
        <p className="text-lg leading-relaxed">
          {t.calculusDescriptionSection.intro2}
        </p>
      </section>

      {/* SECTION 2: OPERATIONS EXPLAINED */}
      <section className="space-y-6">
        <h3 className="text-xl md:text-2xl font-semibold text-foreground">
          {t.calculusDescriptionSection.key_ops_title}
        </h3>

        {/* Derivatives */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-lg font-bold text-foreground mb-2">
            {t.calculusDescriptionSection.deriv_title}
          </h4>
          <p className="mb-4">
            {t.calculusDescriptionSection.deriv_desc}
          </p>
          <div className="bg-secondary/30 p-4 rounded-lg font-mono text-sm text-foreground">
            f'(x) = lim(h→0) [f(x+h) - f(x)] / h
          </div>
        </div>

        {/* Integrals (Antiderivatives) */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-lg font-bold text-foreground mb-2">
            {t.calculusDescriptionSection.int_title}
          </h4>
          <p className="mb-4">
            {t.calculusDescriptionSection.int_desc}
          </p>
          <p>
             {t.calculusDescriptionSection.int_detail}
          </p>
        </div>

        {/* Definite Integrals */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-lg font-bold text-foreground mb-2">
            {t.calculusDescriptionSection.def_int_title}
          </h4>
          <p>
            {t.calculusDescriptionSection.def_int_desc}
          </p>
        </div>
      </section>

      {/* SECTION 3: FAQ / SEO */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {t.calculusDescriptionSection.faq_title}
        </h2>
        
        <div className="space-y-4">
          <div>
            <h5 className="font-bold text-foreground">
              {t.calculusDescriptionSection.faq1_q}
            </h5>
            <p>
              {t.calculusDescriptionSection.faq1_a}
            </p>
          </div>
          
          <div>
            <h5 className="font-bold text-foreground">
              {t.calculusDescriptionSection.faq2_q}
            </h5>
            <p>
              {t.calculusDescriptionSection.faq2_a}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CalculusInfoSection;