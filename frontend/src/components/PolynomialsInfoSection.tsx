import { useLanguage } from "../contexts/LanguageContext";

const PolynomialsInfoSection = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 text-muted-foreground">
      
      {/* SECTION 1: BASICS */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {t.polynomialsDescriptionSection.title}
        </h2>
        <p className="text-lg leading-relaxed">
          {t.polynomialsDescriptionSection.intro1}
        </p>
        <p className="text-lg leading-relaxed">
          {t.polynomialsDescriptionSection.intro2}
        </p>
      </section>

      {/* SECTION 2: OPERATIONS EXPLAINED */}
      <section className="space-y-6">
        <h3 className="text-xl md:text-2xl font-semibold text-foreground">
          {t.polynomialsDescriptionSection.key_ops_title}
        </h3>

        {/* Roots / Zeros */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-lg font-bold text-foreground mb-2">
            {t.polynomialsDescriptionSection.roots_title}
          </h4>
          <p className="mb-4">
            {t.polynomialsDescriptionSection.roots_desc}
          </p>
          <div className="bg-secondary/30 p-4 rounded-lg font-mono text-sm text-foreground">
            P(x) = 0 ⇒ x = ?
          </div>
        </div>

        {/* Factorization */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-lg font-bold text-foreground mb-2">
            {t.polynomialsDescriptionSection.factor_title}
          </h4>
          <p className="mb-4">
            {t.polynomialsDescriptionSection.factor_desc}
          </p>
          <p>
             {t.polynomialsDescriptionSection.factor_detail}
          </p>
        </div>

        {/* Arithmetic */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-lg font-bold text-foreground mb-2">
            {t.polynomialsDescriptionSection.arith_title}
          </h4>
          <p>
            {t.polynomialsDescriptionSection.arith_desc}
          </p>
        </div>
      </section>

      {/* SECTION 3: FAQ / SEO */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {t.polynomialsDescriptionSection.faq_title}
        </h2>
        
        <div className="space-y-4">
          <div>
            <h5 className="font-bold text-foreground">
              {t.polynomialsDescriptionSection.faq1_q}
            </h5>
            <p>
              {t.polynomialsDescriptionSection.faq1_a}
            </p>
          </div>
          
          <div>
            <h5 className="font-bold text-foreground">
              {t.polynomialsDescriptionSection.faq2_q}
            </h5>
            <p>
              {t.polynomialsDescriptionSection.faq2_a}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PolynomialsInfoSection;