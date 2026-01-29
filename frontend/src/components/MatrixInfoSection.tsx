import { useLanguage } from "../contexts/LanguageContext";

const MatrixInfoSection = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 text-muted-foreground">
      
      {/* SECTION 1: BASICS */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {t.matrixDescriptionSection.title}
        </h2>
        <p className="text-lg leading-relaxed">
          {t.matrixDescriptionSection.intro1}
        </p>
        <p className="text-lg leading-relaxed">
          {t.matrixDescriptionSection.intro2}
        </p>
      </section>

      {/* SECTION 2: OPERATIONS EXPLAINED */}
      <section className="space-y-6">
        <h3 className="text-xl md:text-2xl font-semibold text-foreground">
          {t.matrixDescriptionSection.key_ops_title}
        </h3>

        {/* Matrix Multiplication */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-lg font-bold text-foreground mb-2">
            {t.matrixDescriptionSection.mult_title}
          </h4>
          <p className="mb-4">
            {t.matrixDescriptionSection.mult_desc}
          </p>
          <div className="bg-secondary/30 p-4 rounded-lg font-mono text-sm text-foreground">
            {t.matrixDescriptionSection.mult_formula}
          </div>
        </div>

        {/* Determinant */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-lg font-bold text-foreground mb-2">
            {t.matrixDescriptionSection.det_title}
          </h4>
          <p className="mb-4">
            {t.matrixDescriptionSection.det_desc}
          </p>
          <p>
            {t.matrixDescriptionSection.det_example}
          </p>
        </div>

        {/* Inverse */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-lg font-bold text-foreground mb-2">
            {t.matrixDescriptionSection.inv_title}
          </h4>
          <p>
            {t.matrixDescriptionSection.inv_desc}
          </p>
        </div>
      </section>

      {/* SECTION 3: FAQ / SEO */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {t.matrixDescriptionSection.faq_title}
        </h2>
        
        <div className="space-y-4">
          <div>
            <h5 className="font-bold text-foreground">
              {t.matrixDescriptionSection.faq1_q}
            </h5>
            <p>
              {t.matrixDescriptionSection.faq1_a}
            </p>
          </div>
          
          <div>
            <h5 className="font-bold text-foreground">
              {t.matrixDescriptionSection.faq2_q}
            </h5>
            <p>
              {t.matrixDescriptionSection.faq2_a}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default MatrixInfoSection;